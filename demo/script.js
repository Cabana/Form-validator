$(function(){

  var validator = new FormValidator();

  var input = document.getElementById("foo");
  console.log(validator.validateInput(input));
  console.log(input.value);

  $("#mainform").validate({
    validator: validator
  });

});
