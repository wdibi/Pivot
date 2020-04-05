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
      expression instanceof NumericLiteral && type.id === NumType.id,
      `Expression of type ${util.format(
        expression.type
      )} not compatible with type ${util.format(type)}`
    );
  },
};
