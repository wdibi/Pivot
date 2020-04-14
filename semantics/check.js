const util = require('util');

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

module.exports = {
  isNotVariableTypeMismatch(type, expression) {
    doCheck(
      type.id === 'auto' || type.id === expression.type.id,
      `Expression of type ${util.format(
        expression.type
      )} not compatible with type ${util.format(type)}`
    );
  },
};
