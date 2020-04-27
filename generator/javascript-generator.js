const prettyJs = require("pretty-js");
const util = require("util");

const {
  Program,
  Block,
  VariableDeclaration,
  IdExpression,
  NumericLiteral,
  StringLiteral,
  BooleanLiteral,
  CharacterLiteral,
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
  PrintStatement,
  ListExpression,
  WhileStatement,
  RepeatStatement,
  ForStatement,
  DictType,
  ListType,
  DictionaryExpression,
  CallChain,
  AutoType,
} = require('../ast');

const Context = require('../semantics/context');
const { NumType, StringType, BooleanType } = require("../semantics/builtins");

function makeOp(op) {
  return (
    { not: "!", and: "&&", or: "||", "==": "===", "!=": "!=" }[op] // add <, >, <=, >=
    || op
  );
}
// how to do these with dot functions (e.g: string.substring(start, end))
const builtin = {
    print([s]) { // Wondering about the use of brackets here, is this just how its done? We looked at Casper for some help here
        return `console.log(${s})`;
    },
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
      return `Math.floor(Math.random(${s}) * ${e})`
      // return `Math.floor(Math.random() * (Math.max(${s}, ${e}) - Math.min(${s}, ${e}) + 1) + Math.min(${s}, ${e}))`;
    },
    pow([x, y]) {
      return `Math.pow(${x}, ${y})`;
    },
    add([d, n]) { // not sure how to go about this one
      return ``
    },
    remove([d, k]) {
      return `delete ${d}.${k}`
    },
    update([d, k, v]) {
      return `${d}.${k} = ${v}`
    },
    getValue([d, k]) {
      return `${d}.${k}`
    },
    keys([d]) {
      return `Object.keys(${d})`
    },
    values([d]) {
      return `Object.values(${d})`
    },
    items([d]) {
      return `Object.entries(${d})`
    },
    // -- List Functions Below
    prepend([l, element]) {
      return `${l}.unshift(${element})`
    },
    append([l, element]) {
      return `${l}.push(${element})`
    },
    insert([l, index, element]) {
      return `${l}.splice(${index}, 0, ${element})`
    },
    remove([l, index]) {
      return `${l}.splice(${index}, 1)`
    },
}