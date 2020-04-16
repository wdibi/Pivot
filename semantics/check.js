const util = require('util');

const {
  FunctionDeclaration,
  TaskDeclaration,
  ReturnStatement,
  UnaryExpression,
  BinaryExpression,
  NumericLiteral,
  StringLiteral,
  BooleanLiteral,
  CharacterLiteral,
  PrimitiveType,
  DictType,
  StringType,
} = require('../ast');

const literals = [
  NumericLiteral,
  StringLiteral,
  BooleanLiteral,
  CharacterLiteral,
];

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

module.exports = {
  isNotVariableTypeMismatch(type, expression) {
    doCheck(
      type.id === expression.type.id,
      `expression of type ${util.format(
        expression.type.id
      )} not compatible with type ${util.format(type.id)}`
    );
  },

  argsMatchParameters(args, params) {
    doCheck(
      args.length === params.length,
      `function expects ${params.length} args, but received ${args.length}`
    );
    args.forEach((arg, i) =>
      this.isNotVariableTypeMismatch(params[i].type, arg)
    );
  },

  isFunction(value) {
    doCheck(
      value.constructor === FunctionDeclaration ||
        value.constructor === TaskDeclaration,
      `non-existing function called`
    );
  },

  withinFunction(context) {
    doCheck(context.currentFunction !== null, `not within a function`);
  },

  bodyContainsReturn(body) {
    doCheck(
      body.statements.filter(d => d.constructor === ReturnStatement).length > 0,
      'no return statement found within function'
    );
  },

  returnMatchesFunctionReturnType(returnExpression, functionContext) {
    doCheck(
      returnExpression.type === functionContext.returnType,
      `returns ${util.format(
        returnExpression.type
      )}, but function expects ${util.format(functionContext.returnType)}`
    );
  },

  breakWithinValidBody(context) {
    doCheck(
      context.inLoop ||
        (context.currentFunction &&
          context.currentFunction.functionType === 'task'),
      `not within task or loop`
    );
  },

  returnIsNotInTask(functionContext) {
    doCheck(
      functionContext.functionType !== 'task',
      'return statement not valid in task'
    );
  },

  statementsAreReachable(statements, context) {
    let statementTypes = statements.map(statement => statement.constructor);
    if (
      context.currentFunction !== null &&
      statementTypes.includes(ReturnStatement)
    ) {
      doCheck(
        statementTypes[statementTypes.length - 1] === ReturnStatement,
        'statement is unreachable'
      );
    }
  },

  conditionIsDetermistic(condition) {
    doCheck(
      !literals.includes(condition.constructor),
      'condition is deterministic'
    );

    if (condition.constructor === UnaryExpression) {
      doCheck(
        !literals.includes(this.operand.constructor),
        'condition is deterministic'
      );
    }

    if (condition.constructor === BinaryExpression) {
      doCheck(
        !(
          literals.includes(condition.left.constructor) &&
          literals.includes(condition.right.constructor)
        ),
        'condition is deterministic'
      );
    }
  },
  
  checkValidPairs(type, pairs) {
    console.log("PAIRS", pairs[0].key.type === type.keyType);
    doCheck(pairs.every(p => p.key.type === type.keyType && p.value.type === type.valueType), `Invalid Dictionary Pairs`)
  }
};
