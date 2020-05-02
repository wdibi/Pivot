<p align="center">
  <img src="logo.png" width="30%">
</p>

<h1 align="center">
  <a href="https://wdibi.github.io/Pivot/">
    Pivot
  </a>
</h1>
<p align="center"><strong>A new spin on programming</strong><br></p>

<p align="center">
  <a href="https://github.com/wdibi/Pivot/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="React Native is released under the MIT license." />
  </a>
  <a href="https://github.com/wdibi/Pivot/workflows/Test/badge.svg">
    <img src="https://github.com/wdibi/Pivot/workflows/Test/badge.svg" alt="Test status." />
  </a>
    <a href="https://github.com/wdibi/Pivot/workflows/ESLint/badge.svg">
    <img src="https://github.com/wdibi/Pivot/workflows/ESLint/badge.svg" alt="ESLint" />
  </a>
</p>

This is Pivot, a scripting language designed to make programming a more enjoyable experience. Pivot is developed with the user in mind and has speech-like logic syntax structure. The core team aims to build a feature rich language that can serve both expert and novice programmers alike.

Inspired by programming languages like JavaScript, F#, and Python, Pivot features syntax and semantics designed with an effort to be simple while still preserving the complex, logical features that make these languages so great.

- **Statically typed** with some auto type inference
- **Strongly typed**
- **Scripting**
- **Impure functional language**

