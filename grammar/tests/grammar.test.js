/*
 * Grammar Success Test
 *
 * These tests check that our grammar accepts a program that features all of
 * syntactic forms of the language.
 */

const syntaxCheck = require("../syntax-checker");

const program = String.raw`
str name <- "Jigar";
num a <- 5;
bool over20 <- true;

{str:num} ages <- { "john":5, "tim": 69 };

[num] sorted <- [1, 5, 2, 4] << sort() << addFive();

print name;

num x <- 30;

repeat
  print x;
  x <- x - 5;
until x == -30;

task updateX(num value)
  x <- value;
end

num y <- 8 ** 8;

fibonacci(num x) -> num
    (num a, num b, num temp) <- (1, 0, 0);
    repeat
        temp <- a;
        a <- a + b;
        b <- temp;
        x <- x - 1;
    until num < 0;

    return b;
end

num x <- 25;

while x do
    print x;
    x <- x - 1;
end 
`;

describe("The syntax checker", () => {
  test("accepts the full program with all syntactic forms", done => {
    expect(syntaxCheck(program)).toBe(true);
    done();
  });
});
