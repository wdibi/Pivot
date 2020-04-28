const parse = require('../../ast/parser');
const generate = require('../javascript-generator');
const analyze = require('../../semantics/analyzer');
const prettyJs = require('pretty-js');

const fixture = {
  hello: [
    String.raw`print "Hello World\n";`,
    String.raw`console.log("Hello World\n");`,
  ],
  vars: [
    `num x <- 5; bool y <- !false; char z <- 'a'; x <- -12;`,
    prettyJs(`let x = 5; let y = !false; let z = "a"; x = -12;`),
  ],
  func: [
    `addFive(num x) -> num return x + 5; end num newValue <- addFive(13);`,
    prettyJs(
      `function addFive(x) { return x + 5; }; let newValue = addFive(13);`
    ),
  ],
  if: [
    `num x <- 5; if x > 5 then print x; else print "nope"; end`,
    prettyJs(`if (x > 5) { console.log(x); } else { console.log('nope'); }`),
  ],
  while: [
    `num x <- 3; while x > 0 do if x < 1 then break; end x <- x - 1; end`,
    prettyJs(`let x = 3; while(x>0) {if(x < 1) {break;}; x = x - 1;};`),
  ],
  listDec: [
    `[str] names <- ["steve", "apple"];`,
    prettyJs(`let names = ["steve", "apple"];`),
  ],
  repeat: [
    `num y <- 10; repeat print y; y <- y + 2; when y == 30 end`,
    prettyJs(
      `let y = 10; do { console.log(y); y = y + 2; } while (!(y === 30));`
    ),
  ],
  task: [
    `bool flag <- false; task negateFlag() flag <- !flag; end`,
    prettyJs(`let flag = false; function negateFlag() { flag = !flag;}`),
  ],
};
describe('The JavaScript generator', () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct output for ${name}`, done => {
      const ast = parse(source);
      analyze(ast);
      // console.log(generate(ast));
      expect(generate(ast)).toMatch(expected);
      done();
    });
  });
});
