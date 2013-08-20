describe 'Validator', ->
  validator = ''

  beforeEach ->
    validator = new FormValidator

  describe 'setting error messages', ->
    it 'sets the error message on an input with email validation', ->
      node = sandbox '<input data-validation="format:[email]" value="aksjdf" type="email">'
      validator.validateInput node
      expect( node.getAttribute 'data-error-message' ).toBe 'Email is invalid'

    it 'sets the error message on an input with a tel validation', ->
      node = sandbox '<input data-validation="format:[tel]" value="aksjdf" type="email">'
      validator.validateInput node
      expect( node.getAttribute 'data-error-message' ).toBe 'Telephone number is invalid'

    it 'changes the error message if it has to', ->
      node = sandbox '<input data-validation="format:[email], required:true" value="" type="email">'
      validator.validateInput node
      node.setAttribute 'value', 'invalid email'
      validator.validateInput node
      expect( node.getAttribute 'data-error-message' ).toBe 'Email is invalid'

    it 'removes the error messages if the input becomes valid', ->
      node = sandbox '<input data-validation="format:[email]" value="foobar" type="email">'
      validator.validateInput node
      node.setAttribute 'value', 'david.pdrsn@gmail.com'
      validator.validateInput node
      expect( node.getAttribute 'data-error-message' ).toBe null

    it 'sets multiple error messages with the correct format', ->
      node = sandbox '<input data-validation="format:[tel], required" value="" type="email">'
      validator.validateInput node
      expect( node.getAttribute 'data-error-message' ).toBe "Can't be blank and telephone number is invalid"

    it 'adds the correct error messages', ->
      node = sandbox '<input data-validation="format:[tel], required" value="foobar" type="email">'
      validator.validateInput node
      expect( node.getAttribute 'data-error-message' ).toBe 'Telephone number is invalid'

    describe 'with range validations', ->
      describe 'both min and max', ->
        it 'sets the error message correctly', ->
          node = sandbox '<input data-validation="length:[min:3, max:10]" value="r" type="email">'
          validator.validateInput node
          expect( node.getAttribute 'data-error-message' ).toBe 'Value most be at least 3 and maximum 10 characters long'

      describe 'only min', ->
        it 'sets the error message correctly', ->
          node = sandbox '<input data-validation="length:[min:3]" value="r" type="email">'
          validator.validateInput node
          expect( node.getAttribute 'data-error-message' ).toBe 'Value most be at least 3'

      describe 'only max', ->
        it 'sets the error message correctly', ->
          node = sandbox '<input data-validation="length:[max:3]" value="kajsdhfkaj" type="email">'
          validator.validateInput node
          expect( node.getAttribute 'data-error-message' ).toBe "Value can't be longer than 3"

    describe 'with word count validation', ->
      describe 'both min and max', ->
        it 'sets the error message correctly', ->
          node = sandbox '<input data-validation="wordCount:[min:2, max:5]" value="f" type="email">'
          validator.validateInput node
          expect( node.getAttribute 'data-error-message' ).toBe "Can't contain less than 2 or more than 5 words"

      describe 'only min', ->
        it 'sets the error message correctly', ->
          node = sandbox '<input data-validation="wordCount:[min:2]" value="f" type="email">'
          validator.validateInput node
          expect( node.getAttribute 'data-error-message' ).toBe "Can't contain less than 2 words"

      describe 'only max', ->
        it 'sets the error message correctly', ->
          node = sandbox '<input data-validation="wordCount:[max:2]" value="foo bar foo" type="email">'
          validator.validateInput node
          expect( node.getAttribute 'data-error-message' ).toBe "Can't contain more than 2 words"

    describe 'with required validation', ->
      it 'sets the error message correctly', ->
        node = sandbox '<input data-validation="required:true" value="" type="email">'
        validator.validateInput node
        expect( node.getAttribute 'data-error-message' ).toBe "Can't be blank"

    describe 'with allow empty validation', ->
      it 'does not set an error message when allow empty is true and field is empty', ->
        node = sandbox '<input data-validation="format:[email], allowEmpty" value="" type="email">'
        validator.validateInput node
        expect( node.getAttribute 'data-error-message' ).toBe null

    describe 'with validation depends on', ->
      it 'does not set an error message when checkbox is unchecked and field is invalid', ->
        html = """
                <div id="sandbox">
                  <input type="checkbox" id="checkbox">
                  <input data-validation="format:[email], onlyIfChecked:checkbox" value="invalid email" id="input" type="email">
                </div>
               """
        nodes = sandbox html
        $('body').append html
        input = $('#input')[0]
        validator.validateInput input
        expect( input.getAttribute 'data-error-message' ).toBe null
        $('#sandbox').remove()
