$(function(){

  $("#mainform").validate({
    onBlur: true,

    ifInvalid: function() {
      alert('invalid');
    },

    ifValid: function(e) {
      alert('valid');
      e.preventDefault();
    }
  });

});
