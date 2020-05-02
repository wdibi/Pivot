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
    'break is not valid outside of loops',
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
    'wrong number of params with function call',
    `equal(num x, num y) -> bool return x == y; end
     equal(1);
    `,
  ],
  [
    'wrong number of params with function call',
    `isNoon() -> bool return false; end
     isNoon(1300);
    `,
  ],
  [
    'wrong function call type',
    `addFive(num x) -> num return x + 5; end
     addFive(false);
    `,
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
  ['binary exp that is deterministic', 'if 3 > 2 then print "duh"; end'],
  ['break outside of valid body', 'break;'],
  [
    'var day is a auto type that is inferred as a str and is invalid to be used as a num',
    `
    all _ day, isYear2020 <- "04162020", true;
    num double <- day + day;
    day <- "04172020";
    isYear2020 <- false;
  `,
  ],
  [
    'can not use num task with a str variable',
    `num task pow3 -> num default ** 3; str hello <- ("HELLO THERE") >> pow3;`,
  ],
  ['can not use boolean when indexing a list', 'num x <- [1,2,3]:true;'],
  [
    'can not have end index be greater than start index',
    '[num] dogAges <- [4,3,2,5,74]:3...1;',
  ],
  [
    'FieldExp does not match var dec type',
    `[num] yy <- [4,3,2,5,74]::find(3);`,
  ],
  [`condition is deterministic`, `num x <- 5 when 18 > 5 otherwise 7;`],
  [
    `types of expression and alternate are mismatched`,
    `num x <- 5 when 18 > 5 otherwise "Hello World";`,
  ],
  [
    'indexing type does not match var dec type',
    `{num:bool} encode <- {22: false, 2112: true, 44: true}; str currEncode <- encode:22;`,
  ],
  [
    'Element type must match variable type',
    `str firstElem <- [1,2,3]::head();`,
  ],
  [
    'Element type must match variable type',
    `str firstElem <- [1,2,3]::tail();`,
  ],
  [
    'Variable type must be num if calling len()',
    `str lenList <- [1,2,3]::len();`,
  ],
  [
    'New variable type must match list type',
    `[num] testList <- [1,2,3]; [str] list <- [1,2,3]::push(6);`,
  ],
  [
    'New variable type must match popped element type',
    `str poppedNum <- [1,2,3]::pop();`,
  ],
  [
    'New variable type must match list type',
    `[num] testList <- [1,2,3]; [str] list <- [1,2,3]::unshift(6);`,
  ],
  [
    'New variable type must match shifted element type',
    `str shiftedNum <- [1,2,3]::pop();`,
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
