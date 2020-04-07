const util = require('util');
const { NumericLiteral } = require('../ast');
const { NumType } = require('./builtins');

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

module.exports = {
  isNotVariableTypeMismatch(type, expression) {
    doCheck(
      type.id === LiteralTypeMatch(expression).id,
      `Expression of type ${util.format(
        expression.type
      )} not compatible with type ${util.format(type)}`
    );
  },
};

const LiteralTypeMatch = (literal) => {
  switch (literal.constructor) {
    case NumericLiteral:
      return NumType;
    default:
      throw new Error('ugh');
  }
};
