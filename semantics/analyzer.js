const {
  Program,
  Block,
  VariableDeclaration,
  IdExpression,
  NumericLiteral,
  StringLiteral,
  BooleanLiteral,
  CharacterLiteral,
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
  WhileStatement,
  RepeatStatement,
  ForStatement,
} = require('../ast');
const {
  NumType,
  StringType,
  BoolType,
  CharType,
  PrimitiveType,
} = require('../ast');
const check = require('./check');
const Context = require('./context');

module.exports = exp => exp.analyze(Context.INITIAL);

Program.prototype.analyze = function(context) {
  this.block.analyze(context);
};

Block.prototype.analyze = function(context) {
  const localContext = context.createChildContextForBlock();
  this.statements
    .filter(
      d =>
        d.constructor === FunctionDeclaration ||
        d.constructor === TaskDeclaration
    )
    .map(d => {
      d.analyzeSignature(localContext);
      localContext.add(d);
    });
  this.statements.forEach(s => s.analyze(localContext));
  check.statementsAreReachable(this.statements, localContext);
};

Object.assign(PrimitiveType.prototype, {
  isCompatibleWith(otherType) {
    return this === otherType;
  },
});

VariableDeclaration.prototype.analyze = function(context) {
  this.init.analyze(context);
  check.isNotVariableTypeMismatch(this.type, this.init);
  context.add(this);
};

AssignmentStatement.prototype.analyze = function(context) {
  this.target.type = context.lookup(this.target.id).type;
  this.source.analyze(context);
  this.target.type.isCompatibleWith(this.source.type);
};

IdExpression.prototype.analyze = function(context) {
  this.ref = context.lookup(this.id);
  this.type = this.ref.type;
};

NumericLiteral.prototype.analyze = function() {
  this.type = NumType;
};

StringLiteral.prototype.analyze = function() {
  this.type = StringType;
};

BooleanLiteral.prototype.analyze = function() {
  this.type = BoolType;
};

CharacterLiteral.prototype.analyze = function() {
  this.type = CharType;
};

FunctionDeclaration.prototype.analyzeSignature = function(context) {
  this.bodyContext = context.createChildContextForFunctionBody(this);
  this.params.forEach(p => p.analyze(this.bodyContext));
  this.returnType = this.type;
};

FunctionDeclaration.prototype.analyze = function() {
  this.body.analyze(this.bodyContext);
  check.bodyContainsReturn(this.body);
};

TaskDeclaration.prototype.analyzeSignature = function(context) {
  this.bodyContext = context.createChildContextForTaskBody(this);
  this.params.forEach(p => p.analyze(this.bodyContext));
};

TaskDeclaration.prototype.analyze = function() {
  this.body.analyze(this.bodyContext);
};

FunctionCall.prototype.analyze = function(context) {
  this.callee = context.lookup(this.id.id);
  check.isFunction(this.callee);
  this.params.forEach(arg => arg.analyze(context));
  check.argsMatchParameters(this.params, this.callee.params);
  this.type = this.callee.returnType;
};

TaskDeclaration.prototype.analyzeSignature = function(context) {
  this.bodyContext = context.createChildContextForTaskBody(this);
  this.params.forEach(p => p.analyze(this.bodyContext));
};

TaskDeclaration.prototype.analyze = function() {
  this.body.analyze(this.bodyContext);
};

ReturnStatement.prototype.analyze = function(context) {
  check.withinFunction(context);
  check.returnIsNotInTask(context.currentFunction);
  this.item.analyze(context);
  check.returnMatchesFunctionReturnType(this.item, context.currentFunction);
};

Parameter.prototype.analyze = function(context) {
  context.add(this);
};

BreakStatement.prototype.analyze = function(context) {
  check.breakWithinValidBody(context);
};

WhileStatement.prototype.analyze = function(context) {
  this.bodyContext = context.createChildContextForLoop();
  this.body.analyze(this.bodyContext);
};

RepeatStatement.prototype.analyze = function(context) {
  this.bodyContext = context.createChildContextForLoop();
  this.body.analyze(this.bodyContext);
};

ForStatement.prototype.analyze = function(context) {
  this.bodyContext = context.createChildContextForLoop();
  this.body.analyze(this.bodyContext);
};

IfStatement.prototype.analyze = function(context) {
  this.condition.analyze(context);
  check.conditionIsDetermistic(this.condition);
  this.body.analyze(context);
  if (this.elseBody) {
    this.elseBody.analyze(context);
  }
};

BinaryExpression.prototype.analyze = function(context) {
  this.left.analyze(context);
  this.right.analyze(context);
}
UnaryExpression.prototype.analyze = function(context) {
  this.operand.analyze(context);
}