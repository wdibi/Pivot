const { Program, Block, VariableDeclaration } = require('../ast');
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
  check.isNotVariableTypeMismatch(this.type, this.init);
  context.add(this);
};
