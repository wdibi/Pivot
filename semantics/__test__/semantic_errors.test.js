const parse = require('../../ast/parser');
const Context = require('../context');

const errors = [
  ['type mismatch in declaration', 'num x <- a;'],
  ['variable already declared', 'bool x <- true; bool x <- false;'],
  ['variable assignment type mismatch', 'bool x <- true; bool x <- "true";'],
  ['variable not yet declared', 'x <- "hello";'],
  ['invalid auto declaration', '_ x <- asdfasdfe;'],
];

describe('The semantic analyzer', () => {
  errors.forEach(([scenario, program]) => {
    test(`detects the error ${scenario}`, done => {
      const astRoot = parse(program);
      expect(astRoot).toBeTruthy();
      expect(() => astRoot.analyze(Context.INITIAL)).toThrow();
      done();
    });
  });
});
