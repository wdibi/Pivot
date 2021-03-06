// Parser module
//
//   const parse = require('./parser');
//   const ast = parse(sourceCodeString);

const ohm = require('ohm-js');
const fs = require('fs');

const {
  Program,
  Block,
  AssignmentStatement,
  RepeatStatement,
  ForStatement,
  IfStatement,
  IfShort,
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
  CallChain,
  ListExpression,
  PrintStatement,
  StringLiteral,
  DictionaryExpression,
  KeyValuePair,
  FunctionDeclaration,
  Parameter,
  ReturnStatement,
  BreakStatement,
  TaskStatement,
  FieldExp,
  SubscriptedExp,
  NumRange,
} = require('.');

const grammar = ohm.grammar(fs.readFileSync('./grammar/pivot.ohm'));

/* eslint-disable no-unused-vars */
const astBuilder = grammar.createSemantics().addOperation('ast', {
  Program(b) {
    return new Program(b.ast());
  },
  Block(s) {
    return new Block(s.ast());
  },
  Statement(s, _) {
    return s.ast();
  },
  VarDeclaration_single(t, i, _a, init) {
    return new VariableDeclaration(i.ast(), t.ast(), init.ast());
  },
  VarDeclaration_multi(_all, t, i, _a, init) {
    return new VariableDeclaration(i.ast(), t.ast(), init.ast());
  },
  IterationStatement_while(_while, t, _do, b) {
    return new WhileStatement(t.ast(), b.ast());
  },
  IterationStatement_repeat(_repeat, b, _when, exp) {
    return new RepeatStatement(b.ast(), exp.ast());
  },
  IterationStatement_for(_for, initial, _sc1, test, _sc2, exp, _do, body) {
    return new ForStatement(initial.ast(), test.ast(), exp.ast(), body.ast());
  },
  CallExpression_function(c) {
    return c.ast();
  },
  FunctionDeclaration(i, _o, a, _c, _a, t, b) {
    return new FunctionDeclaration(
      i.ast(),
      t.ast(),
      a._node.matchLength > 0 ? a.ast() : null,
      b.ast()
    );
  },
  TaskStatement(dt, _task, i, _a, rt, exp) {
    return new TaskStatement(dt.ast(), i.ast(), rt.ast(), exp.ast());
  },
  FunctionCall(i, _openParen, args, _closeParen) {
    return new FunctionCall(
      i.ast(),
      args._node.matchLength > 0 ? args.ast() : null
    );
  },
  CallExpression_chain(_s, exp, _e, _a, tasks) {
    return new CallChain(exp.ast(), tasks.ast());
  },
  IfStatement(_if, t, _then, consequent, _e, alternate) {
    return new IfStatement(
      t.ast(),
      new Block(consequent.ast()),
      alternate.ast().length ? new Block(alternate.ast()[0]) : null
    );
  },
  IfShort(e, _when, c, _otherwise, a) {
    return new IfShort(e.ast(), c.ast(), a.ast());
  },
  Assignment_single(i, _a, e) {
    return new AssignmentStatement(i.ast(), e.ast());
  },
  Assignment_multi(_all, i, _a, e) {
    return new AssignmentStatement(i.ast(), e.ast());
  },
  BooleanType(_) {
    return BoolType;
  },
  CharType(_) {
    return CharType;
  },
  StringType(_) {
    return StringType;
  },
  NumType(_) {
    return NumType;
  },
  AutoType(_) {
    return AutoType;
  },
  ListType(_o, t, _c) {
    return new ListType(t.ast());
  },
  DictType(_o, keyType, _colon, valueType, _c) {
    return new DictType(keyType.ast(), valueType.ast());
  },
  Exp_binary(e1, _, e2) {
    let op = this.sourceString.includes('or') ? 'or' : '||';
    return new BinaryExpression(op, e1.ast(), e2.ast());
  },
  Exp1_binary(e1, _, e2) {
    let op = this.sourceString.includes('and') ? 'and' : '&&';
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
  Lvalue_field(i, _c, f) {
    return new FieldExp(i.ast(), f.ast());
  },
  Lvalue_subscripted(i, _c, n) {
    return new SubscriptedExp(i.ast(), n.ast());
  },
  NumRange(s, _d, e) {
    return new NumRange(s.ast(), e.ast());
  },
  Parameter(t, i) {
    return new Parameter(t.ast(), i.ast());
  },
  PrintStatement(_p, i) {
    return new PrintStatement(i.ast());
  },
  ReturnStatement(_r, i) {
    return new ReturnStatement(i.ast());
  },
  BreakStatement(_b) {
    return new BreakStatement();
  },
  List(_o, e, _c) {
    return new ListExpression(e._node.matchLength > 0 ? e.ast() : null);
  },
  Dict(_o, p, _c) {
    return new DictionaryExpression(p._node.matchLength > 0 ? p.ast() : null);
  },
  boollit(_) {
    return new BooleanLiteral(this.sourceString === 'true');
  },
  numlit(_f, _, _l) {
    return new NumericLiteral(+this.sourceString);
  },
  charlit(_o, _char, _c) {
    return new CharacterLiteral(this.sourceString.slice(1, -1));
  },
  strlit(_o, _str, _c) {
    return new StringLiteral(this.sourceString.slice(1, -1));
  },
  id(_f, _r) {
    return new IdExpression(this.sourceString);
  },
  nonemptyListOf(f, _, r) {
    return [f.ast(), ...r.ast()];
  },
  NonemptyListOf(f, _, r) {
    return [f.ast(), ...r.ast()];
  },
  KeyValuePair(key, _colon, value) {
    return new KeyValuePair(key.ast(), value.ast());
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
