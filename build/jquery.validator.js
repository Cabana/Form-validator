var split;
split=split||function(f){var a=String.prototype.split,b=/()??/.exec("")[1]===f,c;c=function(d,e,c){if("[object RegExp]"!==Object.prototype.toString.call(e))return a.call(d,e,c);var h=[],k=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.extended?"x":"")+(e.sticky?"y":""),l=0;e=RegExp(e.source,k+"g");var m,g,n;d+="";b||(m=RegExp("^"+e.source+"$(?!\\s)",k));for(c=c===f?4294967295:c>>>0;g=e.exec(d);){k=g.index+g[0].length;if(k>l&&(h.push(d.slice(l,g.index)),!b&&1<g.length&&g[0].replace(m,function(){for(var a=1;a<
arguments.length-2;a++)arguments[a]===f&&(g[a]=f)}),1<g.length&&g.index<d.length&&Array.prototype.push.apply(h,g.slice(1)),n=g[0].length,l=k,h.length>=c))break;e.lastIndex===g.index&&e.lastIndex++}l===d.length?(n||!e.test(""))&&h.push(""):h.push(d.slice(l));return h.length>c?h.slice(0,c):h};String.prototype.split=function(a,b){return c(this,a,b)};return c}();
(function(){Array.prototype.clean=function(f){var a;for(a=0;a<this.length;)this[a]===f&&(this.splice(a,1),a--),a++;return this};String.prototype.wrapInBraces=function(){return this.replace(/^/,"{").replace(/$/,"}")};String.prototype.replaceSquareBracketsWithBraces=function(){return this.replace(/\[/g,"{").replace(/\]/g,"}")};String.prototype.removeWhitespace=function(){return this.replace(/\s+/g,"")};this.Parser=function(){function f(a){this.defaults=a}f.prototype.parse=function(a){var b;b={};if(""===
a)return b;a=this._prepareString(a);return this._toJSON(a)};f.prototype.addDefaultValue=function(a,b){this.defaults||(this.defaults={});return this.defaults[a]=b};f.prototype._prepareString=function(a){a=a.removeWhitespace();this.defaults&&(a=this._applyOptionValues(a));a=this._setUndefinedValues(a);return a=this._wrapWordsInQuotes(a)};f.prototype._applyOptionValues=function(a){var b,c,d,e,f;c="";a=this._splitIntoWords(a);b=e=0;for(f=a.length;e<f;b=++e)d=a[b],b=a[b+1],this.defaults[d]&&":"!==b&&(d+=
":"+this.defaults[d]),c+=d;return c};f.prototype._setUndefinedValues=function(a){var b,c,d,e,f,h;d=this._splitIntoWords(a);b=f=0;for(h=d.length;f<h;b=++f)if(e=d[b],a=d[b+1],c=d[b-1],/\]+/.test(a)&&":"!==c||","===a||void 0===a&&!/\]+/.test(e))d[b]+=":undefined";a=d.join("");b="";e=a.split(/(\[|,|\])/);c=0;for(d=e.length;c<d;c++)a=e[c],/.*:.*:.*/.test(a)&&(a=a.replace(":undefined","")),b+=a;return b};f.prototype._splitIntoWords=function(a){return split(a,/(:\[?|\]+,?|,)/).clean("")};f.prototype._wrapWordsInQuotes=
function(a){var b,c,d,e;b=this._splitIntoWords(a);a=d=0;for(e=b.length;d<e;a=++d)c=b[a],":"===c||(/\]+/.test(c)||":["===c||","===c)||(/^\d+$/.test(c)?b[a]=parseInt(c):b[a]="true"===c?!0:"false"===c?!1:'"'+c+'"');return b.join("")};f.prototype._toJSON=function(a){/\.*:\.*/.test(a)||(a+=':"undefined"');a=a.replaceSquareBracketsWithBraces().wrapInBraces();a=a.replace(/\\/g,"\\\\");return JSON.parse(a)};return f}()}).call(this);
/**
 * Array.filter polyfil for IE8.
 *
 * https://gist.github.com/eliperelman/1031656
 */
