const parse = require('../../ast/parser');
const Context = require('../context');

const errors = [
  ['type mismatch in declaration', 'num x <- a;'],
  ['variable already declared', 'bool x <- true; bool x <- false;'],
  ['variable assignment type mismatch', 'bool x <- true; bool x <- "true";'],
  ['variable not yet declared', 'x <- "hello";'],
  ['non-existing function called', 'gcd(1,2,3);'],
  [
    'function expects 2 args, but received 1',
    'add(num a, num b) -> num return 5; end add(5);',
  ],
  [
    'returns num, but function expects str',
    'hello(str a) -> str return 5; end',
  ],
  [
    'expression of type char not compatible with type num',
    `add(num a, num b) -> num return 5; end add('a');`,
  ],
  [
    'no return statement found within function',
    `add(num a, num b) -> num 
      a <- 5; 
    end`,
  ],
  [
    'return statement not valid in task',
    `task updateX(num value)
      x <- value;
      return value;
    end`,
  ],
  ['can only add strings and numbers', 'print false + 3;'],
  ['can only subtract numbers', 'print "hi" - 3;'],
  ['can only multiply numbers', 'print false * 3;'],
  ['can only divide numbers', 'print "abc" / 3;'],
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
