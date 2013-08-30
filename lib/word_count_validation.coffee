class @WordCountValidation extends RangeValidation
  mixedMessage: ->
    "Can't contain less than #{@min} or more than #{@max} words"

  tooShortMessage: ->
    "Can't contain less than #{@min} words"

  tooLongMessage: ->
    "Can't contain more than #{@max} words"
