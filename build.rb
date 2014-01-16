require 'closure-compiler'
require 'coffee-script'

compiler = Closure::Compiler.new(compilation_level: 'SIMPLE_OPTIMIZATIONS')

files = [
  'vendor/parser/build/parser.js',
  'vendor/Array_filter_polyfill.js',

  'lib/monkey_patches.coffee',
  'lib/errors.coffee',
  'lib/group.coffee',
  'lib/validatable_input.coffee',
  'lib/range_validation.coffee',
  'lib/character_count_validation.coffee',
  'lib/word_count_validation.coffee',
  'lib/validator.coffee',

  'lib/jquery.validator.js'
]

js = files.inject '' do |result, js_component|
  puts js_component
  result += if js_component =~ /.*\.coffee$/
              CoffeeScript.compile File.read(js_component)
            else
              File.read(js_component)
            end
end

# contents = compiler.compile js
contents = js

File.open 'build/jquery.validator.js', "w" do |file|
  file.write contents
end
