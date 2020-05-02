const prettyJs = require('pretty-js');

const {
  VariableDeclaration,
  IdExpression,
  NumericLiteral,
  StringLiteral,
  BooleanLiteral,
  CharacterLiteral,
  PrintStatement,
  AssignmentStatement,
  FunctionDeclaration,
  TaskStatement,
  FunctionCall,
  Parameter,
  ReturnStatement,
  BreakStatement,
  IfStatement,
  IfShort,
  BinaryExpression,
  UnaryExpression,
  ListExpression,
  WhileStatement,
  RepeatStatement,
  ForStatement,
  DictionaryExpression,
  CallChain,
  KeyValuePair,
  FieldExp,
  SubscriptedExp,
  NumRange,
  Nop,
} = require('../ast');

const builtins = {
  find: function find(n) {
    return `.find(${n})`;
  },
  head: function head() {
    return `[0]`;
  },
  tail: function tail() {
    return `.slice(1)`;
  },
  len: function len() {
    return `.length`;
  },
  push: function push(n) {
    return `.push(${n})`;
  },
  pop: function pop() {
    return `.pop()`;
  },
  unshift: function unshift(n) {
    return `.unshift(${n})`;
  },
  shift: function shift() {
    return `.shift()`;
  },
  // Dict Need to be tested
  contains: function contains(k) {
    return `.hasOwnProperty(${k})`;
  },
  del: function del(objName, k) {
    return `delete ${objName}[${k}]`;
  },
  keys: function keys(o) {
    return `Object.keys(${o})`;
  },
  values: function values(o) {
    return `Object.values(${o})`;
  },
};

function makeOp(op) {
  return { not: '!', and: '&&', or: '||', '==': '===', '!=': '!=' }[op] || op;
}

function generateBlock(block) {
  return block.statements
    .filter(s => !isNop(s))
    .map(s => `${s.gen()};`)
    .join('');
}

function isNop(s) {
  return s instanceof Nop;
}

module.exports = function(exp) {
  return prettyJs(generateBlock(exp.block));
};

VariableDeclaration.prototype.gen = function() {
  if (this.id.constructor === Array) {
    return `let ${this.id
      .map((elm, i) => `${elm.id} = ${this.init[i].gen()}`)
      .join(', ')}`;
  }
  return `let ${this.id} = ${this.init.gen()}`;
};

IdExpression.prototype.gen = function() {
  return `${this.id}`;
};

NumericLiteral.prototype.gen = function() {
  return this.value;
};

StringLiteral.prototype.gen = function() {
  return `'${this.value}'`;
};

BooleanLiteral.prototype.gen = function() {
  return this.value;
};

CharacterLiteral.prototype.gen = function() {
  return `'${this.value}'`;
};

PrintStatement.prototype.gen = function() {
  return `console.log(${this.item.gen()})`;
};

AssignmentStatement.prototype.gen = function() {
  return `${this.target.gen()} = ${this.source.gen()}`;
};

FunctionDeclaration.prototype.gen = function() {
  let params = this.params ? this.params.map(p => p.gen()) : [];
  return `function ${this.id}(${params.join(', ')}) { ${generateBlock(
    this.body
  )} }`;
};

TaskStatement.prototype.gen = function() {
  return `const ${this.id} = (d) =>  ${this.exp.gen().replace('default', 'd')}`;
};

CallChain.prototype.gen = function() {
  let statement = `${this.item.gen()}`;
  this.tasks.forEach(task => {
    statement = `${task.gen()}(${statement})`;
  });
  return statement;
};

FunctionCall.prototype.gen = function() {
  let params = this.params ? this.params.map(p => p.gen()) : [];
  return `${this.id.gen()}(${params.join(', ')})`;
};

Parameter.prototype.gen = function() {
  return this.id;
};

ReturnStatement.prototype.gen = function() {
  return `return ${this.item.gen()}`;
};

BreakStatement.prototype.gen = function() {
  return `break`;
};

IfStatement.prototype.gen = function() {
  let elsePart = this.elseBody ? `else {${generateBlock(this.elseBody)}}` : '';
  return `if (${this.condition.gen()}) {
    ${generateBlock(this.body)}
  }${elsePart}`;
};

BinaryExpression.prototype.gen = function() {
  let result =
    (this.left.constructor === BinaryExpression
      ? `(${this.left.gen()})`
      : `${this.left.gen()}`) + ` ${makeOp(this.op)} `;
  result +=
    this.right.constructor === BinaryExpression
      ? `(${this.right.gen()})`
      : `${this.right.gen()}`;
  return result;
};

UnaryExpression.prototype.gen = function() {
  return `${makeOp(this.op)}${this.operand.gen()}`;
};

ListExpression.prototype.gen = function() {
  const listContents = this.elements.map(e => e.gen());
  return `[${listContents.join(', ')}]`;
};

WhileStatement.prototype.gen = function() {
  return `while (${this.condition.gen()}) {
    ${generateBlock(this.body)}
  }`;
};

RepeatStatement.prototype.gen = function() {
  return `do {${generateBlock(this.body)}} while (!(${this.condition.gen()}))`;
};

ForStatement.prototype.gen = function() {
  return `for (${this.init.gen()};${this.condition.gen()};${this.exp.gen()}) {
    ${generateBlock(this.body)}
  }`;
};

DictionaryExpression.prototype.gen = function() {
  let pairs = this.pairs ? this.pairs.map(p => p.gen()) : [];
  return `{${pairs.join(', ')}}`;
};

KeyValuePair.prototype.gen = function() {
  return `${this.key.gen()}:${this.value.gen()}`;
};

FieldExp.prototype.gen = function() {
  // Only allow one param atm
  const builtinId = this.functionCall.id.gen(); // delete objectName[${k}]
  const param = this.functionCall.params
    ? this.functionCall.params[0].gen()
    : null;

  switch (builtinId) {
    case 'keys':
    case 'values':
      return builtins[builtinId](this.item.gen());
    case 'del':
      return builtins[builtinId](this.item.id, param);

    default:
      return `${this.item.gen()}${builtins[builtinId](param)}`;
  }
};

SubscriptedExp.prototype.gen = function() {
  if (this.index.constructor === NumRange) {
    return `${this.item.gen()}.slice(${this.index.start.value}, ${this.index.end
      .value + 1})`;
  } else {
    return `${this.item.gen()}[${this.index.gen()}]`;
  }
};

IfShort.prototype.gen = function() {
  return `${this.condition.gen()} ? ${this.exp.gen()} : ${this.alternate.gen()}`;
};
