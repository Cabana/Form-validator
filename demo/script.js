var validator = new FormValidator();

validator.defineValidation('cpr', function(input, data) {
  var errors = [];

  // remove dashes
  $(input).val($(input).val().replace(/-/g, ''));

  // remove spaces
  $(input).val($(input).val().replace(/ /g, ''));

  // that it is ten numbers
  if (!/^\d{10}$/.test(input.value)) {
    errors.push('Invalid cpr number');
  }

  var val = $(input).val();

  var shortHandDate = split(val, /(\d{6}).*/).join('');
  try {
    var date = new EasyDate(shortHandDate);

    // that the person is 13 or older
    if (date.yearsAgo() <= 13) {
      errors.push('You must be at least 13 years old');
    }

    // that the date is not in the future
    if (date.isFuture()) {
      errors.push('Date cannot be in future');
    }
  }
  // that the date is valid
  catch(e) {
    errors.push('Invalid date');
  }

  return errors;
});

validator.defineValidation('range', function(input, data){
  var val = parseInt($(input).val(), 10);
  var min = data.range.min;
  var max = data.range.max;
  var errors = [];

  if (min && max) {
    if (!val || min > val || val > max) {
      errors.push('Minimum ' + min);
      errors.push('Maximum ' + max);
    }
  } else if (min) {
    if (!val || min > val) {
      errors.push('Minimum ' + min);
    }
  } else if (max) {
    if (!val || val > max) {
      errors.push('Maximum ' + max);
    }
  }

  return errors;
});

validator.defineValidation('yearRange', function(input, data){
  var val = parseInt($(input).val(), 10);

  var min = data.yearRange.min;
  if (min === 'currentYear') { min = new Date().getFullYear(); }

  var max = data.yearRange.max;
  if (max === 'currentYear') { max = new Date().getFullYear(); }

  var errors = [];

  if (min && max) {
    if (!val || min > val || val > max) {
      errors.push('Minimum ' + min);
      errors.push('Maximum ' + max);
    }
  } else if (min) {
    if (!val || min > val) {
      errors.push('Minimum ' + min);
    }
  } else if (max) {
    if (!val || val > max) {
      errors.push('Maximum ' + max);
    }
  }

  return errors;
});

$(function(){

  $('#mainform').validate({
    validator: validator
  });

});
