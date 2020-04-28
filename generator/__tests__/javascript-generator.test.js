const parse = require('../../ast/parser');
const generate = require('../javascript-generator');
const analyze = require('../../semantics/analyzer');
const prettyJs = require('pretty-js');

const fixture = {
  hello: [
    String.raw`print "Hello World\n";`,
    String.raw`console.log("Hello World\n");`,
  ],
  vars: [
    `num x <- 5; bool y <- false; char z <- 'a'; x <- -12;`,
    prettyJs(`let x = 5; let y = false; let z = "a"; x = -12;`),
  ],
  func: [
    `addFive(num x) -> num return x + 5; end`,
    prettyJs(`function addFive(x) { return x + 5; }`),
  ],
  if: [
    `num x <- 5; if x > 5 then print x; else print "nope"; end`,
    prettyJs(`if (x > 5) { console.log(x); } else { console.log('nope'); }`),
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
