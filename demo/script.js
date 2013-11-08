var validator = new FormValidator();

validator.defineValidation('date', function(input, data){
  var errors = [];

  var val = $(input).val();

  if (/^\d{6}.*/.test(val)) {
    val = split(val, /(\d{6}).*/).join('');
  }

  try {
    var date = new EasyDate(val);

    if (date.yearsAgo() < data.date.minYearsAgo) {
      errors.push('You must be at least ' + data.date.minYearsAgo + ' years old');
    }

    if (date.yearsAgo() > data.date.maxYearsAgo) {
      errors.push('Date must be no more than ' + data.date.maxYearsAgo + ' years ago');
    }

    if (data.date.allowFuture === false && date.isFuture()) {
      errors.push('Date cannot be in future');
    }

    if (data.date.allowPast === false && date.isPast()) {
      errors.push('Date cannot be in the past');
    }
  }
  // that the date is valid
  catch(e) {
    errors.push('Invalid date');
  }

  return errors;
});

validator.defineValidation('cpr', function(input, data) {
  var errors = [];

  $(input).val($(input).val().replace(/-/g, ''));
  $(input).val($(input).val().replace(/ /g, ''));

  // that it are ten numbers
  if (!/^\d{10}$/.test(input.value)) {
    errors.push('Invalid cpr number');
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
   ,formWrapperSelector: '.form-container'
  });

});
