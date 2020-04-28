const prettyJs = require('pretty-js');
const util = require('util');

const {
  VariableDeclaration,
  IdExpression,
  NumericLiteral,
  StringLiteral,
  BooleanLiteral,
  CharacterLiteral,
  PrintStatement,
  AssignmentStatement,
  FunctionDeclaration,
  TaskDeclaration,
  FunctionCall,
  Parameter,
  ReturnStatement,
  BreakStatement,
  IfStatement,
  BinaryExpression,
  UnaryExpression,
  ListExpression,
  WhileStatement,
  RepeatStatement,
  ForStatement,
  DictionaryExpression,
  CallChain,
} = require('../ast');

function makeOp(op) {
  return (
    { not: '!', and: '&&', or: '||', '==': '===', '!=': '!=' }[op] || op // add <, >, <=, >=
  );
}
// const builtin = {};

function generateBlock(block) {
  return block.statements.map(s => `${s.gen()};`).join('');
}

module.exports = function(exp) {
  return prettyJs(generateBlock(exp.block));
};

VariableDeclaration.prototype.gen = function() {
  return `let ${this.id} = ${this.init.gen()}`;
};

IdExpression.prototype.gen = function() {
  return `${this.id}`;
};

NumericLiteral.prototype.gen = function() {
  return this.value;
};

StringLiteral.prototype.gen = function() {
  return `'${this.value}'`;
};

BooleanLiteral.prototype.gen = function() {
  return `'${this.value}'`;
};

CharacterLiteral.prototype.gen = function() {
  return `'${this.value}'`;
};

PrintStatement.prototype.gen = function() {
  return `console.log(${this.item.gen()})`;
};

AssignmentStatement.prototype.gen = function() {
  return `${this.target} = ${this.source}`;
};

FunctionDeclaration.prototype.gen = function() {
  // TODO
  return ``;
};

TaskDeclaration.prototype.gen = function() {
  // TODO
  return ``;
};

FunctionCall.prototype.gen = function() {
  // TODO
  return ``;
};

Parameter.prototype.gen = function() {
  // TODO
  return ``;
};

ReturnStatement.prototype.gen = function() {
  // TODO
  return ``;
};

BreakStatement.prototype.gen = function() {
  // TODO
  return ``;
};

IfStatement.prototype.gen = function() {
  // TODO
  return ``;
};

BinaryExpression.prototype.gen = function() {
  // TODO
  return ``;
};

UnaryExpression.prototype.gen = function() {
  // TODO
  return ``;
};

ListExpression.prototype.gen = function() {
  // TODO
  return ``;
};

WhileStatement.prototype.gen = function() {
  // TODO
  return ``;
};

RepeatStatement.prototype.gen = function() {
  // TODO
  return ``;
};

ForStatement.prototype.gen = function() {
  // TODO
  return ``;
};

DictionaryExpression.prototype.gen = function() {
  // TODO
  return ``;
};

CallChain.prototype.gen = function() {
  // TODO
  return ``;
};
