/*
 * Semantic Error Tests
 *
 * These tests check that the analyzer will reject programs with various
 * static semantic errors.
 */

const parse = require('../../ast/parser');
const Context = require('../context');

const errors = [
  ['use of undeclared variable', 'x <- 1'],
  ['type mismatch in declaration', 'bool x <- 5'],
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
