class this.Errors
  constructor: ->
    this.errors = []

  add: (message) ->
    if message
      if typeof message is 'string'
        this.errors.push message
      else
        this.errors.push error for error in message

  none: ->
    if this.errors.length == 0
      true
    else
      false

  fullMessages: ->
    toSentence(this.errors).toLowerCase().capitalize()

  all: ->
    this.errors

  alwaysReturn: (boolean) ->
    this.none = -> boolean

  alwaysNoneIf: (condition) ->
    this.alwaysReturn [] if condition

  alwaysNone: ->
    this.alwaysReturn []
