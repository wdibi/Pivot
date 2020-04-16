const parse = require('../../ast/parser');
const analyze = require('../analyzer');

const program = String.raw`
num x <- 2;
x <- 5;
addFive(num a) -> num
  return 5;
end
task updateX(num value)
  if x < 2 then
    x <- value;
  else
    x <- 100;
  end
end
updateX(3);
num z <- addFive(5);
task updateByZ(num x)
  x <- z;
  break;
end
for num a <- 0; a < 2; a <- 5 do
  num y <- 5;
  x <- y;
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
