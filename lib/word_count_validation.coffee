class this.WordCountValidation extends RangeValidation
  mixedMessage: ->
    "Can't contain less than #{this.min} or more than #{this.max} words"

  tooShortMessage: ->
    "Can't contain less than #{this.min} words"

  tooLongMessage: ->
    "Can't contain more than #{this.max} words"
