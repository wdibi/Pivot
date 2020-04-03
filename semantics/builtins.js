const { PrimitiveType } = require('../ast');

const BoolType = new PrimitiveType('bool');
const CharType = new PrimitiveType('char');
const StringType = new PrimitiveType('string');
const NumType = new PrimitiveType('num');
const AutoType = new PrimitiveType('auto');

module.exports = {
  BoolType,
  CharType,
  StringType,
  NumType,
  AutoType,
};
