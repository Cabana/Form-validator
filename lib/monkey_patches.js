var keys;

if (!Object.keys) {
  Object.keys = keys = function(object) {
    var buffer, key;
    buffer = [];
    key = void 0;
    for (key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        buffer.push(key);
      }
    }
    return buffer;
  };
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

window.toSentence = function(array) {
  var lastWordConnector, sentence, twoWordsConnector, wordsConnector;
  wordsConnector = ", ";
  twoWordsConnector = " and ";
  lastWordConnector = ", and ";
  sentence = void 0;
  switch (array.length) {
    case 0:
      sentence = "";
      break;
    case 1:
      sentence = array[0];
      break;
    case 2:
      sentence = array[0] + twoWordsConnector + array[1];
      break;
    default:
      sentence = array.slice(0, -1).join(wordsConnector) + lastWordConnector + array[array.length - 1];
  }
  return sentence;
};
