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



str name <- "Jigar";
// _ age <- 21;
bool below6ft <- true;
all num a,b,c <- 1,2,3;
[str] animals <- ["dog", "cat", "pig"];
{str:num} friendsAges <- { "john" : 5, "tim" : 6 };

num equation <- 0;
equation <- 3*2 + (5 ** 6) / 7;

num b <- 0;
b <- 12 - 17 + 8;

add5(num x) -> num
    return x+5;
end
num testParam <- 5;
task updateNum(num value)
  testParam <- value;
end

if x > 5
    then print "hello";
else
    print "bye";
end

if x > 5 then print x; end

for num i <- 0; i < 2; i <- i + 1 do
    print i;
end

num g <- 25;

while g do
    print g;
    g <- g - 1;
end

num p <- 30;
repeat
    print p;
    p <- p - 5;
when p == -30 end
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
