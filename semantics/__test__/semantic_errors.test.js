const parse = require('../../ast/parser');
const Context = require('../context');

const errors = [
  ['type mismatch in declaration', 'num x <- a;'],
  ['variable already declared', 'bool x <- true; bool x <- false;'],
  ['variable assignment type mismatch', 'bool x <- true; x <- 4;'],
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
  ['invalid addition with undefined variable', 'print x + 3;'],
  ['can only add strings and numbers', 'print false + 3;'],
  ['can only subtract numbers', 'print "hi" - 3;'],
  ['can only multiply numbers', 'print false * 3;'],
  ['can only divide numbers', 'print "abc" / 3;'],
  ['can only use bang or not operators with booleans', 'str x <- !12;'],
  ['can only use the negation operator with booleans or nums', 'print -"hi";'],
  ['inconsistent list expression types', 'print [ "john", 12, false ];'],
  ['invalid list types', '[str] friends <- [ "john", 12, false ];'],
  [
    'invalid inferred string exp assign to num variable',
    `num x <- 2;
     x <- 3 / 2 + 3 + "string";
    `,
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
    'condition is deterministic',
    `while 5 > 2 do
      num x <- 5;
    end
    `,
  ],
  [
    'condition is deterministic',
    `repeat
      num x <- 5;
    when true end
    `,
  ],
  [
    'condition is deterministic',
    `if !true then
      num x <- 5;
    end
    `,
  ],
  ['invalid dict types', `{str : num} count <- {"cows":"1", "pigs":3};`],
  [
    'statement is unreachable',
    `add(num a, num b) -> num 
      return b;
      a <- 5; 
    end`,
  ],
  [
    'statement is unreachable',
    `add(num a, num b) -> num
      return b;
      a <- 5;
      return a;
    end`,
  ],
  [
    'statement is unreachable',
    `num x <- 0;
    task updateX(num value)
      break;
      x <- value;
    end
    `,
  ],
  [
    'Inconsistent dict expression types',
    `print { "john" : 5, "tim" : false };`,
  ],
  [
    'invalid list assignment',
    '[num] listOfNums <- [1,2,3,4]; listOfNums <- [ "hi", "bye" ];',
  ],
  [
    'Declared dictionary types do not match the types of the keys and/or the values',
    '{str:num} dogAges <- { "boomer" : 5, "bucky" : 2 }; dogAges <- { "boomer" : "5", "bucky" : "2" };',
  ],
  [
    'cannot assign task',
    `num x <- 5;
    task updateX(num value)
      x <- value;
    end
    x <- updateX(x);`,
  ],
  [
    'pairs do not match DictTpe',
    `{str:num} dogAges <- { "boomer" : 5, "bucky" : 2 };
      dogAges <- { "boomer" : false, "bucky" : true };`,
  ],
  [
    'elements do not match DictTpe',
    `num randomNums <- [1,2,3,4,5];
     randomNums <- [true, false, false, true];`,
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
