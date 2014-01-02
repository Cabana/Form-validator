$(function(){

  var validator = new FormValidator();

  var form = document.querySelector("form#mainform");

  console.log(validator.validateForm(form));

  $("#mainform").validate({
    validator: validator
  });

});
