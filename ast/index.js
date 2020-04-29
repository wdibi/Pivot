class Program {
  constructor(block) {
    this.block = block;
  }
}

class Block {
  constructor(statements) {
    this.statements = statements;
  }
}

class FunctionDeclaration {
  constructor(id, type, params, body) {
    Object.assign(this, { id, type, params, body });
  }
}
class FunctionCall {
  constructor(id, params) {
    Object.assign(this, { id, params });
  }
}

class CallChain {
  constructor(item, tasks) {
    Object.assign(this, { item, tasks });
  }
}
class TaskStatement {
  constructor(defaultType, id, returnType, exp) {
    Object.assign(this, { defaultType, id, returnType, exp });
  }
}

class VariableDeclaration {
  constructor(id, type, init) {
    Object.assign(this, { id, type, init });
  }
}

class IfStatement {
  constructor(condition, body, elseBody) {
    Object.assign(this, { condition, body, elseBody });
  }
}

class IfShort {
  constructor(exp, condition, alternate) {
    Object.assign(this, { exp, condition, alternate });
  }
}
// num x <- 5 when (y > 5) otherwise (x <- 7);
// Grammar -> AST/Parser -> Semantics -> Generator -> JavaScript

class WhileStatement {
  constructor(condition, body) {
    Object.assign(this, { condition, body });
  }
}

class RepeatStatement {
  constructor(body, condition) {
    Object.assign(this, { body, condition });
  }
}

class ReturnStatement {
  constructor(item) {
    this.item = item;
  }
}

class BreakStatement {
  constructor() {}
}

class ForStatement {
  constructor(init, condition, exp, body) {
    Object.assign(this, { init, condition, exp, body });
  }
}

class AssignmentStatement {
  constructor(target, source) {
    Object.assign(this, { target, source });
  }
}

class PrintStatement {
  constructor(item) {
    this.item = item;
  }
}

class KeyValuePair {
  constructor(key, value) {
    Object.assign(this, { key, value });
  }
}

class Parameter {
  constructor(type, id) {
    Object.assign(this, { type, id });
  }
}

class PrimitiveType {
  constructor(id) {
    this.id = id;
  }
}

const BoolType = new PrimitiveType('bool');
const CharType = new PrimitiveType('char');
const StringType = new PrimitiveType('string');
const NumType = new PrimitiveType('num');
const AutoType = new PrimitiveType('auto');

class ListType {
  constructor(type) {
    this.type = type;
  }
}
class DictType {
  constructor(keyType, valueType) {
    this.keyType = keyType;
    this.valueType = valueType;
  }
}

class NumRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

class Expression {}

class BooleanLiteral extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }
}

class NumericLiteral extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }
}

class StringLiteral extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }
}

class CharacterLiteral extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }
}

class IdExpression extends Expression {
  constructor(id) {
    super();
    this.id = id;
  }
}

class ListExpression extends Expression {
  constructor(elements) {
    super();
    this.elements = elements;
  }
}

class FieldExp extends Expression {
  constructor(item, functionCall) {
    super();
    Object.assign(this, { item, functionCall });
  }
}

class SubscriptedExp extends Expression {
  constructor(item, index) {
    super();
    Object.assign(this, { item, index });
  }
}

class DictionaryExpression extends Expression {
  constructor(pairs) {
    super();
    this.pairs = pairs;
  }
}

class UnaryExpression extends Expression {
  constructor(op, operand) {
    super();
    Object.assign(this, { op, operand });
  }
}

class BinaryExpression extends Expression {
  constructor(op, left, right) {
    super();
    Object.assign(this, { op, left, right });
  }
}

module.exports = {
  Program,
  Block,
  VariableDeclaration,
  AssignmentStatement,
  WhileStatement,
  Expression,
  UnaryExpression,
  BinaryExpression,
  FunctionDeclaration,
  TaskStatement,
  IfStatement,
  IfShort,
  ForStatement,
  RepeatStatement,
  PrimitiveType,
  BoolType,
  CharType,
  StringType,
  NumType,
  ListType,
  DictType,
  AutoType,
  PrintStatement,
  NumericLiteral,
  StringLiteral,
  BooleanLiteral,
  CharacterLiteral,
  IdExpression,
  FunctionCall,
  CallChain,
  ListExpression,
  DictionaryExpression,
  KeyValuePair,
  ReturnStatement,
  BreakStatement,
  Parameter,
  FieldExp,
  SubscriptedExp,
  NumRange,
};
