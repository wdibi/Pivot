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

class TaskDeclaration {
  constructor(id, params, body) {
    Object.assign(this, { id, params, body });
  }
}

class VariableDeclaration {
  constructor(id, type) {
    Object.assign(this, { id, type });
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
  constructor(expression) {
    this.expression = expression;
  }
}

class Type {
  constructor(name) {
    this.name = name;
  }
}

const BoolType = new Type("bool");
const CharType = new Type("char");
const StringType = new Type("string");
const NumType = new Type("num");
const ListType = new Type("list");
const DictType = new Type("dict");
const AutoType = new Type("auto");

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
  Type,
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
};
