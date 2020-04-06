import React from "react";
import { Card } from "semantic-ui-react";

import "./Code.css";

const Code = () => {
  return (
    <div className="code-container">
      <div className="code-header">
        <h1 className="code-main-title">Code Examples</h1>
        <hr className="horizontal-line" />
      </div>
      <div className="code-list">
        <div className="snippet-container">
          <Card className="code-box">
            <Card.Content className="code-content">
              <Card.Header className="snippet-title">Even or Odd</Card.Header>
              <Card.Description className="snippet-code">
                <pre>
                  {`evenOdd(num x) -> bool`}
                  <br />
                  {`    return x % 2 == 0;`}
                  <br />
                  {`end`}
                </pre>
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
        <div className="snippet-container">
          <Card className="code-box">
            <Card.Content className="code-content">
              <Card.Header className="snippet-title">
                Greatest Common Denominator
              </Card.Header>
              <Card.Description className="snippet-code">
                <pre>
                  {`gcd(num a, num b) -> num`}
                  <br />
                  {`    return a when !b otherwise gcd(b, a % b);`}
                  <br />
                  {`end`}
                </pre>
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
        <div className="snippet-container">
          <Card className="code-box">
            <Card.Content className="code-content">
              <Card.Header className="snippet-title">Fibonacci</Card.Header>
              <Card.Description className="snippet-code">
                <pre>
                  {`fibonacci(num x) -> num`}
                  <br />
                  {`    all num a, b, temp <- 1, 0, 0;`}
                  <br />
                  {`    repeat`}
                  <br />
                  {`        temp <- a;`}
                  <br />
                  {`        a <- a + b;`}
                  <br />
                  {`        b <- temp;`}
                  <br />
                  {`        x <- x - 1;`}
                  <br />
                  {`    until num < 0;`}
                  <br />
                  {`    return b;`}
                  <br />
                  {`end`}
                </pre>
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
        <div className="snippet-container">
          <Card className="code-box">
            <Card.Content className="code-content">
              <Card.Header className="snippet-title">
                First Factorial
              </Card.Header>
              <Card.Description className="snippet-code">
                <pre>
                  {`firstFactorial(num x) -> num`}
                  <br />
                  {`    if x == 0 or x == 1`}
                  <br />
                  {`        then return 1;`}
                  <br />
                  {`    else`}
                  <br />
                  {`        return x * firstFactorial(x - 1);`}
                  <br />
                  {`end`}
                </pre>
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Code;
