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
  constructor(item, methods) {
    Object.assign(this, { item, methods });
  }
}
class TaskDeclaration {
  constructor(id, params, body) {
    Object.assign(this, { id, params, body });
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

class BasicType {
  constructor(name) {
    this.name = name;
  }
}

const BoolType = new BasicType("bool");
const CharType = new BasicType("char");
const StringType = new BasicType("string");
const NumType = new BasicType("num");
const AutoType = new BasicType("auto");

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
  constructor(name) {
    super();
    this.name = name;
  }
}

class ListExpression extends Expression {
  constructor(elements) {
    super();
    this.elements = elements;
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
  TaskDeclaration,
  IfStatement,
  ForStatement,
  RepeatStatement,
  BasicType,
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
};
