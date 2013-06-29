describe 'Validator', ->
  validator = ''

  beforeEach ->
    validator = new FormValidator

  describe '#defineCustomValidation', ->
    it 'defines a new validation format', ->
      validator.defineCustomValidation 'cpr', "/\\d{6}-\\d{4}/", 'Foo'
      expect( validator.validations.cpr ).toEqual { regex: "/\\d{6}-\\d{4}/", errorMessage: 'Foo' }

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
          validator.defineCustomValidation 'cpr', "\\d{6}-\\d{4}"
          node = sandbox '<input data-validation="format:[cpr]" value="060890-1234" type="text">'
          expect( validator.validateInput node ).toBe true

    describe 'required validation', ->
      it 'returns true if the input has a value', ->
        node = sandbox '<input data-validation="required:true" value="some value" type="email">'
        expect( validator.validateInput node ).toBe true

      it 'returns false if the input does not have a value', ->
        node = sandbox '<input data-validation="required:true" value="" type="email">'
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
          node = sandbox '<input data-validation="length:[min:1, max:10]" value="foo" type="email">'
          expect( validator.validateInput node ).toBe true
          node = sandbox '<input data-validation="length:[min:1, max:10]" value="f" type="email">'
          expect( validator.validateInput node ).toBe true
          node = sandbox '<input data-validation="length:[min:1, max:10]" value="qwertyuiop" type="email">'
          expect( validator.validateInput node ).toBe true

        it 'returns false if the input value is out of range', ->
          node = sandbox '<input data-validation="length:[min:1, max:10]" value="ahdsfoiuagosyudgfoausyhdf" type="email">'
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
      it 'returns true if the input is empty even though it has a format validation', ->
        node = sandbox '<input data-validation="format:[email], allowEmpty:true" value="" type="email">'
        expect( validator.validateInput node ).toBe true

      it 'returns false if the input contains an invalid value', ->
        node = sandbox '<input data-validation="format:[email], allowEmpty:true" value="invalid emai" type="email">'
        expect( validator.validateInput node ).toBe false

    describe 'word count', ->
      describe 'with only a min attribute', ->
        it 'returns true if the word count is within range', ->
          node = sandbox '<input data-validation="wordCount:[min:2]" value="foo bar baz" type="email">'
          expect( validator.validateInput node ).toBe true
          node = sandbox '<input data-validation="wordCount:[min:2]" value="foo bar" type="email">'
          expect( validator.validateInput node ).toBe true

        it 'returns false if the word count is out of range', ->
          node = sandbox '<input data-validation="wordCount:[min:2]" value="foo" type="email">'
          expect( validator.validateInput node ).toBe false

      describe 'with only a max attribute', ->
        it 'returns true if the input value is within range', ->
          node = sandbox '<input data-validation="wordCount:[max:3]" value="foo bar" type="email">'
          expect( validator.validateInput node ).toBe true
          node = sandbox '<input data-validation="wordCount:[max:3]" value="foo mads bar" type="email">'
          expect( validator.validateInput node ).toBe true

        it 'returns false if the input value out of range', ->
          node = sandbox '<input data-validation="wordCount:[max:3]" value="foo bar bax mads" type="email">'
          expect( validator.validateInput node ).toBe false

    describe 'setting error messages', ->
      it 'sets the error message on an input with email validation', ->
        node = sandbox '<input data-validation="format:[email]" value="aksjdf" type="email">'
        validator.validateInput node
        expect( node.dataset.errorMessage ).toBe 'Email is invalid'

      it 'sets the error message on an input with a tel validation', ->
        node = sandbox '<input data-validation="format:[tel]" value="aksjdf" type="email">'
        validator.validateInput node
        expect( node.dataset.errorMessage ).toBe 'Telephone number is invalid'

      describe 'with range validations', ->
        describe 'both min and max', ->
          it 'sets the error message correctly', ->
            node = sandbox '<input data-validation="length:[min:3, max:10]" value="r" type="email">'
            validator.validateInput node
            expect( node.dataset.errorMessage ).toBe 'Value most be at least 3 and maximum 10 characters long'

        describe 'only min', ->
          it 'sets the error message correctly', ->
            node = sandbox '<input data-validation="length:[min:3]" value="r" type="email">'
            validator.validateInput node
            expect( node.dataset.errorMessage ).toBe 'Value most be at least 3'

        describe 'only max', ->
          it 'sets the error message correctly', ->
            node = sandbox '<input data-validation="length:[max:3]" value="kajsdhfkaj" type="email">'
            validator.validateInput node
            expect( node.dataset.errorMessage ).toBe "Value can't be longer than 3"

      describe 'with word count validation', ->
        describe 'both min and max', ->
          it 'sets the error message correctly', ->
            node = sandbox '<input data-validation="wordCount:[min:2, max:5]" value="f" type="email">'
            validator.validateInput node
            expect( node.dataset.errorMessage ).toBe "Can't contain less than 2 or more than 5 words"

        describe 'only min', ->
          it 'sets the error message correctly', ->
            node = sandbox '<input data-validation="wordCount:[min:2]" value="f" type="email">'
            validator.validateInput node
            expect( node.dataset.errorMessage ).toBe "Can't contain less than 2 words"

        describe 'only max', ->
          it 'sets the error message correctly', ->
            node = sandbox '<input data-validation="wordCount:[max:2]" value="foo bar foo" type="email">'
            validator.validateInput node
            expect( node.dataset.errorMessage ).toBe "Can't contain more than 2 words"

      describe 'with required validation', ->
        it 'sets the error message correctly', ->
          node = sandbox '<input data-validation="required:true" value="" type="email">'
          validator.validateInput node
          expect( node.dataset.errorMessage ).toBe "Can't be blank"

      it 'sets multiple error messages with the correct format', ->
        node = sandbox '<input data-validation="format:[tel], length:[min:3]" value="f" type="email">'
        validator.validateInput node
        expect( node.dataset.errorMessage ).toBe 'Telephone number is invalid and value most be at least 3'

      it 'adds the correct error messages', ->
        node = sandbox '<input data-validation="format:[tel], length:[min:3]" value="foobar" type="email">'
        validator.validateInput node
        expect( node.dataset.errorMessage ).toBe 'Telephone number is invalid'

      describe 'custom error messages', ->
        it 'also works with those', ->
          validator.defineCustomValidation 'cpr', "/\\d{6}-\\d{4}/", 'Foo'
          node = sandbox '<input data-validation="format:[cpr]" value="foobar" type="email">'
          validator.validateInput node
          expect( node.dataset.errorMessage ).toBe 'Foo'

      it 'does not override error messages defined on the input element to begin with', ->
        node = sandbox '<input data-validation="format:[tel]" data-error-message="Foo" value="foobar" type="email">'
        validator.validateInput node
        expect( node.dataset.errorMessage ).toBe 'Foo'

      it 'removes the error messages if the input becomes valid', ->
        node = sandbox '<input data-validation="format:[email]" value="foobar" type="email">'
        validator.validateInput node
        node.setAttribute 'value', 'david.pdrsn@gmail.com'
        validator.validateInput node
        expect( node.dataset.errorMessage ).toBe ''

  describe '#validateForm', ->
    it 'returns true if all the inputs with validation within the form are valid', ->
      formHTML = """
              <form action="javascript:void()">
                <input data-validation="format:[email]" type="email" value="david.pdrsn@gmail.com">
                <input type="submit">
              </form>
             """
      formNode = sandbox formHTML
      expect( validator.validateForm formNode ).toBe true

    it 'returns false if the form contains invalid inputs', ->
      formHTML = """
              <form action="javascript:void()">
                <input data-validation="format:[email]" type="email" value="invalid email">
                <input type="submit">
              </form>
             """
      formNode = sandbox formHTML
      expect( validator.validateForm formNode ).toBe false
