require 'closure-compiler'

compiler = Closure::Compiler.new(compilation_level: 'SIMPLE_OPTIMIZATIONS')

files = [
  'vendor/parser/build/parser.js',
  'vendor/Array_filter_polyfill.js',

  'lib/monkey_patches.js',
  'lib/errors.js',
  'lib/group.js',
  'lib/validatable_input.js',
  'lib/range_validation.js',
  'lib/character_count_validation.js',
  'lib/word_count_validation.js',
  'lib/validator.js',

  'lib/jquery.validator.js'
]

js = files.inject '' do |result, js_component|
  puts js_component
  result += File.read(js_component)
end

contents = compiler.compile js

File.open 'build/jquery.validator.js', "w" do |file|
  file.write contents
end
