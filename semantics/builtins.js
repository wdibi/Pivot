const {
  PrimitiveType,
  ListType,
  DictType,
  FunctionDeclaration,
  Parameter,
  IdExpression,
} = require('../ast');

const BoolType = new PrimitiveType('bool');
const CharType = new PrimitiveType('char');
const StringType = new PrimitiveType('string');
const NumType = new PrimitiveType('num');
const AutoType = new PrimitiveType('auto');

const listFunctions = [
  new FunctionDeclaration(new IdExpression('find'), NumType, [
    new Parameter(AutoType, new IdExpression('element')),
  ]),
  new FunctionDeclaration(new IdExpression('head')),
  new FunctionDeclaration(new IdExpression('tail')),
  new FunctionDeclaration(new IdExpression('len'), NumType),
  new FunctionDeclaration(new IdExpression('push'), ListType, [
    new Parameter(AutoType, new IdExpression('element')),
  ]),
  new FunctionDeclaration(new IdExpression('pop')),
  new FunctionDeclaration(new IdExpression('unshift'), ListType, [
    new Parameter(AutoType, new IdExpression('element')),
  ]),
  new FunctionDeclaration(new IdExpression('shift'), AutoType),
];

const mathFunctions = [
  new FunctionDeclaration(new IdExpression('abs'), NumType, [
    new Parameter(new PrimitiveType('num'), new IdExpression('x')),
  ]),
  new FunctionDeclaration(new IdExpression('pi'), NumType),
  new FunctionDeclaration(new IdExpression('random'), NumType, [
    new Parameter(new PrimitiveType('num'), new IdExpression('lowerBound')),
    new Parameter(new PrimitiveType('num'), new IdExpression('upperBound')),
  ]),
];

const functions = [mathFunctions, listFunctions];

/* eslint-disable no-param-reassign */
functions.forEach(funcGroup => {
  funcGroup.forEach(f => {
    f.builtin = true;
  });
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
  mathFunctions,
  listFunctions,
};
