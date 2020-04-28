const parse = require('../../ast/parser');
const generate = require('../javascript-generator');
const analyze = require('../../semantics/analyzer');

const fixture = {
  hello: [
    String.raw`print "Hello World\n";`,
    String.raw`console.log("Hello World\n");`,
  ],
  varDec: [
    `num x <- 5; bool y <- false; char z <- 'a';`,
    `let x = 5;\nlet y = false;\nlet z = "a";`,
  ],
};
describe('The JavaScript generator', () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct output for ${name}`, done => {
      const ast = parse(source);
      analyze(ast);
      // console.log(generate(ast));
      expect(generate(ast)).toMatch(expected);
      done();
    });
  });
});
