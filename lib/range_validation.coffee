class @RangeValidation
  constructor: (length, min, max) ->
    @length = length
    @min = min
    @max = max

  validate: ->
    if @max and @min and @length not in [@min..@max]
      @mixedMessage()
    else if @min and @length < @min
      @tooShortMessage()
    else if @max and @length > @max
      @tooLongMessage()
