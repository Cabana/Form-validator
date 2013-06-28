class @FormValidator
  constructor: ->
    @parser = new Parser @validations

  validations:
    email: '.+@.+\\..+',
    tel: '\\d{8}',
    required: '.+'

  validateInput: (input) ->
    value = input.value
    validationObject = @_generateValidationObject input.dataset.validation

    format = validationObject.format || {}
    length = validationObject.length || {}
    wordCount = validationObject.wordCount || {}

    isValid = []

    # Validate format (regex pattern)
    Object.keys(format).forEach (key) ->
      regex = new RegExp format[key]
      isValid.push regex.test value

    # Validate length
    Object.keys(length).forEach (key) ->
      min = length.min
      max = length.max
      if min && max
        isValid.push value.length in [min..max]
      else if min
        isValid.push value.length >= min
      else if max
        isValid.push value.length <= max

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

    if false in isValid
      false
    else
      true

  defineCustomValidation: (name, regex) ->
    @parser.addDefaultValue name, regex

  validateForm: (form) ->
    validationResults = []

    for input in form.querySelectorAll('input[data-validation], textarea[data-validation]')
      validationResults.push @.validateInput input

    if false in validationResults
      false
    else
      true

  _generateValidationObject: (string) ->
    @parser.parse string
