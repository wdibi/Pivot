const {
  mathFunctions,
  listFunctions,
  dictFunctions,
  BoolType,
  CharType,
  StringType,
  NumType,
  AutoType,
} = require('./builtins');

require('./analyzer');

class Context {
  constructor({ parent = null, currentFunction = null, inLoop = false } = {}) {
    Object.assign(this, {
      parent,
      currentFunction,
      inLoop,
      locals: new Map(),
    });
  }

  createChildContextForFunctionBody(currentFunction) {
    currentFunction.functionType = 'function';
    // When entering a new function, we're not in a loop anymore
    return new Context({ parent: this, currentFunction, inLoop: false });
  }

  createChildContextForLoop() {
    // When entering a loop body, just set the inLoop field, retain others
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: true,
    });
  }

  createChildContextForBlock() {
    // For a block, we have to retain both the function and loop settings.
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: this.inLoop,
    });
  }

  // Adds a declaration to this context.
  add(declaration) {
    declaration.id = declaration.id.id || declaration.id; // I know, this needs to be fixed...
    if (this.locals.has(declaration.id)) {
      throw new Error(`${declaration.id} already declared in this scope`);
    }
    const entity = declaration;
    entity.currentValue = declaration.init;
    this.locals.set(declaration.id, entity);
  }

  // Returns the entity bound to the given identifier, starting from this
  // context and searching "outward" through enclosing contexts if necessary.
  lookup(id) {
    for (let context = this; context !== null; context = context.parent) {
      if (context.locals.has(id)) {
        return context.locals.get(id);
      }
    }
    throw new Error(`Identifier ${id} has not been declared`);
  }
}

Context.INITIAL = new Context();

[
  BoolType,
  CharType,
  StringType,
  NumType,
  AutoType,
  ...mathFunctions,
  ...listFunctions,
  ...dictFunctions,
].forEach(entity => {
  Context.INITIAL.add(entity);
});

module.exports = Context;
