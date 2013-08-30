errors = new Object

unless Object.keys
  Object.keys = keys = (object) ->
    buffer = []
    key = undefined
    for key of object
      buffer.push key  if Object::hasOwnProperty.call(object, key)
    buffer

String::capitalize = ->
  @charAt(0).toUpperCase() + @slice(1)

toSentence = (array) ->
  wordsConnector = ", "
  twoWordsConnector = " and "
  lastWordConnector = ", and "
  sentence = undefined
  switch array.length
    when 0
      sentence = ""
    when 1
      sentence = array[0]
    when 2
      sentence = array[0] + twoWordsConnector + array[1]
    else
      sentence = array.slice(0, -1).join(wordsConnector) + lastWordConnector + array[array.length - 1]
  sentence

class Errors
  constructor: ->
    @errors = []

  add: (message) ->
    if message
      if typeof message is 'string'
        @errors.push message
      else
        @errors.push error for error in message

  none: ->
    if @errors.length == 0
      true
    else
      false

  alwaysReturn: (boolean) ->
    @none = ->
      boolean

  fullMessages: ->
    toSentence(@errors).toLowerCase().capitalize()

  all: ->
    @errors

class ValidatableInput
  constructor: (input) ->
    @input = input
    @customMessage = @input.getAttribute 'data-custom-error-message'

  setupErrorMessage: (fullMessages) ->
    @input.setAttribute 'data-error-message', @customMessage || fullMessages

  resetErrorMessages: ->
    @input.removeAttribute 'data-error-message'

  validations: ->
    @input.getAttribute 'data-validation'

  asHtmlNode: ->
    @input

class RangeValidation
  constructor: (length, min, max) ->
    @length = length
    @min = min
    @max = max

  validate: ->
    if @max and @min and @length not in [@min..@max]
      @mixedMessage()
    else if @min and @length < @min
      @tooShortMessage()
    else if @max and @length > @max
      @tooLongMessage()

class CharacterCountValidation extends RangeValidation
  mixedMessage: ->
    "Value most be at least #{@min} and maximum #{@max} characters long"

  tooShortMessage: ->
    "Value most be at least #{@min}"

  tooLongMessage: ->
    "Value can't be longer than #{@max}"

class WordCountValidation extends RangeValidation
  mixedMessage: ->
    "Can't contain less than #{@min} or more than #{@max} words"

  tooShortMessage: ->
    "Can't contain less than #{@min} words"

  tooLongMessage: ->
    "Can't contain more than #{@max} words"

class @FormValidator
  constructor: ->
    parser = new Parser
    parser.addDefaultValue 'required', true
    parser.addDefaultValue 'allowEmpty', true

    @parser = parser

    @_setupBuiltInValidations()

  defineValidation: (name, validatorFunction, errorMessage) ->
    @_validations[name] = {
      validationHandler: validatorFunction,
      errorMessage: errorMessage
    }

  validateForm: (form) ->
    fields = form.querySelectorAll '[data-validation]'
    validationResults = []

    validationResults.push @validateInput field for field in fields

    if false in validationResults
      return false
    else
      return true

  validateInput: (inputNode) ->
    input = new ValidatableInput inputNode

    validations = @_generateValidations input.validations()
    errors = new Errors

    @_performBuiltinValidations(input.asHtmlNode(), validations)
    @_performFormatValidation(input.asHtmlNode(), validations.format)

    input.resetErrorMessages()

    if errors.none()
      return true
    else
      input.setupErrorMessage errors.fullMessages()
      return false

  _validations: {}

  _performFormatValidation: (input, format) ->
    if format
      for key in Object.keys format
        unless @_validations[key].validationHandler.test input.value
          errors.add @_validations[key].errorMessage

  _performBuiltinValidations: (input, validations) ->
    for key in Object.keys validations
      if key != 'format'
        result = @_validations[key].validationHandler(input, validations)
        errors.add result

  _setupBuiltInValidations: ->
    @defineValidation 'email', /.+@.+\..+/, 'Email is invalid'
    @defineValidation 'tel', /\d{8}/, 'Telephone number is invalid'
    @defineValidation 'number', /^\d+$/, 'Invalid'

    @defineValidation 'required', (input, data) =>
      if input.getAttribute('type') is 'checkbox'
        "Most be checked" unless input.checked
      else
        "Can't be blank" unless /^.+$/.test input.value

    @defineValidation 'length', (input, data) =>
      new CharacterCountValidation(input.value.length, data.length.min, data.length.max).validate()

    @defineValidation 'wordCount', (input, data) =>
      length = if input.value is ''
                 length = 0
               else
                 input.value.split(/[ ]+/).length

      new WordCountValidation(length, data.wordCount.min, data.wordCount.max).validate()

    @defineValidation 'allowEmpty', (input, data) =>
      @_alwaysValidIf input.value is ''

    @defineValidation 'onlyIfChecked', (input, data) =>
      @_alwaysValidIf !document.getElementById(data.onlyIfChecked).checked

    @defineValidation 'onlyIfEmpty', (input, data) =>
      @_alwaysValidIf /.+/.test(document.getElementById(data.onlyIfEmpty).value)

  _alwaysValidIf: (condition) ->
      errors.alwaysReturn [] if condition

  _generateValidations: (string) ->
    @parser.parse string
