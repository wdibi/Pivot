/*
 * Grammar Error Tests
 *
 * These tests check that our grammar will reject programs with various
 * syntax errors.
 */

const syntaxCheck = require('../syntax-checker');

const errors = [
  ['keyword as id', 'else := 5'],
  ['unclosed paren', 'let var x := (2 * 3 in end'],
  ['unknown operator', 'x := 2 ** 5'],
  ['chained relational operators', '1 < 3 < 5'],
  ['bad unicode escape', '"ab\\u{1f4%a9}c"'],
  ['bad escape', '"ab\\q"'],
  ['bad character in id', '$x := 1'],
];

const programFail = String.raw`
var name = "Jigar";
const a = 5;
int over20 <- true;

let circle = { color: "red", radius: 5 }
print(name);

let x = 30;

do {
  print(x)
  x = x-5
} while (x >= 30)

function fibonacci(num) {
  let a = 1, b = 0, temp

  while(num >= 0) {
    temp = a
    a = a + b;
    b = temp;
    num--
  }
  return b;
}

let x = 25;
  while x do
    print x;
    x = x - 1;
end

let x = 25;
  while (x) {
    System.out.println(x)
    x -= 1
  }
`;

describe('The syntax checker', () => {
  errors.forEach(([scenario, program]) => {
    test(`detects the error ${scenario}`, done => {
      expect(syntaxCheck(program)).toBe(false);
      done();
    });
  });
});

describe('Check full program for failure', () => {
  test(`detects the error ${programFail}`, done => {
    expect(syntaxCheck(programFail)).toBe(false);
    done();
    });
});
