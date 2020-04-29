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
_ age <- 21;
bool below6ft <- true;
[str] animals <- ["dog", "cat", "pig"];
all num q,w,s <- 1,2,3;
{str:num} ages <- { "john" : 5, "tim" : 6 };

q <- 3*2 + (5 ** 6) / 7;
w <- 12 - 17 + 8;

add5(num x) -> num
    return x+5;
end

num t <- 5;
task updateNum(num value)
    t <- value;
end

if x > 5
    then print "hello";
else
    print "bye";
end

if x > 5 then print x; end

for num l <- 0; l < 2; l <- l + 1 do
    print l;
end

num testNum <- 25;

while testNum do
    print testNum;
    testNum <- testNum - 1;
end

num k <- 30;

repeat
    print k;
    k <- k - 5;
when k == -30 end

all num aa, bb, cc <- 1, 2, 3;
cc <- 20;

all _ day, isYear2020 <- "04162020", true;
str double <- day + day;
isYear2020 <- false;

firstFactorial(num x) -> num
    if x == 0 or x == 1 then
        return 1;
    else
        return x * firstFactorial(x - 1);
    end
end

recurse(num x) -> num
    if x != 0 then
        recurse(x - 1);
    else
        return 1;
    end
end

fibonacci(num x) -> num
    all num a,b,temp <- 1,0,0;

    repeat
        temp <- a;
        a <- a + b;
        b <- temp;
        x <- x - 1;
    when x < 0 end

    return b;
end

evenOdd(num x) -> bool
    return x % 2 == 0;
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
