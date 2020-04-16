const parse = require('../../ast/parser');
const analyze = require('../analyzer');

const program = String.raw`
for num a <- 0; a < 2; a <- 5 do
  num x <- 5;
end
`;

describe('The semantic analyzer', () => {
  test('accepts the mega program with all syntactic forms', done => {
    const astRoot = parse(program);
    expect(astRoot).toBeTruthy();
    analyze(astRoot);
    expect(astRoot).toBeTruthy();
    done();
  });
});
