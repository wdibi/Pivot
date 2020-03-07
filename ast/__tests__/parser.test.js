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
  AssignmentStatement,
  IfStatement,
  VariableDeclaration,
  Type,
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
  //   String.raw`all x,y,z <- 1,2,3;`
  // ]
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
