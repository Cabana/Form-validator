class @Errors
  constructor: ->
    @errors = []

  add: (message) ->
    if message
      if typeof message is 'string'
        @errors.push message
      else
        @errors.push error for error in message

  none: ->
    if @errors.length == 0
      true
    else
      false

  alwaysReturn: (boolean) ->
    @none = ->
      boolean

  fullMessages: ->
    toSentence(@errors).toLowerCase().capitalize()

  all: ->
    @errors

