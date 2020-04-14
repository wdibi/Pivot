const {
  PrimitiveType,
  ListType,
  DictType,
  FunctionDeclaration,
  Parameter,
} = require('../ast');

const BoolType = new PrimitiveType('bool');
const CharType = new PrimitiveType('char');
const StringType = new PrimitiveType('string');
const NumType = new PrimitiveType('num');
const AutoType = new PrimitiveType('auto');

const standardFunctions = [
  new FunctionDeclaration('print', [new Parameter(StringType, 's')]),
];

/* eslint-disable no-param-reassign */
standardFunctions.forEach(f => {
  f.builtin = true;
});
/* eslint-enable no-param-reassign */

module.exports = {
  BoolType,
  CharType,
  StringType,
  NumType,
  AutoType,
  ListType,
  DictType,
  standardFunctions,
};
