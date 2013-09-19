class this.Group
  constructor: (name) ->
    this.name = name

  fields: ->
    this._findInputs()

  invalidFields: ->
    this._findInputs('[data-error-message]')

  validFields: ->
    this._findInputs(':not([data-error-message])')

  containsValidFields: ->
    this.fields().length != this.invalidFields().length

  _findInputs: (extra = '') ->
    document.querySelectorAll('[data-validation*="group:' + this.name + '"]' + extra)
