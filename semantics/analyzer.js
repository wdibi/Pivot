const {
  Program,
  Block,
  VariableDeclaration,
  NumericLiteral,
  StringLiteral,
  BooleanLiteral,
  CharacterLiteral,
} = require('../ast');
const { NumType, StringType, BoolType, CharType } = require('../ast');
const check = require('./check');
const Context = require('./context');

module.exports = (exp) => exp.analyze(Context.INITIAL);

Program.prototype.analyze = function(context) {
  this.block.analyze(context);
};

Block.prototype.analyze = function(context) {
  const localContext = context.createChildContextForBlock();
  this.statements.forEach((s) => s.analyze(localContext));
};

VariableDeclaration.prototype.analyze = function(context) {
  this.init.analyze(context);
  check.isNotVariableTypeMismatch(this.type, this.init);
  context.add(this);
};

NumericLiteral.prototype.analyze = function() {
  this.type = NumType;
};

StringLiteral.prototype.analyze = function() {
  this.type = StringType;
};

BooleanLiteral.prototype.analyze = function() {
  this.type = BoolType;
};

CharacterLiteral.prototype.analyze = function() {
  this.type = CharType;
};
