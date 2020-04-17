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
  PrintStatement,
  ListExpression,
  WhileStatement,
  RepeatStatement,
  ForStatement,
  DictType,
  ListType,
  DictionaryExpression,
  CallChain,
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
  this.statements.filter(s => s.constructor === VariableDeclaration);
  check.statementsAreReachable(this.statements, localContext);
};

Object.assign(PrimitiveType.prototype, {
  isCompatibleWith(otherType) {
    return this === otherType;
  },
});

Object.assign(DictType.prototype, {
  isCompatibleWithPairs(pairs) {
    return pairs
      ? pairs.every(
          p =>
            this.keyType.isCompatibleWith(p.key.type) &&
            this.valueType.isCompatibleWith(p.value.type)
        )
      : true;
  },
});

Object.assign(ListType.prototype, {
  isCompatibleWithElements(elements) {
    return elements
      ? elements.every(e => this.type.isCompatibleWith(e.type))
      : true;
  },
});

VariableDeclaration.prototype.analyze = function(context) {
  this.init.analyze(context);
  check.hasEquivalentTypes(this.type, this.init);
  context.add(this);
};

AssignmentStatement.prototype.analyze = function(context) {
  this.target.type = context.lookup(this.target.id).type;
  this.source.analyze(context);
  //   check.notAssigningTask(this.source); // Need to add this to list + dict ^. Was added after I pulled so didn't see it.
  check.hasEquivalentTypes(this.target.type, this.source);
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
  this.params && this.params.forEach(p => p.analyze(this.bodyContext));
  this.returnType = this.type;
};

FunctionDeclaration.prototype.analyze = function() {
  this.body.analyze(this.bodyContext);
  check.bodyContainsReturn(this.body);
};

TaskDeclaration.prototype.analyzeSignature = function(context) {
  this.bodyContext = context.createChildContextForTaskBody(this);
  this.params && this.params.forEach(p => p.analyze(this.bodyContext));
};

FunctionCall.prototype.analyze = function(context) {
  this.callee = context.lookup(this.id.id);
  check.isFunction(this.callee);

  this.params && this.params.forEach(arg => arg.analyze(context));

  check.paramsMatchDeclaration(this.params, this.callee.params);

  this.type = this.callee.returnType;
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

BinaryExpression.prototype.analyze = function(context) {
  // Primitive Types First
  // Later consider something like [3,2,1] + [0] = [3,2,1,0]
  this.left.analyze(context);
  this.right.analyze(context);

  if (this.op === '+') {
    check.isNumStringOrChar(this.right);
    check.isNumStringOrChar(this.left);
    this.type = this.left.type.isCompatibleWith(this.right.type)
      ? this.left.type
      : StringType;
  } else {
    check.isNum(this.right);
    check.isNum(this.left);
    this.type = NumType;
  }
};

UnaryExpression.prototype.analyze = function(context) {
  this.operand.analyze(context);
  switch (this.op) {
    case '!':
    case 'not':
      check.isBool(this.operand);
      break;
    case '-':
      check.isNumOrBool(this.operand);
      break;
  }
};

PrintStatement.prototype.analyze = function(context) {
  this.item.analyze(context);
};

ListExpression.prototype.analyze = function() {
  this.elements && this.elements.map(e => e.analyze());
  check.listHasConsistentTypes(this.elements);
};

WhileStatement.prototype.analyze = function(context) {
  this.condition.analyze(context);
  check.conditionIsDetermistic(this.condition);
  this.bodyContext = context.createChildContextForLoop();
  this.body.analyze(this.bodyContext);
};

RepeatStatement.prototype.analyze = function(context) {
  this.condition.analyze(context);
  check.conditionIsDetermistic(this.condition);
  this.bodyContext = context.createChildContextForLoop();
  this.body.analyze(this.bodyContext);
};

ForStatement.prototype.analyze = function(context) {
  this.init.analyze(context);
  this.condition.analyze(context);
  check.conditionIsDetermistic(this.condition);
  this.exp.analyze(context);
  this.body.analyze(context);
  this.bodyContext = context.createChildContextForLoop();
};

IfStatement.prototype.analyze = function(context) {
  this.condition.analyze(context);
  check.conditionIsDetermistic(this.condition);
  this.body.analyze(context);
  this.elseBody && this.elseBody.analyze(context);
};

DictionaryExpression.prototype.analyze = function() {
  this.pairs &&
    this.pairs.map(p => {
      p.key.analyze();
      p.value.analyze();
    });
  check.dictHasConsistentTypes(this.pairs);
};

CallChain.prototype.analyze = function(context) {
  this.item.analyze(context);
  this.methods.map(m => m.analyze(context));
};
