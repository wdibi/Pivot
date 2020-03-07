// Parser module
//
//   const parse = require('./parser');
//   const ast = parse(sourceCodeString);

const ohm = require("ohm-js");
const fs = require("fs");

const {
  Program,
  Block,
  AssignmentStatement,
  RepeatStatement,
  ForStatement,
  IfStatement,
  WhileStatement,
  VariableDeclaration,
  FunctionCall,
  BooleanLiteral,
  NumericLiteral,
  CharacterLiteral,
  IdExpression,
  BoolType,
  CharType,
  StringType,
  NumType,
  ListType,
  DictType,
  BinaryExpression,
  UnaryExpression,
  AutoType,
} = require(".");

const grammar = ohm.grammar(fs.readFileSync("./grammar/pivot.ohm"));

function arrayToNullable(a) {
  return a.length === 0 ? null : a[0];
}

/* eslint-disable no-unused-vars */
const astBuilder = grammar.createSemantics().addOperation("ast", {
  Program(b) {
    return new Program(b.ast());
  },
  Block(s) {
    return new Block(s.ast());
  },
  VarDeclaration_single(type, id, _arrow, init, _sc) {
    return new VariableDeclaration(id.ast(), type.ast(), init.ast());
  },
  // VarDeclaration_multi(_all, type, _arrow, ids, initials) {
  //   return new VariableDeclaration(id.ast(), type.ast(), init.ast());
  // },
  IterationStatement_while(_while, test, _do, block, _end) {
    return new WhileStatement(test.ast(), block.ast());
  },
  IterationStatement_repeat(_repeat, block, _until, exp, _sc) {
    return new RepeatStatement(block.ast(), exp.ast());
  },
  IterationStatement_for(_for, initial, test, _sc, exp, _do, body, _end) {
    return new ForStatement(initial.ast(), test.ast(), exp.ast(), body.ast());
  },
  CallStatement_function(id, _openParen, args, _closeParen, _sc) {
    return new FunctionCall(id.ast(), args.ast());
  },
  IfStatement(_if, test, _then, consequent, _else, alternate, _end) {
    return new IfStatement(
      test.ast(),
      consequent.ast(),
      arrayToNullable(alternate.ast())
    );
  },
  Assignment(id, _a, e, _) {
    return new AssignmentStatement(id.ast(), e.ast());
  },
  Type(typeName) {
    switch (typeName.sourceString) {
      case "bool":
        return BoolType;
      case "char":
        return CharType;
      case "string":
        return StringType;
      case "num":
        return NumType;
      case "list":
        return ListType;
      case "dict":
        return DictType;
      case "auto":
        return AutoType;
    }
  },
  Exp_binary(e1, _, e2) {
    let op = this.sourceString.includes("or") ? "or" : "||";
    return new BinaryExpression(op, e1.ast(), e2.ast());
  },
  Exp1_binary(e1, _, e2) {
    let op = this.sourceString.includes("and") ? "and" : "&&";
    return new BinaryExpression(op, e1.ast(), e2.ast());
  },
  Exp2_binary(e1, op, e2) {
    return new BinaryExpression(op.sourceString, e1.ast(), e2.ast());
  },
  Exp3_binary(e1, op, e2) {
    return new BinaryExpression(op.sourceString, e1.ast(), e2.ast());
  },
  Exp4_binary(e1, op, e2) {
    return new BinaryExpression(op.sourceString, e1.ast(), e2.ast());
  },
  Exp5_unary(op, e) {
    return new UnaryExpression(op.sourceString, e.ast());
  },
  Exp6_binary(e1, op, e2) {
    return new BinaryExpression(op.sourceString, e1.ast(), e2.ast());
  },
  Exp7_list(l) {
    return l.ast();
  },
  Exp7_dict(d) {
    return d.ast();
  },
  Exp7_parens(_1, e, _2) {
    return e.ast();
  },
  boollit(_) {
    return new BooleanLiteral(this.sourceString === "true");
  },
  numlit(_first, _, _last) {
    return new NumericLiteral(+this.sourceString);
  },
  charlit(_openQuote, char, _closeQuote) {
    return new CharacterLiteral(this.sourceString.slice(1, -1));
  },
  id(_first, _rest) {
    return new IdExpression(this.sourceString);
  },
  _terminal() {
    return this.sourceString;
  },
  nonemptyListOf(first, _, rest) {
    return [first.ast(), ...rest.ast()];
  },
  // EmptyListOf() {
  //   return [];
  // },
});
/* eslint-enable no-unused-vars */

module.exports = text => {
  const match = grammar.match(text);
  if (!match.succeeded()) {
    throw match.message;
  }
  return astBuilder(match).ast();
};
