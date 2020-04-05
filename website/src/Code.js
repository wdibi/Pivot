import React from "react";

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
          <h1 className="snippet-title">Even or Odd</h1>
          {/* <hr className="horizontal-line-projects" /> */}
          <pre>{`
            evenOdd(num x) -> bool
                return x % 2 == 0;
            end
          `}</pre>
        </div>
        <div className="snippet-container">
          <h1 className="snippet-title">Greatest Common Divisor</h1>
          {/* <hr className="horizontal-line-projects" /> */}
          <pre>
            {`
            gcd(num a, num b) -> num
                return a when !b otherwise gcd(b, a % b);
            end
            `}
          </pre>
        </div>
        <div className="snippet-container">
          <h1 className="snippet-title">Fibonacci</h1>
          {/* <hr className="horizontal-line-projects" /> */}
          <pre>
            {`
            fibonacci(num x) -> num
                all num a, b, temp <- 1, 0, 0;
                repeat
                    temp <- a;
                    a <- a + b;
                    b <- temp;
                    x <- x - 1;
                until num < 0;
                return b;
            end
            `}
          </pre>
        </div>
        <div className="snippet-container">
          <h1 className="snippet-title">First Factorial</h1>
          {/* <hr className="horizontal-line-projects" /> */}
          <pre>
            {`
            firstFactorial(num x) -> num
                if x == 0 or x == 1
                    then return 1;
                else
                    return x * firstFactorial(x - 1);
            end
            `}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Code;
