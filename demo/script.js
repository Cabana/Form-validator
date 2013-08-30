var validator = new FormValidator();

validator.defineValidation('required', function(input, data){
  var errors = [];
  var errorMessage = "Can't be blank";

  if (input.nodeName.toLowerCase() == 'select') {
    var text = input.querySelector('option').innerText;
    var value = input.value;

    if (text == value) {
      errors.push(errorMessage);
    }
  }

  if (!/.+/.test(input.value)) {
    errors.push(errorMessage);
  }

  return errors;
});

$(function(){

  $('#mainform').validate({
    validator: validator
  });

});
