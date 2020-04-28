const parse = require('../../ast/parser');
const generate = require('../javascript-generator');
const analyze = require('../../semantics/analyzer');

const fixture = {
  hello: [
    String.raw`print "Hello World\n";`,
    String.raw`console.log('Hello World\n')`,
  ],
};

describe('The JavaScript generator', () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct output for ${name}`, done => {
      const ast = parse(source);
      analyze(ast);
      console.log('GENERATE AST', generate(ast));
      expect(generate(ast)).toMatch(expected);
      done();
    });
  });
});
