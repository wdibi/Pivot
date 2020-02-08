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
RootComponent App:
    imports:
        './styles.css'
    
    states:
        count: 0
    
    props:

    actions:
        onIncrement():
            setCount(count++)
        onDecrement():
            setCount(count--)

    events:
    
    effects:

    render:
        <div className="App">
            <h2>You clicked {count} times!</h2>
            <button onClick={() => onIncrement()}>Decrement</button>
            <button onClick={() => onDecrement()}>Increment</button>
        </div>
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