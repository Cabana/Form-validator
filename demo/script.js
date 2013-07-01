$(function(){

  var customValidator = new FormValidator();

  customValidator.defineCustomValidation('cpr', "\\d{6}-\\d{4}", 'Invalid CPR number');

  $('form').validate({
    validator: customValidator
  });

});
