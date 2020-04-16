const parse = require('../../ast/parser');
const analyze = require('../analyzer');

const program = String.raw`
print {"cows": true, "pigs": 1};
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
