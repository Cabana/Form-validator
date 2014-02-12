# Changelog

## 0.3.3
- Pass the button that triggered the form submit into callbacks.

## 0.3.2
- Compile all coffee script to javascript.

## 0.3.1
- Bug fixes.

## 0.3
- Bug fixes
- Support for custom error messages.
- Focus on first input with errors.
- Allow custom validations to return an array of strings instead of only one string.
- Add `beforeValidation` and `afterValidation` callbacks to the jquery plugin.
- Add `ifValid` and `ifInvalid` callbacks to jquery plugin.
- Add an optional `data-skip-validation` attribute on the submit button to submit the form without any validation.
- Add validation groups.
- Add a few more built-in validations.
- Include version number on the jquery plugin.

## 0.2.1
- Fix bugs related to required checkboxes.
- Add test for required select boxes.
- Various bug fixes.
- Minor refactorings.

## 0.2
- Big internal rewrite.
- New folder structure.
- Add more robust `defineValidation` method and remove `defineCustomValidation`.
- Switch to using the [Karma test runner](http://karma-runner.github.io/). Run tests in Chrome, Safari, Safari Mobile, Firefox, Opera, IE8, IE9, IE10.
- Update buildscript to also compile coffeescript, and remove compiled js files from source.

## 0.1.1
- Add closure-compiler as a dependency.

## 0.1
- First version.
