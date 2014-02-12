$(function(){

  $("#mainform").validate({
    onBlur: true,

    afterValidation: function(event, button) {
      console.log(button);
    },

    beforeValidation: function(event, button) {
      console.log(button);
    },

    ifInvalid: function() {
      console.log("invalid");
    },

    ifValid: function() {
      console.log("valid");
    }
  });

});
