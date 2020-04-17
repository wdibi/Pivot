const parse = require('../../ast/parser');
const analyze = require('../analyzer');

const program = String.raw`
num x <- 2;
x <- 5;
addFive(num a) -> num
  a <- a + 5;
  return a;
end
task updateX(num value)
  if x < 2 then
    x <- value;
  else
    x <- 100;
  end
end


num y <- addFive(5);
updateX(y);

updateX(3);
print "hello" + 5;
print x + 5;
print 'a' + 5;
print 7 + 5 / 3 * 2;
print 10 - 6;
print 25 * 2;
print 20 / 4;

print !false;

print -12;

[str] friends <- [ "john", "tim" ];

print [ "john", "tim" ];

num z <- 5;
task updateByZ(num x)
  z <- x;
  break;
end
for num a <- 0; a < 2; a <- 5 do
  num x <- 5;
end

x <- 3 * 2 / 9 + 8 - 200;

x <- 10;
while x > 10 do
  x <- x - 1;
end

repeat
  x <- x + 1;
when x > 10 end

{str:num} adultAges <- { "john" : 5, "tim" : 6 };

print { "john" : 5, "tim" : 6 };

[num] listOfNums <- [1,2,3,4]; 
listOfNums <- [ 2, 3, 4 ];
listOfNums <- [];

{str:num} dogAges <- { "boomer" : 5, "bucky" : 2 };
dogAges <- { "boomer" : 99, "bucky" : 2, "buck": 20 };
dogAges <- {};

add(num x) -> num return x; end
print [1,2,3,4,5] << add(5);

five() -> num return 5; end
five();
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
