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
    `num x <- 5; bool y <- !false; char z <- 'a'; x <- -12; {str:num} age <- {} ; 
    age <- {"steve": 21, "luke": 32}; num j <- [1,2,3]::find(2); num a <- [3,4,5]:2;
    all num age1, age2, age3 <- 12, 23, 2;`,
    prettyJs(
      `let x = 5; let y = !false; let z = "a"; x = -12; let age = {}; age = {"steve": 21, "luke": 32}; 
      let j = [1,2,3].find(2); let a = [3,4,5][2]; let age1 = 12, age2 = 23, age3 = 2;`
    ),
  ],
  func: [
    `addFive(num x) -> num return x + 5; end num newValue <- addFive(13); hello() -> str return "hello world"; end hello();`,
    prettyJs(
      `function addFive(x) { return x + 5; }; let newValue = addFive(13); function hello() { return "hello world"; }; hello();`
    ),
  ],
  task: [
    `num task pow4 -> num default ** 4; num y <- (5) >> pow4 >> pow4;`,
    prettyJs(`const pow4 = (default) => default ** 4; let y = pow4(pow4(5));`),
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
    `[str] names <- ["steve", "apple", "john"]:0...1;`,
    prettyJs(`let names = ["steve", "apple", "john"].slice(0,2);`),
  ],
  repeat: [
    `num y <- 10; repeat print y; y <- y + 2; when y == 30 end`,
    prettyJs(
      `let y = 10; do { console.log(y); y = y + 2; } while (!(y === 30));`
    ),
  ],
  for: [
    `for num a <- 0; a < 10; a <- a + 1 do print a; end`,
    prettyJs(`for (let a = 0; a < 10; a = a + 1) { console.log(a); };`),
  ],
  ifShort: [
    `num y <- 18; num x <- 5 when y > 5 otherwise 7;`,
    prettyJs(`let y = 18; let x = y > 5 ? 5 : 7`),
  ],
};
describe('The JavaScript generator', () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct output for ${name}`, done => {
      const ast = parse(source);
      analyze(ast);
      expect(generate(ast)).toMatch(expected);
      done();
    });
  });
});
