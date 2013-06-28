describe 'Validator', ->
  beforeEach ->
    @validator = new FormValidator

  describe '#defineCustomValidation', ->
    it 'defines a new validation format', ->
      @validator.defineCustomValidation 'cpr', "/\\d{6}-\\d{4}/"
      expect( @validator.validations.cpr ).toEqual "/\\d{6}-\\d{4}/"

  describe '#validateInput', ->
    describe 'format validation', ->
      describe 'email', ->
        it 'returns true if the input contains a valid email', ->
          node = sandbox '<input data-validation="format:[email]" value="david.pdrsn@gmail.com" type="email">'
          expect( @validator.validateInput node ).toBe true

        it 'returns false if the input contains an invalid email', ->
          node = sandbox '<input data-validation="format:[email]" value="invalid email" type="email">'
          expect( @validator.validateInput node ).toBe false

      describe 'telephone', ->
        it 'returns true if the input contains a valid telephone number', ->
          node = sandbox '<input data-validation="format:[tel]" value="12345678" type="tel">'
          expect( @validator.validateInput node ).toBe true

        it 'returns false if the input contains an invalid telephone number', ->
          node = sandbox '<input data-validation="format:[tel]" value="123" type="tel">'
          expect( @validator.validateInput node ).toBe false

      describe 'a custom format', ->
        it 'returns true if the format matches', ->
          @validator.defineCustomValidation 'cpr', "\\d{6}-\\d{4}"
          node = sandbox '<input data-validation="format:[cpr]" value="060890-1234" type="text">'
          expect( @validator.validateInput node ).toBe true

    describe 'required validation', ->
      it 'returns true if the input has a value', ->
        node = sandbox '<input data-validation="format:[required]" value="some value" type="email">'
        expect( @validator.validateInput node ).toBe true

      it 'returns false if the input does not have a value', ->
        node = sandbox '<input data-validation="format:[required]" value="" type="email">'
        expect( @validator.validateInput node ).toBe false

    describe 'length validation', ->
      describe 'with only a min attribute', ->
        it 'returns true if the input value is within range', ->
          node = sandbox '<input data-validation="length:[min:3]" value="fkasdjfasjfkg" type="email">'
          expect( @validator.validateInput node ).toBe true

        it 'returns false if the input value is out of range', ->
          node = sandbox '<input data-validation="length:[min:3]" value="f" type="email">'
          expect( @validator.validateInput node ).toBe false

        it 'returns true if the input value is exactly the min length', ->
          node = sandbox '<input data-validation="length:[min:3]" value="fff" type="email">'
          expect( @validator.validateInput node ).toBe true

      describe 'with only a max attribute', ->
        it 'returns true if the input value is within range', ->
          node = sandbox '<input data-validation="length:[max:3]" value="f" type="email">'
          expect( @validator.validateInput node ).toBe true

        it 'returns false if the input value is out of range', ->
          node = sandbox '<input data-validation="length:[max:3]" value="aiudshfiuahsdlifuah" type="email">'
          expect( @validator.validateInput node ).toBe false

        it 'returns false if the input is exactly the max length', ->
          node = sandbox '<input data-validation="length:[max:3]" value="fff" type="email">'
          expect( @validator.validateInput node ).toBe false

      describe 'with both a min and max range', ->
        it 'returns true if the input value is within range', ->
          node = sandbox '<input data-validation="length:[min:1, max:10]" value="foo" type="email">'
          expect( @validator.validateInput node ).toBe true

        it 'returns false if the input value is out of range', ->
          node = sandbox '<input data-validation="length:[min:1, max:10]" value="ahdsfoiuagosyudgfoausyhdf" type="email">'
          expect( @validator.validateInput node ).toBe false

      describe 'with an exact length', ->
        it 'returns true if the input value is exactly the specified length', ->
          node = sandbox '<input data-validation="length:[min:3, max:3]" value="fff" type="email">'
          expect( @validator.validateInput node ).toBe true

        it 'returns false if the input value is out of the range', ->
          node = sandbox '<input data-validation="length:[min:3, max:3]" value="f" type="email">'
          expect( @validator.validateInput node ).toBe false
          node = sandbox '<input data-validation="length:[min:3, max:3]" value="fffffff" type="email">'
          expect( @validator.validateInput node ).toBe false

    describe 'allow empty', ->
      it 'returns true if the input is empty even though it has a format validation', ->
        node = sandbox '<input data-validation="format:[email], allowEmpty:true" value="" type="email">'
        expect( @validator.validateInput node ).toBe true

      it 'returns false if the input contains an invalid value', ->
        node = sandbox '<input data-validation="format:[email], allowEmpty:true" value="invalid emai" type="email">'
        expect( @validator.validateInput node ).toBe false

    describe 'word count', ->
      describe 'with only a min attribute', ->
        it 'returns true if the word count is within range', ->
          node = sandbox '<input data-validation="wordCount:[min:2]" value="foo bar baz" type="email">'
          expect( @validator.validateInput node ).toBe true
          node = sandbox '<input data-validation="wordCount:[min:2]" value="foo bar" type="email">'
          expect( @validator.validateInput node ).toBe true

        it 'returns false if the word count is out of range', ->
          node = sandbox '<input data-validation="wordCount:[min:2]" value="foo" type="email">'
          expect( @validator.validateInput node ).toBe false
