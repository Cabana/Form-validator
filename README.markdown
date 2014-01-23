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
- `onlyIfChecked` - Input will only get validated if the checkbox with the specified id is checked. See examples below.
- `onlyIfEmpty` - Input will only get validated if the input with the given id is empty.
- `group` - If you specify a group, only one input within that group has to be valid in order for all inputs within the group to be valid.

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
<input data-validation="format:[number], length:[min:10, max:20], onlyIfChecked:myCheckbox" type="text">
<input data-validation="format:[email], onlyIfEmpty:mySelect" type="text">
```

## Groups
Groups are used when you have a group of fields where only one of those fields need to be valid for the whole group to be valid. This is often useful when making select fields. Here is an example of how to use it:

```html
<select data-validation="required, group:someGroup">
  <option>Pick something</option>
  <option value="foo">Foo</option>
  <option value="bar">bar</option>
</select>

If choice wasn't in the dropdown type it here
<input data-validation="required, group:someGroup" type="text">
```

Groups can ofcourse still be combined with all the previous validations.

## More advanced uses
The plugin itself is quite simple. All it does is validate each input using a validator class. This validator class handles all the regexp matching and generating error messages. So all the jQuery plugin has to do is handle events, add the error messages to the DOM, and add classes to the inputs that weren't valid.

It is possible to customize this validator with validation formats of your own. You do this by instantiating the validator class yourself and calling methods on it to add new validation formats. You will then tell the jQuery plugin to use your custom validator. If you don't do this the plugin will build one internally.

Here is an example:

```javascript
// build your own validator
var customValidator = new FormValidator();

// add new validation formats to it
customValidator.defineValidation('cpr', /\d{6}-\d{4}/, 'Invalid cpr number');

customValidator.defineValidation('exactLength', function(input, data) {
  if (input.value.length != data.exactLength) {
    return "Input must be exactly " + data.exactLength + " characters long";
  }
});

// tell the plugin to use it
$('form').validate({
  validator: customValidator
});
```

Using your custom validations:

```html
<input data-validation="format:[cpr], exactLength: 11" type="text">
```

The `.defineValidation` methods takes three arguments:

1. The name of the validation.
2. Either a regexp or a function. If a regexp is given it use that when validating the field and if it doesn't match then the field is invalid. If a function is given it will use that function to perform the validation. That function gets called with two arguments: The input element itself (as an `HTMLHtmlElement`) and the data that was given in the `data-validation` attribute, if any. To make a field invalid simply return a string. This will also be the error message that gets shown. In order for the field to be valid return some falsy value, normally `null`.
3. If a regexp is passed as the second argument the third argument will be the error message that will be shown if the field is invalid.

## Options
The jQuery plugin has a few options.

```javascript
$('form').validate({

  validator: [object], // custom validator to use

  onBlur: [boolean], // whether or not to validate inputs on blur

  formWrapperSelector: [string], // If the whole page is wrapped in one form element but can still contain several individual forms, use this option for only validating the fields within the current form. It should contain a selector (fx '.form-container') that each form is wrapped in. Default is undefined, this will validate all fields within the entire form.

  ifInvalid: [function], // Function that will be run if the form is invalid.

  ifValid: [function], // Function that will be run if the form is valid.

  beforeValidation: [function], // Function that will be run before the validation.

  afterValidation: [function], // Function that will be run after the validation.

});
```

## Custom error messages
To customize the error messages on an input use a `data-custom-error-message` attribute. Example:

`<input data-validation="format:[email]" data-custom-error-message="My message" type="text">`

## Skipping validation
If you ever wish to have a button that submits the form without performing any validation you can use a submit button like this:

```html
<input data-skip-validation type="submit">
```

This could for example be useful if you needed a back button as part of a bigger flow.

## Further development
The validator class is built using a [test driven](http://en.wikipedia.org/wiki/Test-driven_development) style. This simply means that no implementation code was written without having a test of it first. The testing framework used is [jasmine](http://pivotal.github.io/jasmine/).

Setup [karma](http://karma-runner.github.io/) and run the tests with `karma start`.

## Building the project
Run `ruby build.rb` from the root of the project to build. The output will be put in the build folder.
