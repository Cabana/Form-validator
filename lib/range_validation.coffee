class this.RangeValidation
  constructor: (length, min, max) ->
    this.length = length
    this.min = min
    this.max = max

  validate: ->
    if this.max and this.min and this.length not in [this.min..this.max]
      this.mixedMessage()
    else if this.min and this.length < this.min
      this.tooShortMessage()
    else if this.max and this.length > this.max
      this.tooLongMessage()
