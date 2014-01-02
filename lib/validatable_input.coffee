class this.InputWithValidations
  constructor: (input) ->
    parser = new Parser
    this.parser = parser

    this.input = input
    this.customMessage = this.input.getAttribute 'data-custom-error-message'

    if this.isInGroup()
      this.group = new Group this.groupName()

  setupErrorMessage: (fullMessages) ->
    this.input.setAttribute 'data-error-message', this.customMessage || fullMessages

  resetErrorMessages: ->
    this.input.removeAttribute 'data-error-message'

  validations: ->
    if this.input.getAttribute('data-validation')
      this.parser.parse this.input.getAttribute('data-validation')
    else
      {}

  asHtmlNode: ->
    this.input

  isInGroup: ->
    this.validations().group

  withoutGroup: ->
    clone = this.input.cloneNode(false)
    validationAttribute = clone.getAttribute("data-validation")
    validationAttributeWithoutGroups = validationAttribute.replace(' ', '').split(",").filter((e) -> !/group:/.test(e)).join(",")
    clone.setAttribute("data-validation", validationAttributeWithoutGroups)
    new InputWithValidations(clone)

  groupName: ->
    this.validations().group

  isEmpty: ->
    if this.input.nodeName.toLowerCase() is "select"
      if this.input.querySelector("option").text is this.input.value or this.input.value is ''
        true
      else
        false
    else if !/^.+$/.test(this.input.value)
      true
    else
      false
