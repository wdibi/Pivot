const prettyJs = require('pretty-js');

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
  TaskStatement,
  FunctionCall,
  Parameter,
  ReturnStatement,
  BreakStatement,
  IfStatement,
  IfShort,
  BinaryExpression,
  UnaryExpression,
  ListExpression,
  WhileStatement,
  RepeatStatement,
  ForStatement,
  DictionaryExpression,
  CallChain,
  KeyValuePair,
  FieldExp,
  SubscriptedExp,
  NumRange,
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
  let params = this.params ? this.params.map(p => p.gen()) : [];
  return `function ${this.id}(${params.join(', ')}) { ${generateBlock(
    this.body
  )} }`;
};

TaskStatement.prototype.gen = function() {
  return `const ${this.id} = (default) =>  ${this.exp.gen()}`;
};

CallChain.prototype.gen = function() {
  let statement = `${this.item.gen()}`;
  this.tasks.forEach(task => {
    statement = `${task.gen()}(${statement})`;
  });
  return statement;
};

FunctionCall.prototype.gen = function() {
  let params = this.params ? this.params.map(p => p.gen()) : [];
  return `${this.id.gen()}(${params.join(', ')})`;
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
  let result = (this.left.constructor === BinaryExpression ? `(${this.left.gen()})` : `${this.left.gen()}`) + ` ${makeOp(this.op)} `;
  result += this.right.constructor === BinaryExpression ? `(${this.right.gen()})` : `${this.right.gen()}`
  return result;
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
  return `for (${this.init.gen()};${this.condition.gen()};${this.exp.gen()}) {
    ${generateBlock(this.body)}
  }`;
};

DictionaryExpression.prototype.gen = function() {
  let pairs = this.pairs ? this.pairs.map(p => p.gen()) : [];
  return `{${pairs.join(', ')}}`;
};

KeyValuePair.prototype.gen = function() {
  return `${this.key.gen()}:${this.value.gen()}`;
};

FieldExp.prototype.gen = function() {
  return `${this.item.gen()}.${this.functionCall.gen()}`;
};

SubscriptedExp.prototype.gen = function() {
  if (this.index.constructor === NumRange) {
    return `${this.item.gen()}.slice(${this.index.start.value}, ${this.index.end
      .value + 1})`;
  } else {
    return `${this.item.gen()}[${this.index.gen()}]`;
  }
};

IfShort.prototype.gen = function() {
  return `${this.condition.gen()} ? ${this.exp.gen()} : ${this.alternate.gen()}`;
};
