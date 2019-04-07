import React, { useReducer, useRef, useEffect } from "react";

const INITIAL_STATE = {
  test: 0,
  counter: 0
};

function stateReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + 1 };
    case "decrement":
      return state.counter > 0
        ? { ...state, counter: state.counter - 1 }
        : state;
    case "test":
      return { ...state, test: state.test + 1 };
    default:
      return state;
  }
}

export default function Example1() {
  const [state, dispatch] = useReducer(stateReducer, INITIAL_STATE);
  const { test, counter } = state;

  const prevCounterRef = useRef(counter);
  const prevCounter = prevCounterRef.current;

  useEffect(() => {
    document.title = `Example1 - Test clicked ${test} ${
      test === 1 ? "time" : "times"
    }`;
  }, [test]);

  useEffect(() => {
    prevCounterRef.current = counter;
    document.title = `Example1 - Counter: ${counter}`;
  }, [counter]);

  return (
    <>
      <h1>{`Example1 - Counter: ${counter}`}</h1>
      <h2>{`Example1 - Prev Counter Ref: ${prevCounter}`}</h2>
      <h3>{`Example1 - Test clicked ${test} ${
        test === 1 ? "time" : "times"
      }`}</h3>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "test" })}>Test</button>
    </>
  );
}
