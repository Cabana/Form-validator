require 'closure-compiler'
require 'coffee-script'

compiler = Closure::Compiler.new(compilation_level: 'SIMPLE_OPTIMIZATIONS')

files = [
  "src/lib/parser/build/parser.js",
  "src/validator.coffee",
  "src/jquery.validator.js"
]

js = files.inject '' do |result, js_component|
  result += if js_component =~ /.*\.coffee$/
              CoffeeScript.compile File.read(js_component)
            else
              File.read(js_component)
            end
end

contents = compiler.compile js

File.open 'build/jquery.validator.js', "w" do |file|
  file.write contents
end
