const util = require('util');
const {
  FunctionDeclaration,
  TaskDeclaration,
  ReturnStatement,
} = require('../ast');

const { NumType, StringType, CharType, BoolType } = require('../ast');

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
  returnIsNotInTask(functionContext) {
    doCheck(
      functionContext.functionType !== 'task',
      'return statement not valid in task'
    );
  },
  isNumOrBool(exp) {
    doCheck(
      exp.type === NumType || exp.type === BoolType,
      `${util.format(exp.value)} is not a num or bool`
    );
  },
  isNumStringOrChar(exp) {
    doCheck(
      exp.type === NumType || exp.type === StringType || exp.type == CharType,
      `${util.format(exp.value)} is not num, string, or char`
    );
  },
  isNum(exp) {
    doCheck(exp.type === NumType, `${util.format(exp.value)} is not a num`);
  },
  isBool(exp) {
    doCheck(
      exp.type === BoolType,
      `${util.format(exp.value)} is not a boolean`
    );
  },
  hasType(item) {
    doCheck(
      item.type,
      `${util.format(item.constructor.name)} does not have a type`
    );
  },
  hasEquivalentTypes(item1, item2) {
    doCheck(
      item1.type === item2.type,
      `${item1} does not have the same type as ${item2}`
    );
  },
};
