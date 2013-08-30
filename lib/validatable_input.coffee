class @ValidatableInput
  constructor: (input) ->
    @input = input
    @customMessage = @input.getAttribute 'data-custom-error-message'

  setupErrorMessage: (fullMessages) ->
    @input.setAttribute 'data-error-message', @customMessage || fullMessages

  resetErrorMessages: ->
    @input.removeAttribute 'data-error-message'

  validations: ->
    @input.getAttribute 'data-validation'

  asHtmlNode: ->
    @input

  isEmpty: ->
    if @input.nodeName.toLowerCase() is "select"
      if @input.querySelector("option").text is @input.value or @input.value is ''
        true
      else
        false
    else if !/^.+$/.test(@input.value)
      true
    else
      false
