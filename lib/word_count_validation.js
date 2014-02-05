var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.WordCountValidation = (function(_super) {
  __extends(WordCountValidation, _super);

  function WordCountValidation() {
    return WordCountValidation.__super__.constructor.apply(this, arguments);
  }

  WordCountValidation.prototype.mixedMessage = function() {
    return "Can't contain less than " + this.min + " or more than " + this.max + " words";
  };

  WordCountValidation.prototype.tooShortMessage = function() {
    return "Can't contain less than " + this.min + " words";
  };

  WordCountValidation.prototype.tooLongMessage = function() {
    return "Can't contain more than " + this.max + " words";
  };

  return WordCountValidation;

})(RangeValidation);
