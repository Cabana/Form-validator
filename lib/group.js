this.Group = (function() {
  function Group(name) {
    this.name = name;
  }

  Group.prototype.fields = function() {
    return this._findInputs();
  };

  Group.prototype.invalidFields = function() {
    return this._findInputs('[data-error-message]');
  };

  Group.prototype.validFields = function() {
    return this._findInputs(':not([data-error-message])');
  };

  Group.prototype.containsValidFields = function() {
    return this.fields().length !== this.invalidFields().length;
  };

  Group.prototype._findInputs = function(extra) {
    if (extra == null) {
      extra = '';
    }
    return document.querySelectorAll('[data-validation*="group:' + this.name + '"]' + extra);
  };

  return Group;

})();
