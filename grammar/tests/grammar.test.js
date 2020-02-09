/*
 * Grammar Success Test
 *
 * These tests check that our grammar accepts a program that features all of
 * syntactic forms of the language.
 */

const syntaxCheck = require("../syntax-checker");

const program = String.raw`
let name <- "Jigar";
let a <- 5;
let over20 <- true;

let circle <- { color: "red", radius: 5 };
print name;

let x <- 30;

repeat
  print x;
  x <- x - 5;
until x == -30;

task updateX(value)
  x <- value;
end

let y <- 8 ** 8;

func fibonacci(num)
  let (a,b,temp) <- (1, 0, 0);

  repeat
    temp <- a;
    a <- a + b;
    b <- temp;
    num <- num - 1;
  until num < 0;
  return b;
  end

let x <- 25;
  while x do
    print x;
    x <- x - 1;
end 
`

describe("The syntax checker", () => {
  test("accepts the full program with all syntactic forms", done => {
    expect(syntaxCheck(program)).toBe(true);
    done();
  });
});