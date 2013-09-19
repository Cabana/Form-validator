describe 'Validator', ->
  validator = ''

  beforeEach ->
    validator = new FormValidator

  afterEach ->
    $('#sandbox').html ''

  describe '#validateInput', ->
    describe 'format validation', ->
      describe 'email', ->
        it 'returns true if the input contains a valid email', ->
          node = sandbox '<input data-validation="format:[email]" value="david.pdrsn@gmail.com" type="email">'
          expect( validator.validateInput node ).toBe true

        it 'returns false if the input contains an invalid email', ->
          node = sandbox '<input data-validation="format:[email]" value="invalid email" type="email">'
          expect( validator.validateInput node ).toBe false

      describe 'telephone', ->
        it 'returns true if the input contains a valid telephone number', ->
          node = sandbox '<input data-validation="format:[tel]" value="12345678" type="tel">'
          expect( validator.validateInput node ).toBe true

        it 'returns false if the input contains an invalid telephone number', ->
          node = sandbox '<input data-validation="format:[tel]" value="123" type="tel">'
          expect( validator.validateInput node ).toBe false

      describe 'a custom format', ->
        it 'returns true if the format matches', ->
          validator.defineValidation 'cpr', /\d{6}-\d{4}/
          node = sandbox '<input data-validation="format:[cpr]" value="060890-1234" type="text">'
          expect( validator.validateInput node ).toBe true

    describe 'required validation', ->
      it 'returns true if the input has a value', ->
        node = sandbox '<input data-validation="required" value="some value" type="email">'
        expect( validator.validateInput node ).toBe true

      it 'returns false if the input does not have a value', ->
        node = sandbox '<input data-validation="required" value="" type="email">'
        expect( validator.validateInput node ).toBe false

      describe 'with a select box', ->
        it 'returns true is it has a value', ->
          html = """
                   <select data-validation="required">
                     <option value="">Please select something</option>
                     <option value="foo" selected>Foo</option>
                   </select>
                 """
          node = sandbox html
          expect( validator.validateInput node ).toBe true

        it 'returns false is it does not a value', ->
          html = """
                   <select data-validation="required">
                     <option value="" selected>Please select something</option>
                     <option value="foo">Foo</option>
                   </select>
                 """
          node = sandbox html
          expect( validator.validateInput node ).toBe false

      describe 'with a select box where the first field is not empty but still invalid', ->
        it 'returns true is it has a value', ->
          html = """
                   <select data-validation="required" name="foo">
                     <option value="Pick something">Pick something</option>
                     <option value="foo" selected>Foo</option>
                   </select>
                 """
          node = sandbox html
          expect( validator.validateInput node ).toBe true

        it 'returns false is it does not a value', ->
          html = """
                   <select data-validation="required" name="foo">
                     <option value="Pick something">Pick something</option>
                     <option value="foo">Foo</option>
                   </select>
                 """
          node = sandbox html
          expect( validator.validateInput node ).toBe false

      describe 'with a checkbox', ->
        it 'returns true is it is checked', ->
          node = sandbox '<input data-validation="required" type="checkbox" checked>'
          expect( validator.validateInput node ).toBe true

        it 'returns false if it is not checked', ->
          node = sandbox '<input data-validation="required" type="checkbox">'
          expect( validator.validateInput node ).toBe false

    describe 'length validation', ->
      describe 'with only a min attribute', ->
        it 'returns true if the input value is within range', ->
          node = sandbox '<input data-validation="length:[min:3]" value="fkasdjfasjfkg" type="email">'
          expect( validator.validateInput node ).toBe true

        it 'returns false if the input value is out of range', ->
          node = sandbox '<input data-validation="length:[min:3]" value="f" type="email">'
          expect( validator.validateInput node ).toBe false

        it 'returns true if the input value is exactly the min length', ->
          node = sandbox '<input data-validation="length:[min:3]" value="fff" type="email">'
          expect( validator.validateInput node ).toBe true

      describe 'with only a max attribute', ->
        it 'returns true if the input value is within range', ->
          node = sandbox '<input data-validation="length:[max:3]" value="f" type="email">'
          expect( validator.validateInput node ).toBe true
          node = sandbox '<input data-validation="length:[max:3]" value="fff" type="email">'
          expect( validator.validateInput node ).toBe true

        it 'returns false if the input value is out of range', ->
          node = sandbox '<input data-validation="length:[max:3]" value="aiudshfiuahsdlifuah" type="email">'
          expect( validator.validateInput node ).toBe false

      describe 'with both a min and max range', ->
        it 'returns true if the input value is within range', ->
          node = sandbox '<input data-validation="length:[min:2, max:10]" value="valid" type="email">'
          expect( validator.validateInput node ).toBe true
          node = sandbox '<input data-validation="length:[min:2, max:10]" value="fo" type="email">'
          expect( validator.validateInput node ).toBe true
          node = sandbox '<input data-validation="length:[min:2, max:10]" value="qwertyuiop" type="email">'
          expect( validator.validateInput node ).toBe true

        it 'returns false if the input value is out of range', ->
          node = sandbox '<input data-validation="length:[min:2, max:10]" value="ahdsfoiuagosyudgfoausyhdf" type="email">'
          expect( validator.validateInput node ).toBe false
          node = sandbox '<input data-validation="length:[min:2, max:10]" value="f" type="email">'
          expect( validator.validateInput node ).toBe false

      describe 'with an exact length', ->
        it 'returns true if the input value is exactly the specified length', ->
          node = sandbox '<input data-validation="length:[min:3, max:3]" value="fff" type="email">'
          expect( validator.validateInput node ).toBe true

        it 'returns false if the input value is out of the range', ->
          node = sandbox '<input data-validation="length:[min:3, max:3]" value="f" type="email">'
          expect( validator.validateInput node ).toBe false
          node = sandbox '<input data-validation="length:[min:3, max:3]" value="fffffff" type="email">'
          expect( validator.validateInput node ).toBe false

    describe 'allow empty', ->
      it 'returns true if the input is invalid even though it has a format validation', ->
        node = sandbox '<input data-validation="format:[email], allowEmpty" value="" type="email">'
        expect( validator.validateInput node ).toBe true

      it 'returns false if the input contains an invalid value', ->
        node = sandbox '<input data-validation="format:[email], allowEmpty" value="invalid emai" type="email">'
        expect( validator.validateInput node ).toBe false

    describe 'word count', ->
      describe 'with only a min attribute', ->
        it 'returns true if the word count is within range', ->
          node = sandbox '<input data-validation="wordCount:[min:2]" value="foo bar baz" type="email">'
          expect( validator.validateInput node ).toBe true

        it 'returns false if the word count is out of range', ->
          node = sandbox '<input data-validation="wordCount:[min:2]" value="foo" type="email">'
          expect( validator.validateInput node ).toBe false

      describe 'with only a max attribute', ->
        it 'returns true if the input value is within range', ->
          node = sandbox '<input data-validation="wordCount:[max:2]" value="foo" type="email">'
          expect( validator.validateInput node ).toBe true

        it 'returns false if the input value out of range', ->
          node = sandbox '<input data-validation="wordCount:[max:2]" value="foo foo bar baz" type="email">'
          expect( validator.validateInput node ).toBe false

      describe 'with both a min and a max attribute', ->
        it 'returns true if the input value is within range', ->
          node = sandbox '<input data-validation="wordCount:[min:2, max:5]" value="foo foo foo foo" type="email">'
          expect( validator.validateInput node ).toBe true

        it 'returns false if the input value out of range', ->
          node = sandbox '<input data-validation="wordCount:[min:2, max:5]" value="foo" type="email">'
          expect( validator.validateInput node ).toBe false

        describe 'when min and max are the same', ->
          it 'returns true if the input value is within range', ->
            node = sandbox '<input data-validation="wordCount:[min:2, max:2]" value="foo bar" type="email">'
            expect( validator.validateInput node ).toBe true

          it 'returns false if the input value is out of range', ->
            node = sandbox '<input data-validation="wordCount:[min:2, max:2]" value="foo bar foo" type="email">'
            expect( validator.validateInput node ).toBe false

      describe 'when input value is an empty string', ->
        describe 'min:1 validation', ->
          it 'does not validate', ->
            node = sandbox '<input data-validation="wordCount:[min:1]" value="" type="email">'
            expect( validator.validateInput node ).toBe false

        describe 'with only a max attribute', ->
          it 'does validate', ->
            node = sandbox '<input data-validation="wordCount:[max:3]" value="" type="email">'
            expect( validator.validateInput node ).toBe true

        describe 'with both a min and max value of 1', ->
          it 'does not validate', ->
            node = sandbox '<input data-validation="wordCount:[min:1, max:1]" value="" type="email">'
            expect( validator.validateInput node ).toBe false

    describe 'validation depends on', ->
      afterEach ->
        $('#sandbox').remove()

      it 'returns true if the checkbox is checked and the input is valid', ->
        html = """
                <div id="sandbox">
                  <input type="checkbox" id="checkbox" checked>
                  <input data-validation="format:[email], onlyIfChecked:checkbox" value="david@gmail.com" id="input" type="email">
                </div>
               """
        nodes = sandbox html
        $('body').append html
        input = $('#input')[0]
        expect( validator.validateInput input ).toBe true

      it 'returns true if the checkbox is not checked and the input is valid', ->
        html = """
                <div id="sandbox">
                  <input type="checkbox" id="checkbox">
                  <input data-validation="format:[email], onlyIfChecked:checkbox" value="david@gmail.com" id="input" type="email">
                </div>
               """
        nodes = sandbox html
        $('body').append html
        input = $('#input')[0]
        expect( validator.validateInput input ).toBe true

      it 'returns true if the checkbox is not checked and the input is invalid', ->
        html = """
                <div id="sandbox">
                  <input type="checkbox" id="checkbox">
                  <input data-validation="format:[email], onlyIfChecked:checkbox" value="invalid email" id="input" type="email">
                </div>
               """
        nodes = sandbox html
        $('body').append html
        input = $('#input')[0]
        expect( validator.validateInput input ).toBe true

      it 'returns false if the checkbox is checked and the input is invalid', ->
        html = """
                <div id="sandbox">
                  <input type="checkbox" id="checkbox" checked>
                  <input data-validation="format:[email], onlyIfChecked:checkbox" value="invalid email" id="input" type="email">
                </div>
               """
        nodes = sandbox html
        $('body').append html
        input = $('#input')[0]
        expect( validator.validateInput input ).toBe false

    describe 'onlyIfEmpty', ->
      afterEach ->
        $('#sandbox').remove()

      it 'returns true if the other input is not empty no matter what the value of the main input is', ->
        html = """
                <div id="sandbox">
                  <input id="someId" value="foo" type="text">
                  <input data-validation="format:[email], onlyIfEmpty:someId" value="" id="input" type="email">
                </div>
               """
        nodes = sandbox html
        $('body').append html
        input = $('#input')[0]
        expect( validator.validateInput input ).toBe true

      it 'returns true if the other input is empty and the main input is valid', ->
        html = """
                <div id="sandbox">
                  <input id="someId" value="" type="text">
                  <input data-validation="format:[email], onlyIfEmpty:someId" value="valid@email.com" id="input" type="email">
                </div>
               """
        nodes = sandbox html
        $('body').append html
        input = $('#input')[0]
        expect( validator.validateInput input ).toBe true

      it 'returns false if the other input is empty and the main input is invalid', ->
        html = """
                <div id="sandbox">
                  <input id="someId" value="" type="text">
                  <input data-validation="format:[email], onlyIfEmpty:someId" value="invalid email" id="input" type="email">
                </div>
               """
        nodes = sandbox html
        $('body').append html
        input = $('#input')[0]
        expect( validator.validateInput input ).toBe false

      describe 'with a select field', ->
        it 'returns true if the other input is not empty no matter what the value of the main input is', ->
          html = """
                  <div id="sandbox">
                    <select id="someId">
                      <option value="">Pick something</option>
                      <option value="foo" selected>Foo</option>
                    </select>
                    <input data-validation="format:[email], onlyIfEmpty:someId" value="" id="input" type="email">
                  </div>
                 """
          nodes = sandbox html
          $('body').append html
          input = $('#input')[0]
          expect( validator.validateInput input ).toBe true

        it 'returns true if the other input is empty and the main input is valid', ->
          html = """
                  <div id="sandbox">
                    <select id="someId">
                      <option value="" selected>Pick something</option>
                      <option value="foo">Foo</option>
                    </select>
                    <input data-validation="format:[email], onlyIfEmpty:someId" value="valid@email.com" id="input" type="email">
                  </div>
                 """
          nodes = sandbox html
          $('body').append html
          input = $('#input')[0]
          expect( validator.validateInput input ).toBe true

        it 'returns false if the other input is empty and the main input is invalid', ->
          html = """
                  <div id="sandbox">
                    <select id="someId">
                      <option value="" selected>Pick something</option>
                      <option value="foo">Foo</option>
                    </select>
                    <input data-validation="format:[email], onlyIfEmpty:someId" value="invalid email" id="input" type="email">
                  </div>
                 """
          nodes = sandbox html
          $('body').append html
          input = $('#input')[0]
          expect( validator.validateInput input ).toBe false

      describe 'with select field where the first option is actually empty even though there is text in it', ->
        it 'returns true if the other input is not empty no matter what the value of the main input is', ->
          html = """
                  <div id="sandbox">
                    <select id="someId">
                      <option value="Pick something">Pick something</option>
                      <option value="foo" selected>Foo</option>
                    </select>
                    <input data-validation="format:[email], onlyIfEmpty:someId" value="" id="input" type="email">
                  </div>
                 """
          nodes = sandbox html
          $('body').append html
          input = $('#input')[0]
          expect( validator.validateInput input ).toBe true

        it 'returns true if the other input is empty and the main input is valid', ->
          html = """
                  <div id="sandbox">
                    <select id="someId">
                      <option value="Pick something">Pick something</option>
                      <option value="foo">Foo</option>
                    </select>
                    <input data-validation="format:[email], onlyIfEmpty:someId" value="valid@email.com" id="input" type="email">
                  </div>
                 """
          nodes = sandbox html
          $('body').append html
          input = $('#input')[0]
          expect( validator.validateInput input ).toBe true

        it 'returns false if the other input is empty and the main input is invalid', ->
          html = """
                  <div id="sandbox">
                    <select id="someId">
                      <option value="Pick something">Pick something</option>
                      <option value="foo">Foo</option>
                    </select>
                    <input data-validation="format:[email], onlyIfEmpty:someId" value="invalid email" id="input" type="email">
                  </div>
                 """
          nodes = sandbox html
          $('body').append html
          input = $('#input')[0]
          expect( validator.validateInput input ).toBe false

    describe 'number format', ->
      it 'returns true if the string contains only numeric values', ->
        node = sandbox '<input data-validation="format:[number]" value="123" type="email">'
        expect( validator.validateInput node ).toBe true

      it 'returns false if the string contains non numeric values', ->
        node = sandbox '<input data-validation="format:[number]" value="1f23" type="email">'
        expect( validator.validateInput node ).toBe false

    describe 'group', ->
      it 'returns true if one of the inputs are valid', ->
        formHtml = """
                <form action="javascript:void()">
                  <input data-validation="required, group:groupName" type="text" id="input1">
                  <input data-validation="format:[email], group:groupName" value="valid@email.com" id="input2" type="email">
                  <input type="submit">
                </form>
               """
        formNode = sandbox formHtml
        $('body').append formNode
        expect( validator.validateForm formNode ).toBe true

      it 'returns false if all the inputs are invalid', ->
        formHtml = """
                <form action="javascript:void()">
                  <input data-validation="required, group:name" type="text" id="input1">
                  <input data-validation="format:[email], group:name" id="input2" type="email">
                  <input type="submit">
                </form>
               """
        formNode = sandbox formHtml
        $('body').append formNode
        expect( validator.validateForm formNode ).toBe false

    describe 'with a custom validator', ->
      describe 'a format validation', ->
        it 'can be used to validate a valid field', ->
          node = sandbox '<input data-validation="format:[cpr]" value="090909-6677" type="email">'
          validator.defineValidation 'cpr', /\d{6}-\d{4}/, 'Invalid CPR number'
          expect( validator.validateInput node ).toBe true

        it 'can be used to validate an invalid field', ->
          node = sandbox '<input data-validation="format:[cpr]" value="invalid" type="email">'
          validator.defineValidation 'cpr', /\d{6}-\d{4}/, 'Invalid CPR number'
          expect( validator.validateInput node ).toBe false

      describe 'a function based validation', ->
        it 'can be used to validate a valid field', ->
          node = sandbox '<input data-validation="newRequired" value="valid value" type="email">'

          validator.defineValidation 'newRequired', (input, data) ->
            unless /^.+$/.test input.value
              errors.add "Can't be blank"

          expect( validator.validateInput node ).toBe true

        it 'can be used to validate an invalid field', ->
          node = sandbox '<input data-validation="newRequired" value="" type="email">'

          validator.defineValidation 'newRequired', (input, data) ->
            unless /^.+$/.test input.value
              errors.add "Can't be blank"

          expect( validator.validateInput node ).toBe false
