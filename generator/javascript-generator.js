const prettyJs = require('pretty-js');
const util = require('util');

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
  TaskDeclaration,
  FunctionCall,
  Parameter,
  ReturnStatement,
  BreakStatement,
  IfStatement,
  BinaryExpression,
  UnaryExpression,
  ListExpression,
  WhileStatement,
  RepeatStatement, // check
  ForStatement,
  DictionaryExpression,
  CallChain,
} = require('../ast');

const { NumType, StringType, BooleanType } = require('../semantics/builtins');

function makeOp(op) {
  return (
    { not: '!', and: '&&', or: '||', '==': '===', '!=': '!=' }[op] || op // add <, >, <=, >=
  );
}
// how to do these with dot functions (e.g: string.substring(start, end))
const builtin = {
  exit([code]) {
    return `process.exit(${code})`;
  },
  len([s]) {
    return `${s}.length`;
  },
  substring([s, start, end]) {
    return `${s}.substring(${start}, ${end})`;
  },
  charAt([s, i]) {
    return `${s}.charAt(${i})`;
  },
  // ord([c]) {
  //   return `${c}.charCodeAt(0)`;
  // },
  abs([n]) {
    return `Math.abs(${n})`;
  },
  sqrt([n]) {
    return `Math.sqrt(${n})`;
  },
  pi() {
    return `Math.PI`;
  },
  random([s, e]) {
    return `Math.floor(Math.random(${s}) * ${e})`;
    // return `Math.floor(Math.random() * (Math.max(${s}, ${e}) - Math.min(${s}, ${e}) + 1) + Math.min(${s}, ${e}))`;
  },
  pow([x, y]) {
    return `Math.pow(${x}, ${y})`;
  },
  add([d, n]) {
    // not sure how to go about this one
    return ``;
  },
  remove([d, k]) {
    return `delete ${d}.${k}`;
  },
  update([d, k, v]) {
    return `${d}.${k} = ${v}`;
  },
  getValue([d, k]) {
    return `${d}.${k}`;
  },
  keys([d]) {
    return `Object.keys(${d})`;
  },
  values([d]) {
    return `Object.values(${d})`;
  },
  items([d]) {
    return `Object.entries(${d})`;
  },
  prepend([l, element]) {
    return `${l}.unshift(${element})`;
  },
  append([l, element]) {
    return `${l}.push(${element})`;
  },
  insert([l, index, element]) {
    return `${l}.splice(${index}, 0, ${element})`;
  },
  remove([l, index]) {
    return `${l}.splice(${index}, 1)`;
  },
};

function generateBlock(block) {
  console.log(block.statements.map(s => `${s.gen()};`).join(''));
  return block.statements.map(s => `${s.gen()};`).join('');
}

module.exports = function(exp) {
  return prettyJs(generateBlock(exp.block));
};

VariableDeclaration.prototype.gen = function() {
  return `let ${this.id.gen()} = ${this.init.gen()}`;
};

IdExpression.prototype.gen = function() {
  return `${this.id}`;
};

NumericLiteral.prototype.gen = function() {
  return `${this.value}`;
};

StringLiteral.prototype.gen = function() {
  return `'${this.value}'`;
};

BooleanLiteral.prototype.gen = function() {
  return `${this.value}`;
};

CharacterLiteral.prototype.gen = function() {
  return `${this.value}`;
};

PrintStatement.prototype.gen = function() {
  return `console.log(${this.item.gen()})`;
};

AssignmentStatement.prototype.gen = function() {
  return `${this.target.gen()} = ${this.source.gen()}`;
};

FunctionDeclaration.prototype.gen = function() {
  const name = javaScriptId(this);
  const params = this.params.map(javaScriptId);
  const body = makeReturn(this.body);
  return `function ${name} (${params.join(',')}) {${body}}`;
};

TaskDeclaration.prototype.gen = function() {
  const name = javaScriptId(this);
  const params = this.params.map(javaScriptId);
  const body = this.body.gen();
  return `function ${name} (${params.join(',')}) {${body}}`;
};

FunctionCall.prototype.gen = function() {
  const name = javascriptId(this);
  const params = this.params.map(javaScriptId);
  return `${name}()`;
};

// This is how Pivot does it. I do not understand their jsName function
Parameter.prototype.gen = function() {
  // return jsName(this);
};

ReturnStatement.prototype.gen = function() {
  return `return ${this.item.gen()}`;
};

BreakStatement.prototype.gen = function() {
  return 'break';
};

IfStatement.prototype.gen = function() {
  const thenPart = this.body.gen();
  const elsePart = this.elseBody ? this.elseBody.gen() : 'null';
  return `((${this.condition.gen()}) ? (${thenPart}) : (${elsePart}))`;
};

BinaryExpression.prototype.gen = function() {
  return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
};

UnaryExpression.prototype.gen = function() {
  return `(${makeOp(this.op)} ${this.operand.gen()})`;
};

ListExpression.prototype.gen = function() {
  const jsElements = this.elements.map(e => e.gen());
  return `[${jsElements.join(',')}]`;
};

WhileStatement.prototype.gen = function() {
  return `while (${this.condition.gen()} { ${this.body.gen()} })`;
};

RepeatStatement.prototype.gen = function() {
  // Check this
  const condition = this.condition.gen();
  const body = this.body.gen();
  return `do {
    ${body}
  } while ${condition}
  `;
};

ForStatement.prototype.gen = function() {
  // check this
  const i = javaScriptId(this.index);
  const low = this.low.gen();
  const hi = javaScriptId(new VariableDeclaration('hi'));
  const preAssign = `let ${hi} = ${this.condition.gen()};`;
  const loopControl = `for (let ${i} = ${low}; ${i} <= ${hi}; ${i}++)`;
  const body = this.body.gen();
  return `${preAssign} ${loopControl} {${body}}`;
};

DictionaryExpression.prototype.gen = function() {
  const formattedKeysValues = [];
  const keyValues = this.exp.map(kv => kv.gen());
  for (let i = 0; i < this.exp.length; i++) {
    formattedKeysValues.push(keyValues[i]);
  }
  return `{ ${formattedKeysValues.join(', ')} }`;
};

CallChain.prototype.gen = function() {
  // TODO
  return ``;
};
