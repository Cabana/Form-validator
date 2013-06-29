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
    email:
      regex: '.+@.+\\..+',
      errorMessage: 'Email is invalid'
    tel:
      regex: '\\d{8}',
      errorMessage: 'Telephone number is invalid'
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

  errorMessages: []

  validateInput: (input) ->
    @errorMessages = []
    value = input.value
    validations = @_generateValidations input.dataset.validation
    validationResults = []

    validationResults.push @_validateFormat value, validations.format if validations.format
    validationResults.push @_validateLength value, validations.length if validations.length
    validationResults.push @_validateWordCount value, validations.wordCount if validations.wordCount

    if validations.required && value == ''
      @errorMessages.push "Can't be blank"
      validationResults.push false

    if validations.allowEmpty && value == ''
      validationResults = [true]

    @_setErrorMessage input, @errorMessages

    if false in validationResults
      return false
    else
      input.setAttribute 'data-error-message', ''
      return true

  defineCustomValidation: (name, regex, errorMessage) ->
    @validations[name] = {}
    @validations[name].regex = regex
    @validations[name].errorMessage = errorMessage
    @parser.addDefaultValue name, regex

  validateForm: (form) ->
    validationResults = []

    for input in form.querySelectorAll '[data-validation]'
      validationResults.push @validateInput input

    if false in validationResults then return false else return true

  _setErrorMessage: (input, messages) ->
    messages = [input.dataset.errorMessage] if input.dataset.errorMessage
    input.setAttribute 'data-error-message', toSentence(messages).toLowerCase().capitalize()

  _generateValidations: (string) ->
    @parser.parse string

  _validateFormat: (value, format = {}) ->
    validationResults = []

    Object.keys(format).forEach (key) =>
      regex = new RegExp format[key]
      valid = regex.test value
      @errorMessages.push @validations[key].errorMessage unless valid
      validationResults.push valid

    if false in validationResults then return false else return true

  _validateLength: (value, lengths = {}) ->
    validationResults = []

    max = lengths.max
    min = lengths.min

    if max && min
      valid = value.length in [min..max]
    else if min
      valid = value.length >= min
    else if max
      valid = value.length <= max

    validationResults.push valid
    @errorMessages.push @validations.length.errorMessage min, max unless valid
    if false in validationResults then return false else return true

  _validateWordCount: (value, lengths = {}) ->
    validationResults = []

    max = lengths.max
    min = lengths.min

    wordCountRegex = /[ ]+/
    if max && min
      valid = value.split(wordCountRegex).length in [min..max]
    else if min
      valid = value.split(wordCountRegex).length >= min
    else if max
      valid = value.split(wordCountRegex).length <= max

    validationResults.push valid
    @errorMessages.push @validations.wordCount.errorMessage min, max unless valid
    if false in validationResults then return false else return true
