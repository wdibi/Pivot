const parse = require('../../ast/parser');
const analyze = require('../analyzer');

const program = String.raw`
num z <- 0;
task updateZ()
  z <- 5;
  break;
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
