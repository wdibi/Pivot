const util = require('util');

const {
  FunctionDeclaration,
  TaskDeclaration,
  ReturnStatement,
  BreakStatement,
  UnaryExpression,
  BinaryExpression,
  NumericLiteral,
  StringLiteral,
  BooleanLiteral,
  CharacterLiteral,
  StringType,
  NumType,
  CharType,
  BoolType,
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
  isSameConstructor(defaultConstructor, elementConstructor) {
    doCheck(
      elementConstructor == defaultConstructor,
      `${util.format(elementConstructor)} is not of the type ${util.format(
        defaultConstructor
      )}`
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
      `${util.format(item1.type)} does not have the same type as ${util.format(
        item2.type
      )}`
    );
  },
  hasEquivalentTypesDictionary(item1, item2key, item2value) {
    doCheck(
      item1.keyType === item2key.type && item1.valueType === item2value.type,
      `Declared dictionary types do not match the types of the keys and/or the values.`
    );
  },
  statementsAreReachable(statements, context) {
    let statementTypes = statements.map(statement => statement.constructor);

    doCheck(
      statementTypes.filter(s => s === ReturnStatement || s === BreakStatement)
        .length <= 1,
      `statement is unreachable`
    );

    if (
      context.currentFunction !== null &&
      statementTypes.includes(ReturnStatement)
    ) {
      doCheck(
        statementTypes[statementTypes.length - 1] === ReturnStatement,
        'statement is unreachable'
      );
    }

    if (statementTypes.includes(BreakStatement)) {
      doCheck(statementTypes[statementTypes.length - 1] === BreakStatement);
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
    doCheck(
      pairs.every(
        p => p.key.type === type.keyType && p.value.type === type.valueType
      ),
      `Invalid Dictionary Pairs`
    );
  },

  varWasUsed(variable) {
    doCheck(variable.used, `variable ${variable.id} was declared but not used`);
  },

  dictHasConsistentTypes(pairs) {
    if (pairs) {
      const firstKeyType = pairs[0].key.type;
      const firstValueType = pairs[0].value.type;
      doCheck(
        pairs.every(
          p => p.key.type === firstKeyType && p.value.type === firstValueType
        ),
        `Incosistent Dictionary Types`
      );
    }
  },

  listHasConsistentTypes(elements) {
    if (elements) {
      const firstElementType = elements[0].type;
      doCheck(
        elements.every(e => e.type === firstElementType),
        `inconsistent list types`
      );
    }
  },

  checkValidElements(type, elements) {
    doCheck(
      elements.every(e => e.type === type.type),
      `invalid list elements`
    );
  },
  
  notAssigningTask(source) {
    doCheck(!(source.constructor === TaskDeclaration), 'cannot assign task');
  },
};
