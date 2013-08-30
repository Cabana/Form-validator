class this.InputWithValidations
  constructor: (input) ->
    this.input = input
    this.customMessage = this.input.getAttribute 'data-custom-error-message'

  setupErrorMessage: (fullMessages) ->
    this.input.setAttribute 'data-error-message', this.customMessage || fullMessages

  resetErrorMessages: ->
    this.input.removeAttribute 'data-error-message'

  validations: ->
    this.input.getAttribute 'data-validation'

  asHtmlNode: ->
    this.input

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
