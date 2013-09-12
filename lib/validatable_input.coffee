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
    this.parser.parse this.input.getAttribute('data-validation')

  asHtmlNode: ->
    this.input

  isInGroup: ->
    this.validations().group

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

class Group
  constructor: (name) ->
    this.name = name

  containsValidFields: ->
    elementsInGroup = document.querySelectorAll('[data-validation*="group:' + this.name + '"]')
    elementsInGroupWithErrors = document.querySelectorAll('[data-validation*="group:' + this.name + '"][data-error-message]')
    if elementsInGroup.length != elementsInGroupWithErrors.length
      return true
