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
    @errors.push message

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

class ValidatableInput
  constructor: (input) ->
    @input = input

  setupErrorMessage: (fullMessages) ->
    @input.setAttribute 'data-error-message', fullMessages

  resetErrorMessages: ->
    @input.removeAttribute 'data-error-message'

  validations: ->
    @input.dataset.validation

  asHtmlNode: ->
    @input

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

  validateInput: (inputNode) ->
    input = new ValidatableInput inputNode

    validations = @_generateValidations input.validations()
    @errors = new Errors

    @_performBuiltinValidations(input.asHtmlNode(), validations)
    @_performFormatValidation(input.asHtmlNode(), validations.format)

    input.resetErrorMessages input

    if @errors.none()
      return true
    else
      input.setupErrorMessage @errors.fullMessages()
      return false

  _validations: {}

  _performFormatValidation: (input, format) ->
    if format
      for key in Object.keys format
        unless @_validations[key].validationHandler.test input.value
          @errors.add @_validations[key].errorMessage

  _performBuiltinValidations: (input, validations) ->
    for key in Object.keys validations
      if key != 'format'
        @_validations[key].validationHandler(input, validations)

  _setupBuiltInValidations: ->
    @defineValidation 'email', /.+@.+\..+/, 'Email is invalid'
    @defineValidation 'tel', /\d{8}/, 'Telephone number is invalid'
    @defineValidation 'number', /^\d+$/, 'Invalid'

    @defineValidation 'required', (input, data) =>
      unless /^.+$/.test input.value
        @errors.add "Can't be blank"

    @defineValidation 'length', (input, data) =>
      @_performRangeValidation input.value.length, data.length.min, data.length.max

    @defineValidation 'wordCount', (input, data) =>
      length = if input.value is ''
                 length = 0
               else
                 input.value.split(/[ ]+/).length

      @_performRangeValidation length, data.wordCount.min, data.wordCount.max

    @defineValidation 'allowEmpty', (input, data) =>
      @_alwaysValidIf input.value is ''

    @defineValidation 'onlyIfChecked', (input, data) =>
      @_alwaysValidIf !document.getElementById(data.onlyIfChecked).checked

  _performRangeValidation: (length, min, max) ->
    if max and min and length not in [min..max]
      @errors.add "Value most be at least #{min} and maximum #{max} characters long"
    else if min and length < min
      @errors.add "Value most be at least #{min}"
    else if max and length > max
      @errors.add "Value can't be longer than #{max}"

  _alwaysValidIf: (condition) ->
      @errors.alwaysReturn [] if condition

  _generateValidations: (string) ->
    @parser.parse string
