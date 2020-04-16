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
      num x <- value;
      return value;
    end`,
  ],
  [
    'break is not valid outside of task or loop',
    `num j <- 25;
   break;
   while j do
    j <- 1;
   end
  `,
  ],
  [
    'statement is unreachable',
    `add(num a, num b) -> num 
      return b;
      a <- 5; 
    end`,
  ],
  [
    'condition is deterministic',
    `if 5 > 2 then
      num x <- 5;
    end
    `,
  ],
  [
    'condition is deterministic',
    `if true then
      num x <- 5;
    end
    `,
  ],
  [
    'condition is deterministic',
    `if !true then
      num x <- 5;
    end
    `,
  ],
  [
    'invalid dict types',
    `{str : num} count <- {"cows":"1", "pigs":3};`
  ],
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
