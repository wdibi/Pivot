# Rehacked: ReactJS revisited.ReactJS revisited.

## Introduction

## Features

## Examples
<table style="table-layout: fixed; width: 100%">
  <tr>
  <th>Rehacked</th>
  <th>React</th>
  </tr>

  <tr>
  <td>

```javascript
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './styles.css'

Component App:
    States:
        count: 0
    
    Props:

    Events:
        onIncrement():
            setCount(count++)
        onDecriment():
            setCount(count--)

    Effects:

    Render:
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>You clicked {count} times!</h2>

            <button onClick={() => onIncrement()}>Decrement</button>
            <button onClick={() => onDecriment()}>Increment</button>
        </div>

ReactDOM.render(<App />, rootElement)
```

  </td>

  <td>

```javascript
import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>You clicked {count} times!</h2>

      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

  </td>

  </tr>
</table>