[].filter || (Array.prototype.filter =
  function(a,
    b,
    c,
    d,
    e
  ) {
      c = this;
      d = [];
      for (e in c)
        ~~e + '' == e && e >= 0 &&
        a.call(b, c[e], +e, c) &&
        d.push(c[e]);

      return d
  });
(function() {
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

}).call(this);
(function() {
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

}).call(this);
(function() {
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

}).call(this);
(function() {
  this.InputWithValidations = (function() {
    function InputWithValidations(input) {
      var parser;
      parser = new Parser;
      this.parser = parser;
      this.input = input;
      this.customMessage = this.input.getAttribute('data-custom-error-message');
      if (this.isInGroup()) {
        this.group = new Group(this.groupName());
      }
    }

    InputWithValidations.prototype.setupErrorMessage = function(fullMessages) {
      return this.input.setAttribute('data-error-message', this.customMessage || fullMessages);
    };

    InputWithValidations.prototype.resetErrorMessages = function() {
      return this.input.removeAttribute('data-error-message');
    };

    InputWithValidations.prototype.validations = function() {
      if (this.input.getAttribute('data-validation')) {
        return this.parser.parse(this.input.getAttribute('data-validation'));
      } else {
        return {};
      }
    };

    InputWithValidations.prototype.asHtmlNode = function() {
      return this.input;
    };

    InputWithValidations.prototype.isInGroup = function() {
      return this.validations().group;
    };

    InputWithValidations.prototype.withoutGroup = function() {
      var clone, validationAttribute, validationAttributeWithoutGroups;
      clone = this.input.cloneNode(false);
      validationAttribute = clone.getAttribute("data-validation");
      validationAttributeWithoutGroups = validationAttribute.replace(' ', '').split(",").filter(function(e) {
        return !/group:/.test(e);
      }).join(",");
      clone.setAttribute("data-validation", validationAttributeWithoutGroups);
      return new InputWithValidations(clone);
    };

    InputWithValidations.prototype.groupName = function() {
      return this.validations().group;
    };

    InputWithValidations.prototype.isEmpty = function() {
      if (this.input.nodeName.toLowerCase() === "select") {
        if (this.input.querySelector("option").text === this.input.value || this.input.value === '') {
          return true;
        } else {
          return false;
        }
      } else if (!/^.+$/.test(this.input.value)) {
        return true;
      } else {
        return false;
      }
    };

    return InputWithValidations;

  })();

}).call(this);
(function() {
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

}).call(this);
(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.CharacterCountValidation = (function(_super) {
    __extends(CharacterCountValidation, _super);

    function CharacterCountValidation() {
      _ref = CharacterCountValidation.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CharacterCountValidation.prototype.mixedMessage = function() {
      return "Value most be at least " + this.min + " and maximum " + this.max + " characters long";
    };

    CharacterCountValidation.prototype.tooShortMessage = function() {
      return "Value most be at least " + this.min;
    };

    CharacterCountValidation.prototype.tooLongMessage = function() {
      return "Value can't be longer than " + this.max;
    };

    return CharacterCountValidation;

  })(RangeValidation);

}).call(this);
(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.WordCountValidation = (function(_super) {
    __extends(WordCountValidation, _super);

    function WordCountValidation() {
      _ref = WordCountValidation.__super__.constructor.apply(this, arguments);
      return _ref;
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

}).call(this);
(function() {
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
      var _this = this;
      this.defineValidation('email', /.+@.+\..+/, 'Email is invalid');
      this.defineValidation('tel', /^\d{8}$/, 'Telephone number is invalid');
      this.defineValidation('number', /^\d+$/, 'Invalid');
      this.defineValidation('required', function(input, data) {
        if (new InputWithValidations(input).isEmpty()) {
          return "Can't be blank";
        } else if (input.getAttribute("type") === "checkbox" || input.getAttribute("type") === "radio") {
          if (!input.checked) {
            return "Most be checked";
          }
        }
      });
      this.defineValidation('length', function(input, data) {
        return new CharacterCountValidation(input.value.length, data.length.min, data.length.max).validate();
      });
      this.defineValidation('wordCount', function(input, data) {
        var length;
        length = input.value === '' ? length = 0 : input.value.split(/[ ]+/).length;
        return new WordCountValidation(length, data.wordCount.min, data.wordCount.max).validate();
      });
      this.defineValidation('allowEmpty', function(input, data) {
        return errors.alwaysNoneIf(input.value === '');
      });
      this.defineValidation('onlyIfChecked', function(input, data) {
        return errors.alwaysNoneIf(!document.getElementById(data.onlyIfChecked).checked);
      });
      this.defineValidation('onlyIfEmpty', function(input, data) {
        if (!new InputWithValidations(document.getElementById(data.onlyIfEmpty)).isEmpty()) {
          return errors.alwaysNone();
        }
      });
      return this.defineValidation('group', function(input, data) {});
    };

    return FormValidator;

  })();

}).call(this);
; (function ( $, window, document, undefined ) {

  // Create the defaults once
  var pluginName = "validate",
  defaults = {
    validator: new FormValidator(),
    onBlur: false,
    selectorClasses: {
      field: '.field'
    },
    errorClasses: {
      input: 'input-with-error',
      field: 'field-with-error',
      form: 'form-with-error'
    },
    beforeValidation: function() {},
    afterValidation: function() {},
    ifValid: function() {},
    ifInvalid: function() {},
    formWrapperSelector: undefined
  };

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.element = element;

    this.options = $.extend( {}, defaults, options );

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {
    version: '0.3',

    init: function() {
      var that = this;
      var element = that.element;
      var options = that.options;
      var validator = options.validator;

      var formShouldBeValidated = true;

      element.setAttribute('novalidate', 'true');

      $(document).on('keydown', function(e) {
        if (pressIsEnter(e) && nodeIsInput(e.target)) {
          $('input[type="submit"]:not([data-skip-validation])').trigger('click');
        }
      });

      $('input[data-skip-validation]').hover(function(){
        formShouldBeValidated = false;
      }, function() {
        formShouldBeValidated = true;
      }).on('click', function(e) {
        if (formShouldBeValidated) {
          e.preventDefault();
        }
      });

      var buttonClicked = null;
      $(document).on('click', function(event) {
        buttonClicked = event.target;
      });

      $(element).on('submit', function(e){
        if (formShouldBeValidated) {
          options.beforeValidation();

          var validationResults = [];
          $(buttonClicked).parents(options.formWrapperSelector).find('[data-validation]').each(function() {
            var isInputValid = validator.validateInput(this);

            validationResults.push(isInputValid);

            if (validator.validateInput(this)) {
              // field is valid
            } else {
              // field is invalid
              e.preventDefault();
            }
          });

          if (validationResults.indexOf(false) != -1) {
            options.ifInvalid();
          } else {
            options.ifValid();
          }

          that.setErrorClasses(element, options);
          that.setErrorMessages(element, options);

          $('.input-with-error').first().focus();

          options.afterValidation();
        }
      });

      if (options.onBlur) {
        $(element).find('[data-validation]').on('blur', function(e){
          validator.validateInput(this);
          that.setErrorClasses(element, options);
          that.setErrorMessages(element, options);
        });
      }
    },

    setErrorClasses: function(element, options) {
      $('.' + options.errorClasses.input).removeClass(options.errorClasses.input);
      $('.' + options.errorClasses.field).removeClass(options.errorClasses.field);
      $('.' + options.errorClasses.form).removeClass(options.errorClasses.form);

      var inputs = $(element).find('[data-error-message]');
      inputs.each(function() {
        var input = $(this);
        var field = input.parents(options.selectorClasses.field);
        var form = $(element);

        input.addClass(options.errorClasses.input);
        field.addClass(options.errorClasses.field);
        form.addClass(options.errorClasses.form);
      });
    },

    setErrorMessages: function(element, options) {
      $(element).find('small.error-message').remove();

      $(element).find('[data-error-message]').each(function(){
        var errorMessage = $(this).data("errorMessage");
        $(this).after('<small class="error-message">' + errorMessage + '</small>');
      });
    }
  };

  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
      }
    });
  };

  function nodeIsInput(node) {
    var nodeName = node.nodeName.toLowerCase();
    if (nodeName == 'input' || nodeName == 'textarea' || nodeName == 'select') {
      return true;
    } else {
      return false;
    }
  }

  function pressIsEnter(event) {
    if (event.keyCode === 13) {
      return true;
    }
  }

})( jQuery, window, document );
