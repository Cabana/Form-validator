errors = new Object

class this.FormValidator
  constructor: ->
    this._setupBuiltInValidations()

  defineValidation: (name, validatorFunction, errorMessage) ->
    this._validations[name] =
      validationHandler: validatorFunction,
      errorMessage: errorMessage

  validateForm: (form) ->
    fields = form.querySelectorAll '[data-validation]'

    validationResults = []
    for field in fields
      this.validateInput field

    for field in fields
      if field.hasAttribute 'data-error-message'
        return false

    return true

  validateInput: (inputNode) ->
    input = new InputWithValidations inputNode
    errors = new Errors

    if input.isInGroup()
      nodeList = input.group.fields()
      # convert the nodeList to an array
      nodesInGroup = []
      `for(var i = nodeList.length; i--; nodesInGroup.unshift(nodeList[i]));`

      for node in nodesInGroup
        validatableNode = new InputWithValidations(node).withoutGroup().asHtmlNode()
        return true if this.validateInput(validatableNode)
    else
      this._performBuiltinValidations(input.asHtmlNode(), input.validations())
      this._performFormatValidation(input.asHtmlNode(), input.validations().format)

    input.resetErrorMessages()

    if errors.none()
      true
    else
      input.setupErrorMessage errors.fullMessages()
      false

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
      else if input.getAttribute("type") is "checkbox" or
              input.getAttribute("type") is "radio"
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

    this.defineValidation 'group', (input, data) =>

this.FormValidator.version = '0.3.1'
