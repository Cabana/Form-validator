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
    }
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

      element.setAttribute('novalidate', 'true');

      $(element).on('submit', function(e){

        if ( validator.validateForm(element) ) {
          // every field was valid
        } else {
          // there were invalid fields
          e.preventDefault();
        }

        that.setErrorClasses(element, options);
        that.setErrorMessages(element, options);

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

})( jQuery, window, document );
