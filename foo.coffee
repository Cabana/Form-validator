validator.defineValidationFormat 'tel', (value) ->
  if /\d{8}/.test value
    true
  else
    false

validator.defineValidation 'minlength', (arg, value) ->
  if value.length >= parseInt(arg)
    true
  else
    false
