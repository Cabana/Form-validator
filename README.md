# Form validator

Validate forms client side.

## How to use

- Include jQuery your page.
- Download the latest build and include it on your page.
- Call the plugin like so

```javascript
$('#myForm').validate();
```

- And write some markup

```html
<form action="#">

  <div class="field">
    <label>First name(s):</label>
    <input data-validation="wordCount:[min:1]" type="text">
  </div>

  <div class="field">
    <label>Last name:</label>
    <input data-validation="wordCount:[min:1, max:1]" type="text">
  </div>

  <div class="field">
    <label>Email:</label>
    <input data-validation="format:[email]" type="text">
  </div>

  <div class="field">
    <label>Password:</label>
    <input data-validation="length:[min:3]" type="text">
  </div>

  <div class="field">
    <label>Rating:</label>
    <input data-validation="format:[number]" type="text">
  </div>

  <div class="actions">
    <input type="submit">
  </div>

</form>
```

## The built in validations
The plugin comes with a number of different validations built in.

### Formats (patterns)
- `email` - Checks against a simple email regexp (anystring@anystring.anystring).
- `tel` - Check if the value contains exactly 8 digits (danish phone number).
- `number` - Checks that the value contains only numbers.

### Others
- `required` - Invalid if value is an empty string.
- `allowEmpty` - If this is set the input will be valid if it is empty even though it has other validations.
- `length` - Checks the number of characters in the value. Supports both a min and max attribute.
- `wordCount` - Same as length but counts words instead of characters. Also supports min and max attributes.
- `dependsOn` - Input will only get validated if the checkbox with the specified id is checked.

## Building validations
The built in validations (and your own custom ones) can be combined in many ways to create quite sophisticated validations. All validations live inside a `data-validation` attribute on the input element.

Here are a few examples:

```html
<input data-validation="format:[email]" type="text">
<input data-validation="format:[tel]" type="text">
<input data-validation="required" type="text">
<input data-validation="length:[min:3, max:50]" type="text">
<input data-validation="wordCount:[min:2]" type="text">
<input data-validation="format:[email], allowEmpty" type="text">
<input data-validation="format:[number], length:[min:10, max:20]" type="text">
```

## More advanced uses
The plugin itself is quite simple. All it does is validate each input using a validator class. This validator class handles all the regexp matching and generating error messages. So all the jQuery plugin has to do is handle events, add the error messages to the DOM, and add classes to the inputs that weren't valid.

It is possible to customize this validator with validation formats of your own. You do this by instantiating the validator class yourself and calling methods on it to add new validation formats. You will then tell the jQuery plugin to use your custom validator. If you don't do this the plugin will build one internally.

Here is an example:

```javascript
// build your own validator
var customValidator = new FormValidator();

// add new validation formats to it
customValidator.defineCustomValidation('cpr', "\\d{6}-\\d{4}", 'Invalid CPR number');

// tell the plugin to use it
$('form').validate({
  validator: customValidator
});
```

Using your custom format

```html
<input data-validation="format:[cpr]" type="text">
```

The `.defineCustomValidation` methods takes three arguments:

1. The name of the validation format
2. The regexp to match against. This regexp has to be formatted a bit specially. A backslash should be written as two backslashes like in the example above, and the whole regexp shouldn't be wrapped in forward slashes.
3. The error message (optional).

## Options
The jQuery plugin has a few options.

```javascript
$('form').validate({

  validator: [object], // custom validator to use

  onBlur: [boolean] // whether or not to validate inputs on blur

});
```

## Further development
The validator class is built using a [test driven](http://en.wikipedia.org/wiki/Test-driven_development) style. This simply means that no implementation code was written without having a test of it first. The testing framework used is [jasmine](http://pivotal.github.io/jasmine/).

When developing you will need to make sure jasmine and other dependencies are installed. Run `bundle install` from the root of the project to do so.

The test suite can be run by running `rake jasmine` from the root and then going to `http://localhost:8888/`.

## Building the project
Run `ruby build.rb` from the root of the project to build. The output will be put in the build folder.
