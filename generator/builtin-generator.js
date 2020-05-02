const builtin = {
  // List
  find([n]) {
    return `.find(${n})`; // array.find(n) ?
  },
  head() {
    return ``; // array[0] what to put for 'array'
  },
  tail() {
    return ``; // array.slice(1) what to put for 'array'
  },
  len() {
    return `.length`;
  },
  push([n]) {
    return ``; // array.push(n) what to put for 'array'
  },
  pop([n]) {
    return ``; // array.pop() what to put for 'array' or .pop()
  },
  unshift([n]) {
    return ``; // array.unshift(n) what to put for 'array' or just do '.unshift(${n})'
  },
  shift() {
    return ``; // array.shift() what to put for 'array' or just do '.shift()'
  },

  // Dict
};
