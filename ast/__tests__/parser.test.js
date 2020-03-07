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
  StringLiteral,
  AssignmentStatement,
  IfStatement,
  VariableDeclaration,
  Type,
  WhileStatement,
  RepeatStatement,
  BinaryExpression,
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
    String.raw`num a <- 10;`,
    new Program(
      new Block([
        new VariableDeclaration(
          new IdExpression("a"),
          new Type("num"),
          new NumericLiteral(10)
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
      x <- 5;
    until y;
    `,
    new Program(
      new Block([
        new RepeatStatement(
          new Block([
            new AssignmentStatement(
              new IdExpression("x"),
              new NumericLiteral(5)
            ),
          ]),
          new IdExpression("y")
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
