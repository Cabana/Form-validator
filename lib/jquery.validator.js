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
        var errorMessage = this.dataset.errorMessage;
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
