errors = new Object

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
      if new ValidatableInput(input).isEmpty()
        return "Can't be blank"
      else if input.getAttribute("type") is "checkbox"
        return "Most be checked" unless input.checked

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
      otherInput = document.getElementById(data.onlyIfEmpty)

      unless new ValidatableInput(otherInput).isEmpty()
        @_alwaysValidIf true

  _alwaysValidIf: (condition) ->
    errors.alwaysReturn [] if condition

  _generateValidations: (string) ->
    @parser.parse string
