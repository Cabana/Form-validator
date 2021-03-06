this.Errors = (function() {
  function Errors() {
    this.errors = [];
  }

  Errors.prototype.add = function(message) {
    var error, _i, _len, _results;
    if (message) {
      if (typeof message === 'string') {
        return this.errors.push(message);
      } else {
        _results = [];
        for (_i = 0, _len = message.length; _i < _len; _i++) {
          error = message[_i];
          _results.push(this.errors.push(error));
        }
        return _results;
      }
    }
  };

  Errors.prototype.none = function() {
    if (this.errors.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  Errors.prototype.fullMessages = function() {
    return window.toSentence(this.errors).toLowerCase().capitalize();
  };

  Errors.prototype.all = function() {
    return this.errors;
  };

  Errors.prototype.alwaysReturn = function(boolean) {
    return this.none = function() {
      return boolean;
    };
  };

  Errors.prototype.alwaysNoneIf = function(condition) {
    if (condition) {
      return this.alwaysReturn([]);
    }
  };

  Errors.prototype.alwaysNone = function() {
    return this.alwaysReturn([]);
  };

  return Errors;

})();
