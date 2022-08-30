import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);

  const handleIncrement = () => {
    if (error) setError(false);
    setCount((old) => old + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((old) => (old > 0 ? old - 1 : 0));
    } else {
      setError(true);
    }
  };

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">
        The counter is currently <span data-test="count">{count}</span>
      </h1>
      {error ? (
        <div
          data-test="error-message"
          className={`error ${error ? "" : "hidden"}`}
        >
          Counter can't go below 0
        </div>
      ) : (
        ""
      )}
      <button data-test="increment-button" onClick={handleIncrement}>
        Increment counter
      </button>
      <button data-test="decrement-button" onClick={handleDecrement}>
        Decrement counter
      </button>
    </div>
  );
}

export default App;
