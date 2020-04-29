const util = require('util');

const {
  FunctionDeclaration,
  TaskStatement,
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
  DictType,
  ListType,
  AutoType,
  FieldExp,
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

function hasReturnStatement(body) {
  if (body.statements.filter(d => d.constructor === ReturnStatement).length > 0)
    return true;

  let foundReturn = false;

  body.statements.forEach(statement => {
    if (statement.body) {
      foundReturn = foundReturn || hasReturnStatement(statement.body);
    }
    if (statement.elseBody) {
      foundReturn = foundReturn || hasReturnStatement(statement.elseBody);
    }
  });

  return foundReturn;
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
  paramsMatchDeclaration(decParams, callParams) {
    doCheck(
      !callParams && !decParams
        ? true
        : callParams && decParams
        ? callParams.length === decParams.length
        : false,
      `number of params: ${decParams} don't match args: ${callParams}`
    );
    callParams &&
      callParams.forEach((arg, i) =>
        this.isNotVariableTypeMismatch(decParams[i].type, arg)
      );
  },
  isFunction(value) {
    doCheck(
      value.constructor === FunctionDeclaration,
      `non-existing function called`
    );
  },
  withinFunction(context) {
    doCheck(context.currentFunction !== null, `not within a function`);
  },
  bodyContainsReturn(body) {
    let foundReturn = hasReturnStatement(body);
    doCheck(foundReturn, 'no return statement found within function');
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
  hasCompatibleTypes(baseType, item) {
    if (baseType.constructor === DictType) {
      doCheck(
        baseType.isCompatibleWithPairs(item.pairs),
        `pairs do not match DictType`
      );
    } else if (baseType.constructor === ListType) {
      if (item.constructor === FieldExp) {
        doCheck(
          baseType === item.type,
          `The list of type  is not equal to its expression`
        );
      } else {
        doCheck(
          baseType.isCompatibleWithElements(item.elements),
          `elements do not match ListType`
        );
      }
    } else {
      doCheck(
        baseType.isCompatibleWith(item.type),
        `PrimitiveTypes do not match: ${baseType.id} is not ${item.type.id}`
      );
    }
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
    if (condition.constructor === BinaryExpression) {
      doCheck(
        !(
          literals.includes(condition.left.constructor) &&
          literals.includes(condition.right.constructor)
        ),
        'condition is deterministic'
      );
    } else if (condition.constructor === UnaryExpression) {
      doCheck(
        !literals.includes(this.operand.constructor),
        'condition is deterministic'
      );
    } else {
      doCheck(
        !literals.includes(condition.constructor),
        'condition is deterministic'
      );
    }
  },
  dictHasConsistentTypes(pairs) {
    if (pairs) {
      const firstKeyType = pairs[0].key.type;
      const firstValueType = pairs[0].value.type;
      doCheck(
        pairs.every(
          p => p.key.type === firstKeyType && p.value.type === firstValueType
        ),
        `Inconsistent Dictionary Types`
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
  taskEvaluatesCorrectReturnType(exp, returnType) {
    doCheck(
      exp.type === returnType,
      `${exp} does not evaluate to a ${returnType}`
    );
  },
  isValidTaskChain(item, tasks) {
    if (tasks.length === 1) {
      doCheck(
        item.type === tasks.defaultType,
        `item type does not match single default task`
      );
    }

    let nextType = item.type;
    for (let i = 1; i < tasks.length; i++) {
      doCheck(
        nextType === tasks[i].defaultType,
        `broken task types in pos ${i}`
      );
      nextType = tasks[i].returnType;
    }
  },
  isGreaterThan(start, end) {
    doCheck(end > start, `${end} is not greater than ${start}`);
  },
};
