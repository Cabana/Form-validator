var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

this.RangeValidation = (function() {
  function RangeValidation(length, min, max) {
    this.length = length;
    this.min = min;
    this.max = max;
  }

  RangeValidation.prototype.validate = function() {
    var _i, _ref, _ref1, _ref2, _results;
    if (this.max && this.min && (_ref = this.length, __indexOf.call((function() {
      _results = [];
      for (var _i = _ref1 = this.min, _ref2 = this.max; _ref1 <= _ref2 ? _i <= _ref2 : _i >= _ref2; _ref1 <= _ref2 ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this), _ref) < 0)) {
      return this.mixedMessage();
    } else if (this.min && this.length < this.min) {
      return this.tooShortMessage();
    } else if (this.max && this.length > this.max) {
      return this.tooLongMessage();
    }
  };

  return RangeValidation;

})();
