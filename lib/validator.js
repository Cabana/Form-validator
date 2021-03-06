var errors;

errors = new Object;

this.FormValidator = (function() {
  function FormValidator() {
    this._setupBuiltInValidations();
  }

  FormValidator.prototype.defineValidation = function(name, validatorFunction, errorMessage) {
    return this._validations[name] = {
      validationHandler: validatorFunction,
      errorMessage: errorMessage
    };
  };

  FormValidator.prototype.validateForm = function(form) {
    var field, fields, validationResults, _i, _j, _len, _len1;
    fields = form.querySelectorAll('[data-validation]');
    validationResults = [];
    for (_i = 0, _len = fields.length; _i < _len; _i++) {
      field = fields[_i];
      this.validateInput(field);
    }
    for (_j = 0, _len1 = fields.length; _j < _len1; _j++) {
      field = fields[_j];
      if (field.hasAttribute('data-error-message')) {
        return false;
      }
    }
    return true;
  };

  FormValidator.prototype.validateInput = function(inputNode) {
    var input, node, nodeList, nodesInGroup, validatableNode, _i, _len;
    input = new InputWithValidations(inputNode);
    errors = new Errors;
    if (input.isInGroup()) {
      nodeList = input.group.fields();
      nodesInGroup = [];
      for(var i = nodeList.length; i--; nodesInGroup.unshift(nodeList[i]));;
      for (_i = 0, _len = nodesInGroup.length; _i < _len; _i++) {
        node = nodesInGroup[_i];
        validatableNode = new InputWithValidations(node).withoutGroup().asHtmlNode();
        if (this.validateInput(validatableNode)) {
          return true;
        }
      }
    } else {
      this._performBuiltinValidations(input.asHtmlNode(), input.validations());
      this._performFormatValidation(input.asHtmlNode(), input.validations().format);
    }
    input.resetErrorMessages();
    if (errors.none()) {
      return true;
    } else {
      input.setupErrorMessage(errors.fullMessages());
      return false;
    }
  };

  FormValidator.prototype._validations = {};

  FormValidator.prototype._performFormatValidation = function(input, format) {
    var key, _i, _len, _ref, _results;
    if (format) {
      _ref = Object.keys(format);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (!this._validations[key].validationHandler.test(input.value)) {
          _results.push(errors.add(this._validations[key].errorMessage));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  FormValidator.prototype._performBuiltinValidations = function(input, validations) {
    var key, result, _i, _len, _ref, _results;
    _ref = Object.keys(validations);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      if (key !== 'format') {
        result = this._validations[key].validationHandler(input, validations);
        _results.push(errors.add(result));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  FormValidator.prototype._setupBuiltInValidations = function() {
    this.defineValidation('email', /.+@.+\..+/, 'Email is invalid');
    this.defineValidation('tel', /^\d{8}$/, 'Telephone number is invalid');
    this.defineValidation('number', /^\d+$/, 'Invalid');
    this.defineValidation('required', (function(_this) {
      return function(input, data) {
        if (new InputWithValidations(input).isEmpty()) {
          return "Can't be blank";
        } else if (input.getAttribute("type") === "checkbox" || input.getAttribute("type") === "radio") {
          if (!input.checked) {
            return "Most be checked";
          }
        }
      };
    })(this));
    this.defineValidation('length', (function(_this) {
      return function(input, data) {
        return new CharacterCountValidation(input.value.length, data.length.min, data.length.max).validate();
      };
    })(this));
    this.defineValidation('wordCount', (function(_this) {
      return function(input, data) {
        var length;
        length = input.value === '' ? length = 0 : input.value.split(/[ ]+/).length;
        return new WordCountValidation(length, data.wordCount.min, data.wordCount.max).validate();
      };
    })(this));
    this.defineValidation('allowEmpty', (function(_this) {
      return function(input, data) {
        return errors.alwaysNoneIf(input.value === '');
      };
    })(this));
    this.defineValidation('onlyIfChecked', (function(_this) {
      return function(input, data) {
        return errors.alwaysNoneIf(!document.getElementById(data.onlyIfChecked).checked);
      };
    })(this));
    this.defineValidation('onlyIfEmpty', (function(_this) {
      return function(input, data) {
        if (!new InputWithValidations(document.getElementById(data.onlyIfEmpty)).isEmpty()) {
          return errors.alwaysNone();
        }
      };
    })(this));
    this.defineValidation('date', (function(_this) {
      return function(input, data) {
        if (new InputWithValidations(input).isEmpty()) {
          return "Can't be blank";
        } else if (input.getAttribute("type") === "date") {
          var reg = /\d{4}-\d{2}-\d{2}/;
          var regex = new RegExp(reg);
          if (!regex.test(input.value)) {
            return "Something went wrong!";
          } else {
            var valueArray = input.value.split("-"),
                inputYear = valueArray[0],
                inputMonth = valueArray[1],
                inputDate = valueArray[2],
                daysInMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
            if (inputDate > daysInMonth[inputMonth-1]) {
              return "Invalid date";
            } else {
              return true;
            }
          }
        }
      };
    })(this));
    return this.defineValidation('group', (function(_this) {
      return function(input, data) {};
    })(this));
  };

  return FormValidator;

})();

this.FormValidator.version = '0.3.3';
