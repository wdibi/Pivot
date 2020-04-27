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
  new FunctionDeclaration('void', 'print', [new Parameter(StringType, 's')]),
  new FunctionDeclaration(NumType, 'len', [new Parameter('void', 's')]),
];

const stringFunctions = [
  new FunctionDeclaration(StringType, 'substring', [new Parameter(StringType, 's'), new Parameter(NumType, 'start'), new Parameter(NumType, 'end')]),
  new FunctionDeclaration(StringType, 'charAt', [new Parameter(StringType, 's'), new Parameter(NumType, 'i')]),
]


const mathFunctions = [
  new FunctionDeclaration(NumType, 'abs', [new Parameter(NumType, 'n')]),
  new FunctionDeclaration(NumbType, 'sqrt', [new Parameter(NumType, 'n')]),
  new FunctionDeclaration(NumType, 'pi', []),
  new FunctionDeclaration(NumType, 'random', [
    new Parameter(NumType, 'beginning'),
    new Parameter(NumType, 'end'),
  ]),
]

// Not sure how to go about with types -> Have them as 'PrimitiveType' for now
const dictFunctions = [
  new FunctionDeclaration(PrimitiveType, 'add', [new Parameter(DictType, 'd'), new Parameter(PrimitiveType, 'k'), new Parameter(PrimitiveType, 'v')]),
  new FunctionDeclaration(PrimitiveType, 'remove', [new Parameter(DictType, 'd'), new Parameter(PrimitiveType, 'k')]),
  new FunctionDeclaration(PrimitiveType, 'update', [new Parameter(DictType, 'd'), new Parameter(PrimitiveType, 'k'), new Parameter(PrimitiveType, 'v')]),
  new FunctionDeclaration(PrimitiveType, 'getValue', [new Parameter(DictType, 'd'), new Parameter(primitiveType, 'k')]),
  new FunctionDeclaration(PrimitiveType, 'keys', [new Parameter(DictType, 'd')]),
  new FunctionDeclaration(PrimitiveType, 'values', [new Parameter(DictType, 'd')]),
  new FunctionDeclaration(PrimitiveType, 'items', [new Parameter(DictType, 'd')])
]

// Not sure what to put for return/param type
const listFunctions = [
  // Should we allow prepending multiple elements
  new FunctionDeclaration(PrimitiveType, 'prepend', [new Parameter(ListType, 'l'), new Parameter(PrimitiveType, 'element')]),
  new FunctionDeclaration(PrimitiveType, 'append', [new Parameter(ListType, 'l'), new Parameter(PrimitiveType, 'element')]),
  new FunctionDeclaration(PrimitiveType, 'insert', [new Parameter(ListType, 'l'), new Parameter(NumType, 'index'), new Parameter(PrimitiveType, 'element')]),
  new FunctionDeclaration(PrimitiveType, 'remove', [new Parameter(ListType, 'l'), new Parameter(NumType, 'index')]),
];

const functions = [standardFunctions, stringFunctions, mathFunctions, listFunctions, dictFunctions];

/* eslint-disable no-param-reassign */
functions.forEach(f => {
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
  stringFunctions,
  mathFunctions,
  listFunctions,
  dictFunctions
};
