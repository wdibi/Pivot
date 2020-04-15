const parse = require('../../ast/parser');
const analyze = require('../analyzer');

const program = String.raw`
num x <- 2;
x <- 5;

addFive(num a) -> num
  return 5;
end

num y <- addFive(5);`;

describe('The semantic analyzer', () => {
  test('accepts the mega program with all syntactic forms', done => {
    const astRoot = parse(program);
    expect(astRoot).toBeTruthy();
    analyze(astRoot);
    expect(astRoot).toBeTruthy();
    done();
  });
});
