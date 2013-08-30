class @CharacterCountValidation extends RangeValidation
  mixedMessage: ->
    "Value most be at least #{@min} and maximum #{@max} characters long"

  tooShortMessage: ->
    "Value most be at least #{@min}"

  tooLongMessage: ->
    "Value can't be longer than #{@max}"
