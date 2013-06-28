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

    for key in Object.keys(@validations)
      regexes[key] = @validations[key].regex

    @parser = new Parser regexes

  validations:
    email: {
      regex: '.+@.+\\..+',
      errorMessage: 'Email is invalid'
    },
    tel: {
      regex: '\\d{8}',
      errorMessage: 'Telephone number is invalid'
    },
    required: {
      regex: '.+',
      errorMessage: 'Can\'t be blank'
    }

  validateInput: (input) ->
    value = input.value
    validationObject = @_generateValidationObject input.dataset.validation

    format = validationObject.format || {}
    length = validationObject.length || {}
    wordCount = validationObject.wordCount || {}

    errorMessages = []
    isValid = []

    # Validate format (regex pattern)
    Object.keys(format).forEach (key) =>
      regex = new RegExp format[key]
      validationResult = regex.test value
      errorMessages.push @validations[key].errorMessage if validationResult == false
      isValid.push validationResult

    # Validate length
    if length.max && length.min
      validationResult = value.length in [length.min..length.max]
      errorMessages.push "Value most be at least #{length.min} and maximum #{length.max} characters long" if validationResult == false
      isValid.push validationResult
    else if length.min
      validationResult = value.length >= length.min
      errorMessages.push "Value most be at least #{length.min}" if validationResult == false
      isValid.push validationResult
    else if length.max
      validationResult = value.length <= length.max
      errorMessages.push "Value can't be longer than #{length.max}" if validationResult == false
      isValid.push validationResult

    # Validate wordCount
    Object.keys(wordCount).forEach (key) ->
      min = wordCount.min
      max = wordCount.max
      regex = /[ ]+/
      if min && max
        isValid.push value.split(regex).length in [min..max]
      else if min
        isValid.push value.split(regex).length >= min
      else if max
        isValid.push value.split(regex).length <= max

    if value == '' && validationObject.allowEmpty
      isValid = [true]

    @_setErrorMessage input, errorMessages

    if false in isValid
      false
    else
      true

  defineCustomValidation: (name, regex, errorMessage) ->
    @validations[name] = {}
    @validations[name].regex = regex
    @validations[name].errorMessage = errorMessage
    @parser.addDefaultValue name, regex

  validateForm: (form) ->
    validationResults = []

    for input in form.querySelectorAll('input[data-validation], textarea[data-validation]')
      validationResults.push @.validateInput input

    if false in validationResults
      false
    else
      true

  _setErrorMessage: (input, messages) ->
    input.setAttribute 'data-error-message', toSentence(messages).toLowerCase().capitalize()

  _generateValidationObject: (string) ->
    @parser.parse string
