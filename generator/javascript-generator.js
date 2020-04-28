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
  return { not: '!', and: '&&', or: '||', '==': '===', '!=': '!=' }[op] || op;
}

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
  return this.value;
};

CharacterLiteral.prototype.gen = function() {
  return `'${this.value}'`;
};

PrintStatement.prototype.gen = function() {
  return `console.log(${this.item.gen()})`;
};

AssignmentStatement.prototype.gen = function() {
  return `${this.target.gen()} = ${this.source.gen()}`;
};

FunctionDeclaration.prototype.gen = function() {
  return `function ${this.id}(${this.params.map(p =>
    p.gen()
  )}) { ${generateBlock(this.body)} }`;
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
  return this.id;
};

ReturnStatement.prototype.gen = function() {
  return `return ${this.item.gen()}`;
};

BreakStatement.prototype.gen = function() {
  return `break`;
};

IfStatement.prototype.gen = function() {
  let elsePart = this.elseBody ? `else {${generateBlock(this.elseBody)}}` : '';
  return `if (${this.condition.gen()}) {
    ${generateBlock(this.body)}
  }${elsePart}`;
};

BinaryExpression.prototype.gen = function() {
  return `${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()}`;
};

UnaryExpression.prototype.gen = function() {
  return `${makeOp(this.op)}${this.operand.gen()}`;
};

ListExpression.prototype.gen = function() {
  const listContents = this.elements.map(e => e.gen());
  return `[${listContents.join(', ')}]`;
};

WhileStatement.prototype.gen = function() {
  return `while (${this.condition.gen()}) {
    ${generateBlock(this.body)}
  }`;
};

RepeatStatement.prototype.gen = function() {
  return `do {${generateBlock(this.body)}} while (!(${this.condition.gen()}))`;
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
