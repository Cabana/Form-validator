; (function ( $, window, document, undefined ) {

  // Create the defaults once
  var pluginName = "validate",
  defaults = {
    validator: new FormValidator(),
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

      $(element).on('submit', function(e){

        if ( validator.validateForm(element) ) {
          // valid
          e.preventDefault();
        } else {
          // invalid
          e.preventDefault();
        }

        that.setErrorClasses(element, options);

        that.setErrorMessages(element, options);

      });
    },

    setErrorClasses: function(element, options) {
      $('.input-with-error').removeClass(options.errorClasses.input);
      $('.field-with-error').removeClass(options.errorClasses.field);
      $('.form-with-error').removeClass(options.errorClasses.form);

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
