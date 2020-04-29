/*
 * Grammar Success Test
 *
 * These tests check that our grammar accepts a program that features all of
 * syntactic forms of the language.
 */

const syntaxCheck = require('../syntax-checker');

const program = String.raw`
// a comment at the beginning of a program
str name <- "Jigar";
num a <- 5;
bool over20 <- true;
all str a, b, c <- "hi", "bye", "goodnight";
{str:num} ages <- { "john" : 5, "tim" : 6 };
[num] sorted <- [1, 5, 2, 4] >> sort >> addFive;
print name;
num x <- 30;

// this is a comment

num task addFive -> num default + 5;
num x <- 0;
x <- 5 >> addFive >> addFive;

/* This is a 

Multiline comment */

fibonacci(num x) -> num
    all num a, b, temp <- 1, 0, 0;
    repeat
        temp <- a;
        a <- a + b;
        // a comment in the middle of a function
        b <- temp;
        x <- x - 1;
    when num < 0 end
    return b;
end
num x <- 25;
for num a <- 0; a < 2; a <- a + 1 do
  /* This is a 
  Multiline comment within a for loop */
    print a;
end
while x do
    print x;
    x <- x - 1;
end
x <- addFive(3);
_ z <- sqrt >> round;
// a comment at the end of the program
`;

describe('The syntax checker', () => {
  test('accepts the full program with all syntactic forms', done => {
    expect(syntaxCheck(program)).toBe(true);
    done();
  });
});
