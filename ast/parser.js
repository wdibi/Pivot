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
  IfStatement,
  VariableDeclaration,
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
  IfStatement(_if, test, _then, consequent, _else, alternate, _ends) {
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
  boollit(_) {
    return new BooleanLiteral(this.sourceString === "true");
  },
  numlit(_first, _, _last) {
    return new NumericLiteral(+this.sourceString);
  },
  charlit(_first, _c, _last) {
    return new CharacterLiteral(this.sourceString);
  },
  id(_first, _rest) {
    return new IdExpression(this.sourceString);
  },
  _terminal() {
    return this.sourceString;
  },
});
/* eslint-enable no-unused-vars */

module.exports = text => {
  const match = grammar.match(text);
  if (!match.succeeded()) {
    throw match.message;
  }
  return astBuilder(match).ast();
};
