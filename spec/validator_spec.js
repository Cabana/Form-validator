// Generated by CoffeeScript 1.6.2
(function() {
  describe('Validator', function() {
    var validator;

    validator = '';
    beforeEach(function() {
      return validator = new FormValidator;
    });
    describe('#defineCustomValidation', function() {
      return it('defines a new validation format', function() {
        validator.defineCustomValidation('cpr', "\\d{6}-\\d{4}", 'Foo');
        return expect(validator._validations.cpr).toEqual({
          regex: "\\d{6}-\\d{4}",
          errorMessage: 'Foo'
        });
      });
    });
    describe('#validateInput', function() {
      describe('format validation', function() {
        describe('email', function() {
          it('returns true if the input contains a valid email', function() {
            var node;

            node = sandbox('<input data-validation="format:[email]" value="david.pdrsn@gmail.com" type="email">');
            return expect(validator.validateInput(node)).toBe(true);
          });
          return it('returns false if the input contains an invalid email', function() {
            var node;

            node = sandbox('<input data-validation="format:[email]" value="invalid email" type="email">');
            return expect(validator.validateInput(node)).toBe(false);
          });
        });
        describe('telephone', function() {
          it('returns true if the input contains a valid telephone number', function() {
            var node;

            node = sandbox('<input data-validation="format:[tel]" value="12345678" type="tel">');
            return expect(validator.validateInput(node)).toBe(true);
          });
          return it('returns false if the input contains an invalid telephone number', function() {
            var node;

            node = sandbox('<input data-validation="format:[tel]" value="123" type="tel">');
            return expect(validator.validateInput(node)).toBe(false);
          });
        });
        return describe('a custom format', function() {
          return it('returns true if the format matches', function() {
            var node;

            validator.defineCustomValidation('cpr', "\\d{6}-\\d{4}");
            node = sandbox('<input data-validation="format:[cpr]" value="060890-1234" type="text">');
            return expect(validator.validateInput(node)).toBe(true);
          });
        });
      });
      describe('required validation', function() {
        it('returns true if the input has a value', function() {
          var node;

          node = sandbox('<input data-validation="required" value="some value" type="email">');
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('returns false if the input does not have a value', function() {
          var node;

          node = sandbox('<input data-validation="required" value="" type="email">');
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
      describe('length validation', function() {
        describe('with only a min attribute', function() {
          it('returns true if the input value is within range', function() {
            var node;

            node = sandbox('<input data-validation="length:[min:3]" value="fkasdjfasjfkg" type="email">');
            return expect(validator.validateInput(node)).toBe(true);
          });
          it('returns false if the input value is out of range', function() {
            var node;

            node = sandbox('<input data-validation="length:[min:3]" value="f" type="email">');
            return expect(validator.validateInput(node)).toBe(false);
          });
          return it('returns true if the input value is exactly the min length', function() {
            var node;

            node = sandbox('<input data-validation="length:[min:3]" value="fff" type="email">');
            return expect(validator.validateInput(node)).toBe(true);
          });
        });
        describe('with only a max attribute', function() {
          it('returns true if the input value is within range', function() {
            var node;

            node = sandbox('<input data-validation="length:[max:3]" value="f" type="email">');
            expect(validator.validateInput(node)).toBe(true);
            node = sandbox('<input data-validation="length:[max:3]" value="fff" type="email">');
            return expect(validator.validateInput(node)).toBe(true);
          });
          return it('returns false if the input value is out of range', function() {
            var node;

            node = sandbox('<input data-validation="length:[max:3]" value="aiudshfiuahsdlifuah" type="email">');
            return expect(validator.validateInput(node)).toBe(false);
          });
        });
        describe('with both a min and max range', function() {
          it('returns true if the input value is within range', function() {
            var node;

            node = sandbox('<input data-validation="length:[min:1, max:10]" value="foo" type="email">');
            expect(validator.validateInput(node)).toBe(true);
            node = sandbox('<input data-validation="length:[min:1, max:10]" value="f" type="email">');
            expect(validator.validateInput(node)).toBe(true);
            node = sandbox('<input data-validation="length:[min:1, max:10]" value="qwertyuiop" type="email">');
            return expect(validator.validateInput(node)).toBe(true);
          });
          return it('returns false if the input value is out of range', function() {
            var node;

            node = sandbox('<input data-validation="length:[min:1, max:10]" value="ahdsfoiuagosyudgfoausyhdf" type="email">');
            return expect(validator.validateInput(node)).toBe(false);
          });
        });
        return describe('with an exact length', function() {
          it('returns true if the input value is exactly the specified length', function() {
            var node;

            node = sandbox('<input data-validation="length:[min:3, max:3]" value="fff" type="email">');
            return expect(validator.validateInput(node)).toBe(true);
          });
          return it('returns false if the input value is out of the range', function() {
            var node;

            node = sandbox('<input data-validation="length:[min:3, max:3]" value="f" type="email">');
            expect(validator.validateInput(node)).toBe(false);
            node = sandbox('<input data-validation="length:[min:3, max:3]" value="fffffff" type="email">');
            return expect(validator.validateInput(node)).toBe(false);
          });
        });
      });
      describe('allow empty', function() {
        it('returns true if the input is invalid even though it has a format validation', function() {
          var node;

          node = sandbox('<input data-validation="format:[email], allowEmpty" value="" type="email">');
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('returns false if the input contains an invalid value', function() {
          var node;

          node = sandbox('<input data-validation="format:[email], allowEmpty" value="invalid emai" type="email">');
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
      describe('word count', function() {
        describe('with only a min attribute', function() {
          it('returns true if the word count is within range', function() {
            var node;

            node = sandbox('<input data-validation="wordCount:[min:2]" value="foo bar baz" type="email">');
            return expect(validator.validateInput(node)).toBe(true);
          });
          return it('returns false if the word count is out of range', function() {
            var node;

            node = sandbox('<input data-validation="wordCount:[min:2]" value="foo" type="email">');
            return expect(validator.validateInput(node)).toBe(false);
          });
        });
        describe('with only a max attribute', function() {
          it('returns true if the input value is within range', function() {
            var node;

            node = sandbox('<input data-validation="wordCount:[max:2]" value="foo" type="email">');
            return expect(validator.validateInput(node)).toBe(true);
          });
          return it('returns false if the input value out of range', function() {
            var node;

            node = sandbox('<input data-validation="wordCount:[max:2]" value="foo foo bar baz" type="email">');
            return expect(validator.validateInput(node)).toBe(false);
          });
        });
        describe('with both a min and a max attribute', function() {
          it('returns true if the input value is within range', function() {
            var node;

            node = sandbox('<input data-validation="wordCount:[min:2, max:5]" value="foo foo foo foo" type="email">');
            return expect(validator.validateInput(node)).toBe(true);
          });
          it('returns false if the input value out of range', function() {
            var node;

            node = sandbox('<input data-validation="wordCount:[min:2, max:5]" value="foo" type="email">');
            return expect(validator.validateInput(node)).toBe(false);
          });
          return describe('when min and max are the same', function() {
            it('returns true if the input value is within range', function() {
              var node;

              node = sandbox('<input data-validation="wordCount:[min:2, max:2]" value="foo bar" type="email">');
              return expect(validator.validateInput(node)).toBe(true);
            });
            return it('returns false if the input value is out of range', function() {
              var node;

              node = sandbox('<input data-validation="wordCount:[min:2, max:2]" value="foo bar foo" type="email">');
              return expect(validator.validateInput(node)).toBe(false);
            });
          });
        });
        return describe('when input value is an empty string', function() {
          describe('min:1 validation', function() {
            return it('does not validate', function() {
              var node;

              node = sandbox('<input data-validation="wordCount:[min:1]" value="" type="email">');
              return expect(validator.validateInput(node)).toBe(false);
            });
          });
          describe('with only a max attribute', function() {
            return it('does validate', function() {
              var node;

              node = sandbox('<input data-validation="wordCount:[max:3]" value="" type="email">');
              return expect(validator.validateInput(node)).toBe(true);
            });
          });
          return describe('with both a min and max value of 1', function() {
            return it('does not validate', function() {
              var node;

              node = sandbox('<input data-validation="wordCount:[min:1, max:1]" value="" type="email">');
              return expect(validator.validateInput(node)).toBe(false);
            });
          });
        });
      });
      describe('validation depends on', function() {
        afterEach(function() {
          return $('#sandbox').remove();
        });
        it('returns true if the checkbox is checked and the input is valid', function() {
          var html, input, nodes;

          html = "<div id=\"sandbox\">\n  <input type=\"checkbox\" id=\"checkbox\" checked>\n  <input data-validation=\"format:[email], dependsOn:checkbox\" value=\"david@gmail.com\" id=\"input\" type=\"email\">\n</div>";
          nodes = sandbox(html);
          $('body').append(html);
          input = $('#input')[0];
          return expect(validator.validateInput(input)).toBe(true);
        });
        it('returns true if the checkbox is not checked and the input is valid', function() {
          var html, input, nodes;

          html = "<div id=\"sandbox\">\n  <input type=\"checkbox\" id=\"checkbox\">\n  <input data-validation=\"format:[email], dependsOn:checkbox\" value=\"david@gmail.com\" id=\"input\" type=\"email\">\n</div>";
          nodes = sandbox(html);
          $('body').append(html);
          input = $('#input')[0];
          return expect(validator.validateInput(input)).toBe(true);
        });
        it('returns true if the checkbox is not checked and the input is invalid', function() {
          var html, input, nodes;

          html = "<div id=\"sandbox\">\n  <input type=\"checkbox\" id=\"checkbox\">\n  <input data-validation=\"format:[email], dependsOn:checkbox\" value=\"invalid email\" id=\"input\" type=\"email\">\n</div>";
          nodes = sandbox(html);
          $('body').append(html);
          input = $('#input')[0];
          return expect(validator.validateInput(input)).toBe(true);
        });
        return it('returns false if the checkbox is checked and the input is invalid', function() {
          var html, input, nodes;

          html = "<div id=\"sandbox\">\n  <input type=\"checkbox\" id=\"checkbox\" checked>\n  <input data-validation=\"format:[email], dependsOn:checkbox\" value=\"invalid email\" id=\"input\" type=\"email\">\n</div>";
          nodes = sandbox(html);
          $('body').append(html);
          input = $('#input')[0];
          return expect(validator.validateInput(input)).toBe(false);
        });
      });
      describe('number format', function() {
        it('returns true if the string contains only numeric values', function() {
          var node;

          node = sandbox('<input data-validation="format:[number]" value="123" type="email">');
          return expect(validator.validateInput(node)).toBe(true);
        });
        return it('returns false if the string contains non numeric values', function() {
          var node;

          node = sandbox('<input data-validation="format:[number]" value="1f23" type="email">');
          return expect(validator.validateInput(node)).toBe(false);
        });
      });
      return describe('setting error messages', function() {
        it('sets the error message on an input with email validation', function() {
          var node;

          node = sandbox('<input data-validation="format:[email]" value="aksjdf" type="email">');
          validator.validateInput(node);
          return expect(node.dataset.errorMessage).toBe('Email is invalid');
        });
        it('sets the error message on an input with a tel validation', function() {
          var node;

          node = sandbox('<input data-validation="format:[tel]" value="aksjdf" type="email">');
          validator.validateInput(node);
          return expect(node.dataset.errorMessage).toBe('Telephone number is invalid');
        });
        it('changes the error message if it has to', function() {
          var node;

          node = sandbox('<input data-validation="format:[email], required:true" value="" type="email">');
          validator.validateInput(node);
          node.setAttribute('value', 'invalid email');
          validator.validateInput(node);
          return expect(node.dataset.errorMessage).toBe('Email is invalid');
        });
        it('removes the error messages if the input becomes valid', function() {
          var node;

          node = sandbox('<input data-validation="format:[email]" value="foobar" type="email">');
          validator.validateInput(node);
          node.setAttribute('value', 'david.pdrsn@gmail.com');
          validator.validateInput(node);
          return expect(node.dataset.errorMessage).toBe(void 0);
        });
        it('sets multiple error messages with the correct format', function() {
          var node;

          node = sandbox('<input data-validation="format:[tel], length:[min:3]" value="f" type="email">');
          validator.validateInput(node);
          return expect(node.dataset.errorMessage).toBe('Telephone number is invalid and value most be at least 3');
        });
        it('adds the correct error messages', function() {
          var node;

          node = sandbox('<input data-validation="format:[tel], length:[min:3]" value="foobar" type="email">');
          validator.validateInput(node);
          return expect(node.dataset.errorMessage).toBe('Telephone number is invalid');
        });
        describe('with range validations', function() {
          describe('both min and max', function() {
            return it('sets the error message correctly', function() {
              var node;

              node = sandbox('<input data-validation="length:[min:3, max:10]" value="r" type="email">');
              validator.validateInput(node);
              return expect(node.dataset.errorMessage).toBe('Value most be at least 3 and maximum 10 characters long');
            });
          });
          describe('only min', function() {
            return it('sets the error message correctly', function() {
              var node;

              node = sandbox('<input data-validation="length:[min:3]" value="r" type="email">');
              validator.validateInput(node);
              return expect(node.dataset.errorMessage).toBe('Value most be at least 3');
            });
          });
          return describe('only max', function() {
            return it('sets the error message correctly', function() {
              var node;

              node = sandbox('<input data-validation="length:[max:3]" value="kajsdhfkaj" type="email">');
              validator.validateInput(node);
              return expect(node.dataset.errorMessage).toBe("Value can't be longer than 3");
            });
          });
        });
        describe('with word count validation', function() {
          describe('both min and max', function() {
            return it('sets the error message correctly', function() {
              var node;

              node = sandbox('<input data-validation="wordCount:[min:2, max:5]" value="f" type="email">');
              validator.validateInput(node);
              return expect(node.dataset.errorMessage).toBe("Can't contain less than 2 or more than 5 words");
            });
          });
          describe('only min', function() {
            return it('sets the error message correctly', function() {
              var node;

              node = sandbox('<input data-validation="wordCount:[min:2]" value="f" type="email">');
              validator.validateInput(node);
              return expect(node.dataset.errorMessage).toBe("Can't contain less than 2 words");
            });
          });
          return describe('only max', function() {
            return it('sets the error message correctly', function() {
              var node;

              node = sandbox('<input data-validation="wordCount:[max:2]" value="foo bar foo" type="email">');
              validator.validateInput(node);
              return expect(node.dataset.errorMessage).toBe("Can't contain more than 2 words");
            });
          });
        });
        describe('with required validation', function() {
          return it('sets the error message correctly', function() {
            var node;

            node = sandbox('<input data-validation="required:true" value="" type="email">');
            validator.validateInput(node);
            return expect(node.dataset.errorMessage).toBe("Can't be blank");
          });
        });
        describe('with allow empty validation', function() {
          return it('does not set an error message when allow empty is true and field is empty', function() {
            var node;

            node = sandbox('<input data-validation="format:[email], allowEmpty" value="" type="email">');
            validator.validateInput(node);
            return expect(node.dataset.errorMessage).toBe(void 0);
          });
        });
        describe('with validation depends on', function() {
          return it('does not set an error message when checkbox is unchecked and field is invalid', function() {
            var html, input, nodes;

            html = "<div id=\"sandbox\">\n  <input type=\"checkbox\" id=\"checkbox\">\n  <input data-validation=\"format:[email], dependsOn:checkbox\" value=\"invalid email\" id=\"input\" type=\"email\">\n</div>";
            nodes = sandbox(html);
            $('body').append(html);
            input = $('#input')[0];
            validator.validateInput(input);
            expect(input.dataset.errorMessage).toBe(void 0);
            return $('#sandbox').remove();
          });
        });
        return describe('custom error messages', function() {
          it('also works with those', function() {
            var node;

            validator.defineCustomValidation('cpr', "/\\d{6}-\\d{4}/", 'Foo');
            node = sandbox('<input data-validation="format:[cpr]" value="foobar" type="email">');
            validator.validateInput(node);
            return expect(node.dataset.errorMessage).toBe('Foo');
          });
          return it('has a default', function() {
            var node;

            validator.defineCustomValidation('cpr', "/\\d{6}-\\d{4}/");
            node = sandbox('<input data-validation="format:[cpr]" value="foobar" type="email">');
            validator.validateInput(node);
            return expect(node.dataset.errorMessage).toBe('Field is invalid');
          });
        });
      });
    });
    return describe('#validateForm', function() {
      it('returns true if all the inputs with validation within the form are valid', function() {
        var formHTML, formNode;

        formHTML = "<form action=\"javascript:void()\">\n  <input data-validation=\"format:[email]\" type=\"email\" value=\"david.pdrsn@gmail.com\">\n  <input type=\"submit\">\n</form>";
        formNode = sandbox(formHTML);
        return expect(validator.validateForm(formNode)).toBe(true);
      });
      return it('returns false if the form contains invalid inputs', function() {
        var formHTML, formNode;

        formHTML = "<form action=\"javascript:void()\">\n  <input data-validation=\"format:[email]\" type=\"email\" value=\"invalid email\">\n  <input type=\"submit\">\n</form>";
        formNode = sandbox(formHTML);
        return expect(validator.validateForm(formNode)).toBe(false);
      });
    });
  });

}).call(this);
