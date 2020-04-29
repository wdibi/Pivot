/*
 * Parser Tests
 *
 * These tests check that the parser produces the AST that we expect.
 *
 * Note we are only checking syntactic forms here, so our test programs
 * may have semantic errors.
 */

const parse = require('../parser');

const {
  Program,
  Block,
  IdExpression,
  NumericLiteral,
  CharacterLiteral,
  StringLiteral,
  BooleanLiteral,
  AssignmentStatement,
  IfStatement,
  VariableDeclaration,
  PrimitiveType,
  DictType,
  ListType,
  WhileStatement,
  RepeatStatement,
  ForStatement,
  BinaryExpression,
  FunctionCall,
  CallChain,
  ListExpression,
  PrintStatement,
  DictionaryExpression,
  KeyValuePair,
  FunctionDeclaration,
  Parameter,
  ReturnStatement,
  BreakStatement,
  UnaryExpression,
  TaskStatement,
  FieldExp,
  SubscriptedExp,
} = require('..');

const fixture = {
  SimpleAssignment: [
    String.raw`x <- 5;`,
    new Program(
      new Block([
        new AssignmentStatement(new IdExpression('x'), new NumericLiteral(5)),
      ])
    ),
  ],

  IfStatement: [
    String.raw`
    if x then y <- 5; end
    `,
    new Program(
      new Block([
        new IfStatement(
          new IdExpression('x'),
          new Block([
            new AssignmentStatement(
              new IdExpression('y'),
              new NumericLiteral(5)
            ),
          ]),
          null
        ),
      ])
    ),
  ],

  IfElseStatement: [
    String.raw`
    if x then y <- 5; else y <- 4; end
    `,
    new Program(
      new Block([
        new IfStatement(
          new IdExpression('x'),
          new Block([
            new AssignmentStatement(
              new IdExpression('y'),
              new NumericLiteral(5)
            ),
          ]),
          new Block([
            new AssignmentStatement(
              new IdExpression('y'),
              new NumericLiteral(4)
            ),
          ])
        ),
      ])
    ),
  ],

  VariableDeclaration: [
    String.raw`char a <- 'a';`,
    new Program(
      new Block([
        new VariableDeclaration(
          new IdExpression('a'),
          new PrimitiveType('char'),
          new CharacterLiteral('a')
        ),
      ])
    ),
  ],

  MultiVariableDeclaration: [
    String.raw`all bool x,y,z <- true,false,true;`,
    new Program(
      new Block([
        new VariableDeclaration(
          [new IdExpression('x'), new IdExpression('y'), new IdExpression('z')],
          new PrimitiveType('bool'),
          [
            new BooleanLiteral(true),
            new BooleanLiteral(false),
            new BooleanLiteral(true),
          ]
        ),
      ])
    ),
  ],

  WhileLoop: [
    String.raw`
    while x do
      // comment added
      x <- 1;
    end
    `,
    new Program(
      new Block([
        new WhileStatement(
          new IdExpression('x'),
          new Block([
            new AssignmentStatement(
              new IdExpression('x'),
              new NumericLiteral(1)
            ),
          ])
        ),
      ])
    ),
  ],

  WhileLoopWithBreak: [
    String.raw`
    while x do
      x <- 1;
      break;
    end
    `,
    new Program(
      new Block([
        new WhileStatement(
          new IdExpression('x'),
          new Block([
            new AssignmentStatement(
              new IdExpression('x'),
              new NumericLiteral(1)
            ),
            new BreakStatement(),
          ])
        ),
      ])
    ),
  ],

  RepeatLoop: [
    String.raw`
    repeat
      x <- -x + 5;
    when y end
    `,
    new Program(
      new Block([
        new RepeatStatement(
          new Block([
            new AssignmentStatement(
              new IdExpression('x'),
              new BinaryExpression(
                '+',
                new UnaryExpression('-', new IdExpression('x')),
                new NumericLiteral(5)
              )
            ),
          ]),
          new IdExpression('y')
        ),
      ])
    ),
  ],

  ForLoop: [
    String.raw`
    for num a <- 0; a < 2; a <- a + 1 do
      y <- y / a;
    end
    `,
    new Program(
      new Block([
        new ForStatement(
          new VariableDeclaration(
            new IdExpression('a'),
            new PrimitiveType('num'),
            new NumericLiteral(0)
          ),
          new BinaryExpression(
            '<',
            new IdExpression('a'),
            new NumericLiteral(2)
          ),
          new AssignmentStatement(
            new IdExpression('a'),
            new BinaryExpression(
              '+',
              new IdExpression('a'),
              new NumericLiteral(1)
            )
          ),
          new Block([
            new AssignmentStatement(
              new IdExpression('y'),
              new BinaryExpression(
                '/',
                new IdExpression('y'),
                new IdExpression('a')
              )
            ),
          ])
        ),
      ])
    ),
  ],

  OrOperator: [
    String.raw`
      bool a <- x or y;
      bool b <- y || z;
    `,
    new Program(
      new Block([
        new VariableDeclaration(
          new IdExpression('a'),
          new PrimitiveType('bool'),
          new BinaryExpression(
            'or',
            new IdExpression('x'),
            new IdExpression('y')
          )
        ),
        new VariableDeclaration(
          new IdExpression('b'),
          new PrimitiveType('bool'),
          new BinaryExpression(
            '||',
            new IdExpression('y'),
            new IdExpression('z')
          )
        ),
      ])
    ),
  ],

  AndOperator: [
    String.raw`
      bool a <- x and y;
      _ b <- y && z;
    `,
    new Program(
      new Block([
        new VariableDeclaration(
          new IdExpression('a'),
          new PrimitiveType('bool'),
          new BinaryExpression(
            'and',
            new IdExpression('x'),
            new IdExpression('y')
          )
        ),
        new VariableDeclaration(
          new IdExpression('b'),
          new PrimitiveType('auto'),
          new BinaryExpression(
            '&&',
            new IdExpression('y'),
            new IdExpression('z')
          )
        ),
      ])
    ),
  ],

  FunctionCall: [
    String.raw`
      gcd(1,x**5,3);
    `,
    new Program(
      new Block([
        new FunctionCall(new IdExpression('gcd'), [
          new NumericLiteral(1),
          new BinaryExpression(
            '**',
            new IdExpression('x'),
            new NumericLiteral(5)
          ),
          new NumericLiteral(3),
        ]),
      ])
    ),
  ],

  FieldExpAndSubscriptedExp: [
    String.raw`
      num loc <- [4,5,2,6]::find(5);
      print names:"adam";
    `,
    new Program(
      new Block([
        new VariableDeclaration(
          new IdExpression('loc'),
          new PrimitiveType('num'),
          new FieldExp(
            new ListExpression([
              new NumericLiteral(4),
              new NumericLiteral(5),
              new NumericLiteral(2),
              new NumericLiteral(6),
            ]),
            new FunctionCall(new IdExpression('find'), [new NumericLiteral(5)])
          )
        ),
        new PrintStatement(
          new SubscriptedExp(
            new IdExpression('names'),
            new StringLiteral('adam')
          )
        ),
      ])
    ),
  ],

  Print: [
    String.raw`
      print("Hello World!");
    `,
    new Program(
      new Block([new PrintStatement(new StringLiteral('Hello World!'))])
    ),
  ],

  Dictionary: [
    String.raw`
      {str : num} count <- {"cows":1, "pigs":3};
    `,
    new Program(
      new Block([
        new VariableDeclaration(
          new IdExpression('count'),
          new DictType(new PrimitiveType('string'), new PrimitiveType('num')),
          new DictionaryExpression([
            new KeyValuePair(new StringLiteral('cows'), new NumericLiteral(1)),
            new KeyValuePair(new StringLiteral('pigs'), new NumericLiteral(3)),
          ])
        ),
      ])
    ),
  ],

  FunctionDeclaration: [
    String.raw`
      addFive(num a) -> num
        return a+5;
      end
    `,
    new Program(
      new Block([
        new FunctionDeclaration(
          new IdExpression('addFive'),
          new PrimitiveType('num'),
          [new Parameter(new PrimitiveType('num'), new IdExpression('a'))],
          new Block([
            new ReturnStatement(
              new BinaryExpression(
                '+',
                new IdExpression('a'),
                new NumericLiteral(5)
              )
            ),
          ])
        ),
      ])
    ),
  ],

  TaskStatement: [
    String.raw`
    num task addFive -> num default + 5;
    `,
    new Program(
      new Block([
        new TaskStatement(
          new PrimitiveType('num'),
          new IdExpression('addFive'),
          new PrimitiveType('num'),
          new BinaryExpression(
            '+',
            new IdExpression('default'),
            new NumericLiteral(5)
          )
        ),
      ])
    ),
  ],

  List: [
    String.raw`
      [str] myList <- ["Will", "Manny", "Nico", "Jigar"];
    `,
    new Program(
      new Block([
        new VariableDeclaration(
          new IdExpression('myList'),
          new ListType(new PrimitiveType('string')),
          new ListExpression([
            new StringLiteral('Will'),
            new StringLiteral('Manny'),
            new StringLiteral('Nico'),
            new StringLiteral('Jigar'),
          ])
        ),
      ])
    ),
  ],

  Empty: [
    String.raw`print time();`,
    new Program(
      new Block([
        new PrintStatement(new FunctionCall(new IdExpression('time'), null)),
      ])
    ),
  ],

  EmptyListDec: [
    String.raw`[num] x <- [];`,
    new Program(
      new Block([
        new VariableDeclaration(
          new IdExpression('x'),
          new ListType(new PrimitiveType('num')),
          new ListExpression(null)
        ),
      ])
    ),
  ],

  EmptyDictDec: [
    String.raw`{num:bool} alpha <- {};`,
    new Program(
      new Block([
        new VariableDeclaration(
          new IdExpression('alpha'),
          new DictType(new PrimitiveType('num'), new PrimitiveType('bool')),
          new DictionaryExpression(null)
        ),
      ])
    ),
  ],

  NoParamFunc: [
    String.raw`five() -> num return 5; end`,
    new Program(
      new Block([
        new FunctionDeclaration(
          new IdExpression('five'),
          new PrimitiveType('num'),
          null,
          new Block([new ReturnStatement(new NumericLiteral(5))])
        ),
      ])
    ),
  ],
};

describe('The parser', () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct AST for ${name}`, done => {
      expect(parse(source)).toEqual(expected);
      done();
    });
  });

  test('throws an exception on a syntax error', done => {
    // We only need one test here that an exception is thrown.
    // Specific syntax errors are tested in the grammar test.
    expect(() => parse('as$df^&%*$&')).toThrow();
    done();
  });
});
