#!/usr/bin/env node

const { argv } = require('yargs')
  .usage('$0 [-a] [-o] [-i] filename')
  .boolean(['a', 'o', 'i'])
  .describe('a', 'show abstract syntax tree after parsing then stop')
  .describe('o', 'do optimizations')
  .describe('i', 'generate and show the intermediate code then stop')
  .demand(1);

const fs = require('fs');
const util = require('util');
const { exec } = require('child_process');
const parse = require('./ast/parser');
const view = require('./semantics/viewer');
const analyzer = require('./semantics/analyzer');
// const optimizer = require('./semantics/optimizer');
// require(`./backend/${argv.target}generator`);

fs.readFile(argv._[0], 'utf-8', (error, text) => {
  if (error) {
    console.error(error);
    return;
  }
  let program = parse(text);
  if (argv.a) {
    console.log(util.inspect(program, { depth: null }));
    return;
  }
  if (argv.i) {
    exec('nodemon graph/server.j');
    view(program);
    exec('open http://localhost:5000');
    console.log('ctrl-c to kill');
    process.on('SIGINT', function() {
      exec('kill -9 $(lsof -t -i:5000)');
      console.log('\nbye');
    });
    return;
  }
  if (argv.o) {
    console.log(util.inspect(analyzer(program), { depth: null }));
  }
  // if (argv.i) {
  //   console.log(util.inspect(program, { depth: null }));
  //   return;
  // }
  // program.gen();
});
