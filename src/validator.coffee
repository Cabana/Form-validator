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

class @FormValidator
  constructor: ->
    regexes = {}

    for key in Object.keys(@_validations)
      regexes[key] = @_validations[key].regex

    parser = new Parser regexes
    parser.addDefaultValue 'required', true
    parser.addDefaultValue 'allowEmpty', true

    @parser = parser

  validateInput: (input) ->
    @_errorMessages = []
    value = input.value
    validations = @_generateValidations input.dataset.validation

    validationResults = []
    validationResults.push @_validateFormat value, validations.format if validations.format
    validationResults.push @_validateLength value, validations.length if validations.length
    validationResults.push @_validateWordCount value, validations.wordCount if validations.wordCount

    if validations.required && value == ''
      @_errorMessages.push @_validations.required.errorMessage
      validationResults.push false

    if validations.allowEmpty && value == ''
      @_errorMessages = []
      validationResults = [true]

    if validations.dependsOn
      checked = document.getElementById(validations.dependsOn).checked
      unless checked
        @_errorMessages = []
        validationResults = [true]

    @_setErrorMessage input, @_errorMessages

    if false in validationResults then return false else return true

  defineCustomValidation: (name, regex, errorMessage = @_validations.customValidations.defaultErrorMessage) ->
    @_validations[name] = {}
    @_validations[name].regex = regex
    @_validations[name].errorMessage = errorMessage
    @parser.addDefaultValue name, regex

  validateForm: (form) ->
    validationResults = []

    for input in form.querySelectorAll '[data-validation]'
      validationResults.push @validateInput input

    if false in validationResults then return false else return true

  _validations:
    email:
      regex: '.+@.+\\..+',
      errorMessage: 'Email is invalid'
    tel:
      regex: '\\d{8}',
      errorMessage: 'Telephone number is invalid'
    number:
      regex: '^\\d+$'
      errorMessage: 'Not a number'
    length:
      errorMessage: (min, max) ->
        if max && min
          "Value most be at least #{min} and maximum #{max} characters long"
        else if min
          "Value most be at least #{min}"
        else if max
          "Value can't be longer than #{max}"
    wordCount:
      errorMessage: (min, max) ->
        if max && min
          "Can't contain less than #{min} or more than #{max} words"
        else if min
          "Can't contain less than #{min} words"
        else if max
          "Can't contain more than #{max} words"
    required:
      errorMessage: "Can't be blank"
    customValidations:
      defaultErrorMessage: "Field is invalid"

  _errorMessages: []

  _setErrorMessage: (input, messages) ->
    @_resetErrorMessage input
    messages = [input.dataset.errorMessage] if input.dataset.errorMessage
    fullMessage = toSentence(messages).toLowerCase().capitalize()
    if fullMessage == ''
      input.removeAttribute 'data-error-message'
    else
      input.setAttribute 'data-error-message', fullMessage

  _resetErrorMessage: (input) ->
    input.setAttribute 'data-error-message', ''

  _generateValidations: (string) ->
    @parser.parse string

  _validateFormat: (value, format = {}) ->
    validationResults = []

    Object.keys(format).forEach (key) =>
      regex = new RegExp format[key]
      valid = regex.test value
      @_errorMessages.push @_validations[key].errorMessage unless valid
      validationResults.push valid

    if false in validationResults then return false else return true

  _validateLength: (value, lengths = {}) ->
    max = lengths.max
    min = lengths.min
    valid = @_isLengthWithinRange value.length, min, max
    @_errorMessages.push @_validations.length.errorMessage min, max unless valid
    valid

  _validateWordCount: (value, lengths = {}) ->
    max = lengths.max
    min = lengths.min

    length = if value == ''
               length = 0
             else
               value.split(/[ ]+/).length

    valid = @_isLengthWithinRange length, min, max
    valid = false if value == '' && !max
    unless valid then @_errorMessages.push @_validations.wordCount.errorMessage min, max
    valid

  _isLengthWithinRange: (length, min, max) ->
    if max && min
      valid = length in [min..max]
    else if min
      valid = length >= min
    else if max
      valid = length <= max
    valid
