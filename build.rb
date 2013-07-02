require 'closure-compiler'

js_files = [
  "src/lib/parser/src/parser.js",
  "src/validator.js",
  "src/jquery.validator.js"
]

compilation_levels = { simple: 'SIMPLE_OPTIMIZATIONS', advanced: 'ADVANCED_OPTIMIZATIONS', whitespace: 'WHITESPACE_ONLY' }

contents = Closure::Compiler.new(compilation_level: compilation_levels[:simple]).compile_files js_files

File.open "build/jquery.validator.js", "w" do |file|
  file.write contents
end
