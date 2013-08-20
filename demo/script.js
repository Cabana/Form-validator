$(function(){

  var customValidator = new FormValidator();

  customValidator.defineValidation('cpr', /\d{6}-\d{4}/, 'Invalid cpr number');

  customValidator.defineValidation('newRequired', function(input, data) {
    if (!/^.+$/.test(input.value)) {
      return "Can't be blank";
    }
  });

  customValidator.defineValidation('exactLength', function(input, data) {
    if (input.value.length != data.exactLength) {
      return "Input must be exactly " + data.exactLength + " characters long";
    }
  });

  $('form').validate({
    validator: customValidator
  });

});
