describe 'Validator', ->
  validator = ''

  beforeEach ->
    validator = new FormValidator

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
