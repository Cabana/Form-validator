errors = new Object

class this.FormValidator
  constructor: ->
    parser = new Parser

    this.parser = parser

    this._setupBuiltInValidations()

  defineValidation: (name, validatorFunction, errorMessage) ->
    this._validations[name] =
      validationHandler: validatorFunction,
      errorMessage: errorMessage

  validateForm: (form) ->
    fields = form.querySelectorAll '[data-validation]'
    validationResults = []

    validationResults.push this.validateInput field for field in fields

    if false in validationResults
      return false
    else
      return true

  validateInput: (inputNode) ->
    input = new InputWithValidations inputNode

    validations = this._generateValidations input.validations()
    errors = new Errors

    this._performBuiltinValidations(input.asHtmlNode(), validations)
    this._performFormatValidation(input.asHtmlNode(), validations.format)

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
        unless this._validations[key].validationHandler.test input.value
          errors.add this._validations[key].errorMessage

  _performBuiltinValidations: (input, validations) ->
    for key in Object.keys validations
      if key != 'format'
        result = this._validations[key].validationHandler(input, validations)
        errors.add result

  _setupBuiltInValidations: ->
    this.defineValidation 'email', /.+@.+\..+/, 'Email is invalid'
    this.defineValidation 'tel', /^\d{8}$/, 'Telephone number is invalid'
    this.defineValidation 'number', /^\d+$/, 'Invalid'

    this.defineValidation 'required', (input, data) =>
      if new InputWithValidations(input).isEmpty()
        return "Can't be blank"
      else if input.getAttribute("type") is "checkbox"
        return "Most be checked" unless input.checked

    this.defineValidation 'length', (input, data) =>
      new CharacterCountValidation(input.value.length, data.length.min, data.length.max).validate()

    this.defineValidation 'wordCount', (input, data) =>
      length = if input.value is ''
                 length = 0
               else
                 input.value.split(/[ ]+/).length

      new WordCountValidation(length, data.wordCount.min, data.wordCount.max).validate()

    this.defineValidation 'allowEmpty', (input, data) =>
      errors.alwaysNoneIf input.value is ''

    this.defineValidation 'onlyIfChecked', (input, data) =>
      errors.alwaysNoneIf !document.getElementById(data.onlyIfChecked).checked

    this.defineValidation 'onlyIfEmpty', (input, data) =>
      unless new InputWithValidations(document.getElementById(data.onlyIfEmpty)).isEmpty()
        errors.alwaysNone()

  _generateValidations: (string) ->
    this.parser.parse string
