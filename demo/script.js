$(function(){

  $("#mainform").validate({
    onBlur: true
   ,ifInvalid: function() {
      console.log("invalid");
    }
   ,ifValid: function() {
      console.log("valid");
    }
   ,beforeValidation: function() {
      console.log("before");
    }
   ,afterValidation: function() {
      console.log("after");
    }
  });

});
