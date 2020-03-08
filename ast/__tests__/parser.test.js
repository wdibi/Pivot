/*
 * Parser Tests
 *
 * These tests check that the parser produces the AST that we expect.
 *
 * Note we are only checking syntactic forms here, so our test programs
 * may have semantic errors.
 */

const parse = require("../parser");

const {
  Program,
  Block,
  IdExpression,
  NumericLiteral,
  CharacterLiteral,
  StringLiteral,
  AssignmentStatement,
  IfStatement,
  VariableDeclaration,
  Type,
  WhileStatement,
  RepeatStatement,
  ForStatement,
  BinaryExpression,
  FunctionCall,
  CallChain,
  ListExpression,
} = require("..");

const fixture = {
  SimpleAssignment: [
    String.raw`x <- 5;`,
    new Program(
      new Block([
        new AssignmentStatement(new IdExpression("x"), new NumericLiteral(5)),
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
          new IdExpression("x"),
          [
            new AssignmentStatement(
              new IdExpression("y"),
              new NumericLiteral(5)
            ),
          ],
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
          new IdExpression("x"),
          [
            new AssignmentStatement(
              new IdExpression("y"),
              new NumericLiteral(5)
            ),
          ],
          [
            new AssignmentStatement(
              new IdExpression("y"),
              new NumericLiteral(4)
            ),
          ]
        ),
      ])
    ),
  ],

  VariableDeclaration: [
    String.raw`char a <- 'a';`,
    new Program(
      new Block([
        new VariableDeclaration(
          new IdExpression("a"),
          new Type("char"),
          new CharacterLiteral("a")
        ),
      ])
    ),
  ],

  // MultiVariableDeclaration: [
  //   String.raw`all x,y,z <- "a","b",3;`,
  //   new Program(
  //     new Block([
  //       new VariableDeclaration(
  //         new IdExpression("x"),
  //         new Type("string"),
  //         new StringLiteral("a")
  //       ),
  //       new VariableDeclaration(
  //         new IdExpression("y"),
  //         new Type("string"),
  //         new StringLiteral("b")
  //       ),
  //       new VariableDeclaration(
  //         new IdExpression("z"),
  //         new Type("num"),
  //         new NumericLiteral(3)
  //       ),
  //     ])
  //   ),
  // ],

  WhileLoop: [
    String.raw`
    while x do
      x <- 1;
    end
    `,
    new Program(
      new Block([
        new WhileStatement(
          new IdExpression("x"),
          new Block([
            new AssignmentStatement(
              new IdExpression("x"),
              new NumericLiteral(1)
            ),
          ])
        ),
      ])
    ),
  ],

  RepeatLoop: [
    String.raw`
    repeat
      x <- x + 5;
    until y;
    `,
    new Program(
      new Block([
        new RepeatStatement(
          new Block([
            new AssignmentStatement(
              new IdExpression("x"),
              new BinaryExpression(
                "+",
                new IdExpression("x"),
                new NumericLiteral(5)
              )
            ),
          ]),
          new IdExpression("y")
        ),
      ])
    ),
  ],

  ForLoop: [
    String.raw`
    for num a <- 0; a < 2; a <- a + 1; do
      y <- y / a;
    end
    `,
    new Program(
      new Block([
        new ForStatement(
          new VariableDeclaration(
            new IdExpression("a"),
            new Type("num"),
            new NumericLiteral(0)
          ),
          new BinaryExpression(
            "<",
            new IdExpression("a"),
            new NumericLiteral(2)
          ),
          new AssignmentStatement(
            new IdExpression("a"),
            new BinaryExpression(
              "+",
              new IdExpression("a"),
              new NumericLiteral(1)
            )
          ),
          new Block([
            new AssignmentStatement(
              new IdExpression("y"),
              new BinaryExpression(
                "/",
                new IdExpression("y"),
                new IdExpression("a")
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
          new IdExpression("a"),
          new Type("bool"),
          new BinaryExpression(
            "or",
            new IdExpression("x"),
            new IdExpression("y")
          )
        ),
        new VariableDeclaration(
          new IdExpression("b"),
          new Type("bool"),
          new BinaryExpression(
            "||",
            new IdExpression("y"),
            new IdExpression("z")
          )
        ),
      ])
    ),
  ],

  AndOperator: [
    String.raw`
      bool a <- x and y;
      bool b <- y && z;
    `,
    new Program(
      new Block([
        new VariableDeclaration(
          new IdExpression("a"),
          new Type("bool"),
          new BinaryExpression(
            "and",
            new IdExpression("x"),
            new IdExpression("y")
          )
        ),
        new VariableDeclaration(
          new IdExpression("b"),
          new Type("bool"),
          new BinaryExpression(
            "&&",
            new IdExpression("y"),
            new IdExpression("z")
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
        new FunctionCall(new IdExpression("gcd"), [
          new NumericLiteral(1),
          new BinaryExpression(
            "**",
            new IdExpression("x"),
            new NumericLiteral(5)
          ),
          new NumericLiteral(3),
        ]),
      ])
    ),
  ],

  Chain: [
    String.raw`
      num loc <- [4,5,2,6] << find(5);
    `,
    new Program(
      new Block([
        new VariableDeclaration(
          new IdExpression("loc"),
          new Type("num"),
          new CallChain(
            new ListExpression([
              new NumericLiteral(4),
              new NumericLiteral(5),
              new NumericLiteral(2),
              new NumericLiteral(6),
            ]),
            [
              new FunctionCall(new IdExpression("find"), [
                new NumericLiteral(5),
              ]),
            ]
          )
        ),
      ])
    ),
  ],
};

describe("The parser", () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct AST for ${name}`, done => {
      expect(parse(source)).toEqual(expected);
      done();
    });
  });

  test("throws an exception on a syntax error", done => {
    // We only need one test here that an exception is thrown.
    // Specific syntax errors are tested in the grammar test.
    expect(() => parse("as$df^&%*$&")).toThrow();
    done();
  });
});
