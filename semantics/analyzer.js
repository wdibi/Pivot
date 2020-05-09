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
  TaskStatement,
  FunctionCall,
  Parameter,
  ReturnStatement,
  BreakStatement,
  IfStatement,
  IfShort,
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
  AutoType,
  FieldExp,
  SubscriptedExp,
  NumRange,
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
    .filter(d => d.constructor === FunctionDeclaration)
    .map(d => {
      d.analyzeSignature(localContext);
      localContext.add(d);
    });
  this.statements.forEach(s => {
    s.analyze(localContext);
  });
  this.statements.filter(s => s.constructor === VariableDeclaration);
  check.statementsAreReachable(this.statements, localContext);
};

Object.assign(PrimitiveType.prototype, {
  isCompatibleWith(otherType) {
    return this.id === 'auto' ? true : this.id === otherType.id;
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
  if (this.init.length) {
    this.init.forEach(element => element.analyze(context));
    this.init.forEach(element => check.hasCompatibleTypes(this.type, element));
    this.id.map((id, index) =>
      context.add(
        new VariableDeclaration(
          id.id,
          this.type.isCompatibleWith(AutoType)
            ? this.init[index].type
            : this.type,
          this.init[index]
        )
      )
    );
  } else {
    this.init.analyze(context);
    check.hasCompatibleTypes(this.type, this.init);
    if (this.type instanceof PrimitiveType) {
      this.type.isCompatibleWith(AutoType) && (this.type = this.init.type);
    }
    context.add(this);
  }
};

AssignmentStatement.prototype.analyze = function(context) {
  if (this.target.constructor === SubscriptedExp) {
    this.source.analyze(context);
  } else {
    const ref = context.lookup(this.target.id);
    this.target.type = context.lookup(this.target.id).type;
    this.source.analyze(context);
    check.hasCompatibleTypes(this.target.type, this.source);
    if (this.source.constructor === IdExpression) {
      ref.currentValue = this.source.ref.currentValue;
    } else {
      ref.currentValue = this.source;
    }
  }
};

IdExpression.prototype.analyze = function(context, defaultType = undefined) {
  if (defaultType) {
    this.type = defaultType;
  } else {
    this.ref = context.lookup(this.id);
    this.type = this.ref.type;
  }
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

TaskStatement.prototype.analyze = function(context) {
  this.exp.analyze(context, this.defaultType);
  check.taskEvaluatesCorrectReturnType(this.exp, this.returnType);
  context.add(this);
};

FunctionCall.prototype.analyze = function(context) {
  this.callee = context.lookup(this.id.id);
  check.isFunction(this.callee);

  this.params && this.params.forEach(arg => arg.analyze(context));

  check.paramsMatchDeclaration(this.params, this.callee.params);

  this.type = this.callee.returnType;
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

BinaryExpression.prototype.analyze = function(
  context,
  defaultType = undefined
) {
  // Primitive Types First
  // Later consider something like [3,2,1] + [0] = [3,2,1,0]
  this.left.analyze(context, defaultType);
  this.right.analyze(context, defaultType);

  if (this.op === '+') {
    check.isNumStringOrChar(this.right);
    check.isNumStringOrChar(this.left);
    this.type = this.left.type.isCompatibleWith(this.right.type)
      ? this.left.type
      : StringType;
  } else {
    if (['-', '/', '*', '%', '**'].includes(this.op)) {
      check.isNum(this.right);
      check.isNum(this.left);
      this.type = NumType;
    } else {
      if (['!=', '=='].includes(this.op)) {
        check.isNumStringOrChar(this.right);
        check.isNumStringOrChar(this.left);
      } else if (['<=', '<', '>=', '>'].includes(this.op)) {
        check.isNum(this.right);
        check.isNum(this.left);
      } else {
        check.isBool(this.right);
        check.isBool(this.left);
      }
      this.type = BoolType;
    }
  }
};

UnaryExpression.prototype.analyze = function(context) {
  this.operand.analyze(context);
  switch (this.op) {
    case '!':
    case 'not':
      check.isBool(this.operand);
      this.type = BoolType;
      break;
    case '-':
      check.isNum(this.operand);
      this.type = NumType;
      break;
  }
};

PrintStatement.prototype.analyze = function(context) {
  this.item.analyze(context);
};

ListExpression.prototype.analyze = function() {
  this.elements && this.elements.map(e => e.analyze());
  check.listHasConsistentTypes(this.elements);
  this.type = this.elements && this.elements[0].type;
};

WhileStatement.prototype.analyze = function(context) {
  this.condition.analyze(context);
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

IfShort.prototype.analyze = function(context) {
  this.condition.analyze(context);
  this.exp.analyze(context);
  check.conditionIsDetermistic(this.condition);
  this.alternate.analyze(context);
  check.hasCompatibleTypes(this.exp, this.alternate);
  this.type = this.exp.type;
};

DictionaryExpression.prototype.analyze = function() {
  this.pairs &&
    this.pairs.map(p => {
      p.key.analyze();
      p.value.analyze();
    });
  check.dictHasConsistentTypes(this.pairs);
  if (this.pairs) {
    this.type = {
      keyType: this.pairs[0].key.type,
      valueType: this.pairs[0].value.type,
    };
  }
};

CallChain.prototype.analyze = function(context) {
  // TODO: Check for builtin tasks
  this.item.analyze(context);
  this.tasks.map(task => {
    let foundTask = context.lookup(task.id);
    task.defaultType = foundTask.defaultType;
    task.returnType = foundTask.returnType;
  });
  check.isValidTaskChain(this.item, this.tasks);
  this.type = this.tasks[this.tasks.length - 1].returnType;
};

SubscriptedExp.prototype.analyze = function(context) {
  this.item.analyze(context);
  this.index.analyze(context);
  if (this.item.constructor === ListExpression) {
    check.isNum(this.index);
    this.type = this.item.type;
  } else if (this.item.type.constructor === DictType) {
    const dict = this.item.type;
    check.hasCompatibleTypes(dict.keyType, this.index);
    this.type = dict.valueType;
  } else {
    check.isNum(this.index);
    const list = this.item.type;
    this.type = list.type;
  }
};

NumRange.prototype.analyze = function(context) {
  this.start.analyze(context);
  this.end.analyze(context);
  check.isNum(this.start);
  check.isNum(this.end);
  check.isGreaterThan(this.start.value, this.end.value);
  this.type = NumType;
};

function isList(item) {
  return item.constructor === ListType || item.constructor === ListExpression;
}

FieldExp.prototype.analyze = function(context) {
  this.item.analyze(context);
  // TODO: Check list type
  let builtin = context.lookup(this.functionCall.id.id);
  let itemIsList = isList(this.item.ref ? this.item.ref.type : this.item);
  if (itemIsList) {
    this.item.type = this.item.ref ? this.item.type.type : this.item.type;
    switch (builtin.id) {
      case 'head':
      case 'tail':
      case 'pop':
      case 'shift':
        this.type = this.item.type;
        break;
      case 'len':
      case 'find':
        this.type = builtin.type;
        break;
      case 'push':
      case 'unshift':
        // TODO: elem type === list type
        if (this.item.constructor === IdExpression) {
          this.type = this.item.type;
        } else {
          this.type = new ListType(this.item.type);
        }
        break;
    }
  } else {
    this.item.type = this.item.ref ? this.item.ref.type : this.item.type;
    switch (builtin.id) {
      case 'contains':
        this.type = BoolType;
        break;
      case 'del':
        this.type = this.item.type;
        break;
      case 'keys':
        this.type = new ListType(this.item.type.keyType);
        break;
      case 'values':
        this.type = new ListType(this.item.type.valueType);
        break;
    }
  }
};
