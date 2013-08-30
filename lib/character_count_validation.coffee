class this.CharacterCountValidation extends RangeValidation
  mixedMessage: ->
    "Value most be at least #{this.min} and maximum #{this.max} characters long"

  tooShortMessage: ->
    "Value most be at least #{this.min}"

  tooLongMessage: ->
    "Value can't be longer than #{this.max}"
