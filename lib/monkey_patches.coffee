unless Object.keys
  Object.keys = keys = (object) ->
    buffer = []
    key = undefined
    for key of object
      buffer.push key  if Object::hasOwnProperty.call(object, key)
    buffer

String::capitalize = ->
  this.charAt(0).toUpperCase() + this.slice(1)

window.toSentence = (array) ->
  wordsConnector = ", "
  twoWordsConnector = " and "
  lastWordConnector = ", and "
  sentence = undefined
  switch array.length
    when 0
      sentence = ""
    when 1
      sentence = array[0]
    when 2
      sentence = array[0] + twoWordsConnector + array[1]
    else
      sentence = array.slice(0, -1).join(wordsConnector) + lastWordConnector + array[array.length - 1]
  sentence
