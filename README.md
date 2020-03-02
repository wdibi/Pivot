<style>
table {
    width:100%;
}
</style>

<p align="center">
  <img src="logo.png" width="30%">
</p>

<h1 align="center">
  <a href="https://github.com/wdibi/Pivot/">
    Pivot
  </a>
</h1>
<p align="center"><strong>A new spin on programming</strong><br></p>


<p align="center">
  <a href="https://github.com/wdibi/Pivot/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="React Native is released under the MIT license." />
  </a>
  <a href="https://github.com/wdibi/Pivot/workflows/Node.js%20CI/badge.svg">
    <img src="https://github.com/wdibi/Pivot/workflows/Node.js%20CI/badge.svg" alt="Node CI status." />
  </a>
</p>

Pivot is designed to combine the simplicity of modern languages with the capabilities of functional languages. Inspired by languages like Awk, F#, Erlang, and JS, Pivot takes an impure approach with the mindset of removing the limitations of similar languages.

- **Statically typed** except for the auto type, `_`
- **Strongly typed**
- **Scripting**
- **Impure functional language**

Pivot is created by Will DiBiagio, Jigar Swaminarayan, Manny Barreto, Nicolas Raymundo.


## Contents
  - [Types](#types)
  - [Examples:](#examples-)
    + [Variable Declarations](#variable-declarations)
    + [Arithmetic](#arithmetic)
    + [Functions](#functions)
    + [If Statement](#if-statement)
    + [While Loop](#while-loop)
    + [Repeat](#repeat)
    + [Objects](#objects)
    + [Sample Program](#sample-program)
  - [License](#-license)
  
## Types
Primitive Types
* string
* boolean
* number
* list
* dict

Operators
* Add `+`
* Subtract `-`
* Multiply `*`
* Power `**`
* Divide `/`
* Modulus `%`
* Strict Equality `==`
* Less than `<`
* Greater than `>`
* Less than or equal `<=`
* Greater than or equal `>=`
* Logical AND `and`, `&&`
* Logical OR `or`, `||`

## Examples: 
### Variable Declarations
<table style="table-layout: fixed; width: 100%">
  <tr>
    <th>Pivot</th>
    <th>JavaScript</th>
  </tr>
  <tr>
  
  <td>

```text
str name <- "Jigar";
_ age <- 21;
bool below6ft <- true;
(num a, num b, num c) <- (1,2,3);
[str] animals <- ["dog", "cat", "pig"];
```
  
  </td>

  <td>
  
```javascript
let name = "Jigar"
let age = 21
let below6ft = true
let a = 5, b = 2, c = 3
let animals = ["dog", "cat", "pig"]
```

  </td>
  </tr>
</table>

### Arithmetic
<table style="table-layout: fixed">
  <tr>
  <th>Pivot</th>
  <th>JavaScript</th>
  </tr>

  <tr>
  <td>

  ```text
  a <- 3*2 + (5 ** 6) / 7;
  b <- 12 - 17 + 8;
  ```
  </td>

  <td>

  ```javascript
  a = 3*2 + (5 ** 6) / 7
  b = 12 - 17 + 8
  ```

  </td>

</table>

### Functions
<table style="table-layout: fixed">
  <tr>
  <th>Pivot</th>
  <th>JavaScript</th>
  </tr>

  <tr>
  <td>

  ```text
  add5(num x) -> num
      return x+5;
  end

  num x <- 5;
  task updateX(num value)
      x <- value;
  end
  ```
  </td>

  <td>

  ```javascript
  function add5(x) {
      return x+5;
  }

  let x = 5;
  function updateX(num) {
    x = num;
  }
  ```

  </td>

</table>

### If Statement
<table style="table-layout: fixed">
  <tr>
  <th>Pivot</th>
  <th>JavaScript</th>
  </tr>

  <tr>
  <td>

  ```text
  if x > 5
      then print "hello";
  else 
      print "bye";
  end

  if x > 5 then print x; end
  ```
  </td>

  <td>

  ```javascript
  if (x > 5) {
      console.log("hello");
  } else {
      console.log("bye");
  }

  if (x > 5) {
      console.log(x);
  }
  ```

  </td>

</table>

### For Loop
<table style="table-layout: fixed">
  <tr>
  <th>Pivot</th>
  <th>JavaScript</th>
  </tr>

  <tr>
  <td>

  ```text
  for num a <- 0; a < 2; a <- a + 1; do
      print a;
  end
  ```
  </td>

  <td>

  ```javascript
  for (let i = 0; i < 2; i++) {
    console.log(i);
  }
  ```

  </td>

</table>

### While Loop
<table style="table-layout: fixed">
  <tr>
  <th>Pivot</th>
  <th>JavaScript</th>
  </tr>

  <tr>
  <td>

  ```text
  let x <- 25;

  while x do
      print x;
      x <- x - 1;
  end
  ```
  </td>

  <td>

  ```javascript
  let x = 25;

  while (x) {
      console.log(x);
      x--;
  }
  ```

  </td>

</table>

### Repeat
<table style="table-layout: fixed">
  <tr>
  <th>Pivot</th>
  <th>JavaScript</th>
  </tr>

  <tr>
  <td>

  ```text
  let x <- 30;

  repeat
      print x;
      x <- x - 5;
  until x == -30;
  ```
  </td>

  <td>

  ```javascript
  do (
      console.log(x);
      x -= 5;
  ) while (x >= -30)
  ```

  </td>

</table>

### Dictionary
<table style="table-layout: fixed">
  <tr>
  <th>Pivot</th>
  <th>JavaScript</th>
  </tr>

  <tr>
  <td>

  ```text
  {str:num} ages <- { "john" : 5, "tim" : 6 };
  ```
  </td>

  <td>

  ```javascript
  let ages = { "john": 5, "tim" : 6 }
  ```

  </td>

</table>

### List
<table style="table-layout: fixed">
  <tr>
  <th>Pivot</th>
  <th>JavaScript</th>
  </tr>

  <tr>
  <td>

  ```text
  [str] friends <- [ "john", "tim" ];
  ```
  </td>

  <td>

  ```javascript
  let friends = ["john", "tim"];
  ```

  </td>

</table>

### Sample Program:

#### Fibonacci Pivot:
<table style="table-layout: fixed">
  <tr>
  <th>Pivot</th>
  <th>JavaScript</th>
  </tr>

  <tr>
  <td>

  ```text
  fibonacci(num x) -> num
      all num(a, b, temp) <- (1, 0, 0);

      repeat
          temp <- a;
          a <- a + b;
          b <- temp;
          x <- x - 1;
      until num < 0;

      return b;
  end
  ```
  </td>

  <td>

  ```javascript
  function fibonacci(num) {
      let a = 1, b = 0, temp;
      
      while(num >= 0) {
          temp = a;
          a = a + b;
          b = temp;
          num--;
      }
      return b;
  }
  ```

  </td>

</table>

#### Even or Odd:
<table style="table-layout: fixed">
  <tr>
  <th>Pivot</th>
  <th>JavaScript</th>
  </tr>

  <tr>
  <td>

  ```text
  evenOdd(num x) -> bool
      return x % 2 == 0;
  end
  ```
  </td>

  <td>

  ```javascript
  function evenOdd(num) {
      return x % 2 == 0;
  }
  ```

  </td>

</table>

#### Greatest Common Divisor:
<table style="table-layout: fixed">
  <tr>
  <th>Pivot</th>
  <th>JavaScript</th>
  </tr>

  <tr>
  <td>

  ```text
  gcd(num a, num b) -> num
      return a when !b otherwise gcd(b, a % b);
  end
  ```
  </td>

  <td>

  ```javascript
  function gcd(a, b) {
      return !b ? a : gcd(b, a % b);
  }
  ```

  </td>

</table>

## 📄 License

Pivot is MIT licensed, as found in the [LICENSE][l] file.

[l]: https://github.com/wdibi/Pivot/blob/master/LICENSE
