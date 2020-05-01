const {
  Program,
  Block,
  VariableDeclaration,
  AssignmentStatement,
  ReturnStatement,
  BreakStatement,
  FunctionDeclaration,
  TaskStatement,
  NumericLiteral,
  StringLiteral,
  BooleanLiteral,
  CharacterLiteral,
  Parameter,
  FunctionCall,
  CallChain,
  IdExpression,
  IfStatement,
  IfShort,
  WhileStatement,
  RepeatStatement,
  ForStatement,
  BinaryExpression,
  UnaryExpression,
  ListExpression,
  DictionaryExpression,
  KeyValuePair,
  PrintStatement,
  SubscriptedExp,
  NumRange,
  FieldExp,
} = require('../ast');

module.exports = program => program.optimize();

function isZero(e) {
  return isNumericLiteral(e) && e.value === 0;
}

function isOne(e) {
  return isNumericLiteral(e) && e.value === 1;
}

function isTrue(e) {
  return isBooleanLiteral(e) && e.value;
}

function areEqual(left, right) {
  return (
    left instanceof NumericLiteral &&
    right instanceof NumericLiteral &&
    left.value === right.value
  );
}

function bothNumericLiterals(b) {
  return isNumericLiteral(b.left) && isNumericLiteral(b.right);
}

function isNumericLiteral(e) {
  return e instanceof NumericLiteral;
}

function isBooleanLiteral(e) {
  return e instanceof BooleanLiteral;
}

function isFalse(e) {
  return e instanceof BooleanLiteral && !e.value;
}

function isAndOp(op) {
  return op === 'and' || op === '&&';
}

function isOrOp(op) {
  return op === 'or' || op === '||';
}

Program.prototype.optimize = function() {
  this.block = this.block.optimize();
  return this;
};

Block.prototype.optimize = function() {
  this.statements = this.statements.map(s => s.optimize());
  return this;
};

VariableDeclaration.prototype.optimize = function() {
  this.init.optimize();
  return this;
};

AssignmentStatement.prototype.optimize = function() {
  this.target = this.target.optimize();
  this.source = this.source.optimize();
  if (this.target == this.source) {
    return null;
  }
  return this;
};

BreakStatement.prototype.optimize = function() {
  return this;
};

ReturnStatement.prototype.optimize = function() {
  this.item = this.item.optimize();
  return this;
};

PrintStatement.prototype.optimize = function() {
  this.item = this.item.optimize();
  return this;
};

FunctionDeclaration.prototype.optimize = function() {
  this.body = this.body.optimize();
  return this;
};

FunctionCall.prototype.optimize = function() {
  this.params = this.params.map(p => p.optimize());
  return this;
};

CallChain.prototype.optimize = function() {
  // this.item ?
  this.methods = this.methods.map(m => m.optimize());
  return this;
};

TaskStatement.prototype.optimize = function() {
  this.body = this.body.optimize();
  return this;
};

Parameter.prototype.optimize = function() {
  return this;
};

FieldExp.prototype.optimize = function() {
  this.item = this.item.optimize();
  this.functionCall = this.item.functionCall();
  return this;
};

IfStatement.prototype.optimize = function() {
  this.condition = this.condition.optimize();
  this.body = this.body.optimize();
  this.elseBody = this.body.optimize();
  return this;
};

IfShort.prototype.optimize = function() {
  this.exp = this.exp.optimize();
  this.condition = this.condition.optimize();
  this.alternate = this.alternate.optimize();
  return this;
};

WhileStatement.prototype.optimize = function() {
  this.condition = this.condition.optimize();
  this.body = this.body.optimize();
  return this;
};

RepeatStatement.prototype.optimize = function() {
  this.condition = this.condition.optimize();
  this.body = this.body.optimize();
  return this;
};

ForStatement.prototype.optimize = function() {
  this.init = this.init.optimize();
  this.condition = this.condition.optimize();
  this.exp = this.exp.optimize();
  this.body = this.body.optimize();
  return this;
};

UnaryExpression.prototype.optimize = function() {
  this.operand = this.operand.optimize();

  // Negative
  if (this.op === '-' && isNumericLiteral(this.operand))
    return new NumericLiteral(-this.operand);

  // Negation
  if ((this.op === '!' || this.op === 'not') && isBooleanLiteral(this.operand))
    return new BooleanLiteral(!this.operand);

  return this;
};

BinaryExpression.prototype.optimize = function() {
  this.left = this.left.optimize();
  this.right = this.right.optimize();

  // And
  if (this.op === '+' && isZero(this.left)) return this.left;
  if (this.op === '+' && isZero(this.right)) return this.right;

  // Sub
  if (this.op === '-' && areEqual(this.left, this.right))
    return new NumericLiteral(0);

  // Mult
  if (this.op === '*' && isZero(this.right)) return new NumericLiteral(0);
  if (this.op === '*' && isZero(this.left)) return new NumericLiteral(0);
  if (this.op === '*' && isOne(this.right)) return this.left;
  if (this.op === '*' && isOne(this.left)) return this.right;

  // Div
  if (this.op === '/' && areEqual(this.left, this.right))
    return new NumericLiteral(1);

  // Mod
  if (this.op === '%' && areEqual(this.left, this.right))
    return new NumericLiteral(0);

  // Less Than and Greater Than
  if ((this.op === '<' || this.op === '>') && areEqual(this.left, this.right))
    return new BooleanLiteral(false);

  // Equals
  if (
    (this.op === '<=' || this.op === '>=' || this.op === '==') &&
    areEqual(this.left, this.right)
  )
    return new BooleanLiteral(true);

  // And
  if (isAndOp() && isFalse(this.left || isFalse(this.right)))
    return new BooleanLiteral(false);

  // Or
  if (isOrOp() && (isTrue(this.left) || isTrue(this.right)))
    return new BooleanLiteral(true);

  if (bothNumericLiterals(this)) {
    const [x, y] = [this.left.value, this.right.value];
    if (this.op === '+') return new NumericLiteral(x + y);
    if (this.op === '-') return new NumericLiteral(x - y);
    if (this.op === '*') return new NumericLiteral(x * y);
    if (this.op === '**') return new NumericLiteral(Math.pow(x, y));
    if (this.op === '/') return new NumericLiteral(x / y);
    if (this.op === '%') return new NumericLiteral(x % y);
    if (this.op === '==') return new BooleanLiteral(x === y);
    if (this.op === '<') return new BooleanLiteral(x < y);
    if (this.op === '>') return new BooleanLiteral(x > y);
    if (this.op === '<=') return new BooleanLiteral(x <= y);
    if (this.op === '>=') return new BooleanLiteral(x >= y);
  }

  return this;
};

ListExpression.prototype.optimize = function() {
  this.elements = this.elements.map(e => e.optimize());
  return this;
};

DictionaryExpression.prototype.optimize = function() {
  this.pairs = this.pairs.map(p => p.optimize());
  return this;
};

KeyValuePair.prototype.optimize = function() {
  this.key = this.key.optimize();
  this.value = this.value.optimize();
  return this;
};

SubscriptedExp.prototype.optimize = function() {
  this.item = this.item.optimize();
  this.index = this.index.optimize();
  return this;
};

NumRange.prototype.optimize = function() {
  this.start = this.start.optimize();
  this.end = this.end.optimize();
  return this;
};

IdExpression.prototype.optimize = function() {
  return this;
};

NumericLiteral.prototype.optimize = function() {
  return this;
};

StringLiteral.prototype.optimize = function() {
  return this;
};

BooleanLiteral.prototype.optimize = function() {
  return this;
};

CharacterLiteral.prototype.optimize = function() {
  return this;
};
