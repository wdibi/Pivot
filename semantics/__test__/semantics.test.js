const parse = require('../../ast/parser');
const analyze = require('../analyzer');

const program = String.raw`
num x <- 2;
x <- 5;
addFive(num a) -> num
  a <- a + 5;
  return a;
end



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

all num aa, bb, cc <- 1, 2, 3;
cc <- 20;
num task pow4 -> num default ** 4;
aa <- (44) >> pow4 >> pow4 >> pow4;

num myDogAge <- [1,2,3]:firstFactorial(2);
[num] dogAges2 <- [4,3,2,5,74]:0...3;

num yy <- [4,3,2,5,74]::find(3);

num ifShortY <- 18;
num ifShortX <- 5 when ifShortY > 5 otherwise 7;

fifth([num] a) -> num return a:5; end

{num:bool} encode <- {22: false, 2112: true, 44: true}; 
bool currEncode <- encode:22;
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