Pivot is created by [@Will DiBiagio](https://github.com/wdibi), [@Jigar Swaminarayan](https://github.com/JigarSwam), [@Manny Barreto](https://github.com/mannybarreto) and [@Nicolas Raymundo](https://github.com/nraymundo).

## Contents

- [Contents](#contents)
- [Types](#types)
  - [Primitive Types](#primitive-types)
  - [Data types](#data-types)
- [Operators](#operators)
  - [Binary Operators](#binary-operators)
  - [Unary Operators](#unary-operators)
- [Builtins](#builtins)
  - [Math Functions](#math-functions)
- [Pivot Examples](#pivot-examples)
  - [Variable Declarations](#variable-declarations)
  - [Tasks](#tasks)
    - [Task Statement](#task-statement)
    - [Call Chain](#call-chain)
  - [Functions](#functions)
    - [Function Definition](#function-definition)
    - [Function Call](#function-call)
  - [Control Flow](#control-flow)
    - [If Then](#if-then)
    - [If Then Else](#if-then-else)
    - [Short If](#short-if)
  - [Iteration](#iteration)
    - [For Loop](#for-loop)
    - [While Loop](#while-loop)
    - [Repeat Loop](#repeat-loop)
  - [Dictionaries](#dictionaries)
    - [Dictionary Declaration](#dictionary-declaration)
    - [Dictionary Accessing](#dictionary-accessing)
    - [Dictionary Built-ins](#dictionary-built-ins)
  - [Lists](#lists)
    - [List Indexing](#list-indexing)
    - [List Built-ins](#list-built-ins)
    - [List Concatenation](#list-concatenation)
  - [JavaScript Comparison](#javascript-comparison)
    - [Find Minimum Element](#find-minimum-element)
      - [Pivot](#pivot)
      - [JavaScript](#javascript)
    - [Fibonacci](#fibonacci)
      - [Pivot](#pivot-1)
      - [JavaScript](#javascript-1)
    - [Even or Odd](#even-or-odd)
      - [Pivot](#pivot-2)
      - [JavaScript](#javascript-2)
    - [Greatest Common Divisor](#greatest-common-divisor)
      - [Pivot](#pivot-3)
      - [JavaScript](#javascript-3)
    - [First Factorial](#first-factorial)
      - [Pivot](#pivot-4)
      - [JavaScript](#javascript-4)
- [Semantic Errors](#semantic-errors)
- [Optimizations](#optimizations)
- [📄 License](#%f0%9f%93%84-license)

## Types

### Primitive Types

- Strings: `str`
- Characters: `char`
- Booleans: `bool`
- Numbers: `num`
- Auto: `_`

### Data types
- Lists: `[type]`
- Dictionaries: `{type:type}`

## Operators

### Binary Operators

| Operation                  |   Type Compatibility    |
| -------------------------- | :---------------------: |
| Add `+`                    | Strings, Numbers, Lists |
| Subtract `-`               |         Numbers         |
| Multiply `*`               |         Numbers         |
| Power `**`                 |         Numbers         |
| Divide `/`                 |         Numbers         |
| Modulus `%`                |         Numbers         |
| Strict Equality `==`       | Strings, Numbers, Lists |
| Less than `<`              |    Strings, Numbers     |
| Greater than `>`           |    Strings, Numbers     |
| Less than or equal `<=`    |    Strings, Numbers     |
| Greater than or equal `>=` |    Strings, Numbers     |
| Logical AND `and`, `&&`    |        Booleans         |
| Logical OR `or`, `\|\|`    |        Booleans         |

### Unary Operators
| Operation           | Type Compatibility |
| ------------------- | :----------------: |
| Negative `-`        |      Numbers       |
| Negation `!`, `not` |      Booleans      |

## Builtins

### Math Functions

- Absolute Value: `abs(num)`
- Pi: `pi()`
- Random: `random(lowerBound, upperBound)`

## Comments
- Single line: `//`
- Multi-line: `/* */`

## Pivot Examples

### Variable Declarations

```text
str name <- "Jigar";
_ age <- 21;
bool below6ft <- true;
[str] animals <- ["dog", "cat", "pig"];
all num a, b, c <- 1, 2, 3;
{str:num} ages <- {"john" : 5, "tim" : 6};
```

### Tasks

#### Task Statement
```text
num pow4 -> num default ** 4;
```

#### Call Chain
Call chain with a built-in task or user defined task

```text
print (-33) >> abs >> pow4;
```

### Functions

#### Function Definition
```text
add5(num x) -> num
    return x + 5;
end
```

#### Function Call
```text
add5(10);
```

### Control Flow

#### If Then
```text
num x <- 3.1415;
if x > 3 then print "larger than 3"; end
```

#### If Then Else
```text
num x <- 3.1415;
if x > 3 then 
  print "larger than 3";
else
  print "less than 3";
end
```

#### Short If

```text
num x <- 32102123;
str msg <- "hello" when x % 3 == 2 otherwise "bye";
```

### Iteration

#### For Loop
```text
for num x <- 0; x <= 10; x <- x + 1 do
    print x;
end
```

#### While Loop
```text
num x <- 25;
while x do
    print x;
    x <- x - 1;
end
``` 

#### Repeat Loop
```text
num x <- 30;
repeat
    print x;
    x <- x - 5;
when x == -30 end
```

### Dictionaries

#### Dictionary Declaration
```text
{str:num} ages <- {"john" : 5, "tim" : 6};
```

#### Dictionary Accessing 
```text
ages:"john" // 5
```
#### Dictionary Built-ins
Yet to be implemented
- `contains(keyId)` contains key
- `del(keyId)` delete pair by key
- `keys` list of keys
- `values` list of values

```text
ages::keys                // ["john", "tim"]
ages::contains("michael") // false
ages::del("john")         // {"tim" : 6}
ages::contains("john")    // false
```
  
### Lists
```text
[str] friends <- [ "john", "tim", "steve" ];
```

#### List Indexing
```text
friends:1
friends:1...3
```

#### List Built-ins
Yet to be implemented
- `head` first element
- `tail` last element
- `len` number of elements
- `find(elemId)` index of element

```text
friends::head      // "john"
friends::tail      // "steve"
friends::len       // 3
friends::find(tim) // 1
```

#### List Concatenation
```text
[str] friends <- ["john", "tim"];
friends <- friends + ["alex", "sasha"];
print friends;                           // ["john", "tim", "alex", "sasha"]
```

### JavaScript Comparison

#### Find Minimum Element
##### Pivot
```text
findMin([num] arr, num low, num high) -> num
    if high < low then return arr:0; end

    if high == low then return arr:low; end

    num mid <- (low + high)/2;

    if mid < high and arr:mid+1 < arr:mid then
      return arr:mid+1;
    end

    if mid > low and arr:mid < arr:mid-1 then
      return arr:mid;
    end

    if arr:high > arr:mid then return findMin(arr, low, mid - 1); end

    return findMin(arr, mid + 1, high);
end
```
##### JavaScript
```javascript
function findMin(arr, low, high) {
  if (high < low) {
    return arr[0] 
  }

  if (high == low) {
    return arr[low] 
  } 

  let mid = (low + high)/2

  if (mid < high && (arr[mid+1] < arr[mid])) {
    return arr[mid+1]
  } 

  if (mid > low && (arr[mid] < arr[mid - 1])) {
    return arr[mid]
  }

  if (arr[high] > arr[mid]) {
    return findMin(arr, low, mid-1) 
  }
  return findMin(arr, mid+1, high) 
}
```
#### Fibonacci

##### Pivot
```text
fibonacci(num x) -> num
    all num a, b, temp <- 1, 0, 0;
    
    repeat
        temp <- a;
        a <- a + b;
        b <- temp;
        x <- x - 1;
    when x == 0 end
    return b;
end
```

##### JavaScript
```javascript
function fibonacci(x) {
    let a = 1, b = 0, temp = 0;
    do {
        temp = a;
        a = a + b;
        b = temp;
        x--;
    }
    while (!(x === 0));
    return b;
};
```

#### Even or Odd

##### Pivot
```text
evenOdd(num x) -> bool
    return x % 2 == 0;
end
```

##### JavaScript
```javascript
function evenOdd(x) {
  return x % 2 == 0;
}
```

#### Greatest Common Divisor

##### Pivot
```text
gcd(num a, num b) -> num
    return a when !b otherwise gcd(b, a % b);
end
```

##### JavaScript
```javascript
function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}
```

#### First Factorial

##### Pivot
```text
firstFactorial(num x) -> num
    if x == 0 or x == 1 then return 1; end
    return x * firstFactorial(x - 1);
end
```

##### JavaScript
```javascript
function firstFactorial(x) {
  if (x == 0 || x == 1) {
    return 1;
  }
  return x * firstFactorial(x - 1);
}
```

## Semantic Errors 
- Type mismatch in declaration
- Variable already declared
- Variable assignment type mismatch
- Variable not yet declared
- Non-existing function call
- Incorrect number of function parameters
- Mismatched function return type
- Types are not compatible
- Function missing return statement
- Arithmetic with undefined variable
- Invalid types used with addition
- Invalid types used with multiplication
- Invalid types used with subtraction
- Invalid types used with division
- Incorrect use of unary operator
- Inconsistent list types
- Invalid variable type
- Break outside of loops or task
- Deterministic condition
- Invalid dict types
- Unreachable statement
- Inconsistent dict expression types

## Optimizations

### Unary Expression
- Simplifying negation on a `NumericLiteral`
- Simplifying negation on a`BooleanLiteral`

### Binary Expressions
- Simplifying arithmetic
- Simplifying boolean and/or operations

### IfShort
- Returning either the `expression` or `alternate` if the `condition` can be evaulated

### While
- No op optimization


## 📄 License

Pivot is MIT licensed, as found in the [LICENSE][l] file.

[l]: https://github.com/wdibi/Pivot/blob/master/LICENSE
