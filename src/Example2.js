import React, { useState, useRef, useEffect } from "react";

export default function Example2() {
  const [test, setTest] = useState(0);
  const [counter, setCounter] = useState(0);
  const [repos, setRepos] = useState([]);

  const prevCounterRef = useRef(counter);
  const prevCounter = prevCounterRef.current;

  useEffect(() => {
    async function requestUser() {
      const response = await fetch(
        "https://api.github.com/users/joaaoeu/repos"
      );
      setRepos(await response.json());
    }

    requestUser();
  }, []);

  useEffect(() => {
    document.title = `Example2 - Test clicked ${test} ${
      test === 1 ? "time" : "times"
    }`;
  }, [test]);

  useEffect(() => {
    prevCounterRef.current = counter;
    document.title = `Example2 - Counter: ${counter}`;
  }, [counter]);

  return (
    <>
      <h1>{`Example2 - Counter: ${counter}`}</h1>
      <h2>{`Example2 - Prev Counter Ref: ${prevCounter}`}</h2>
      <h3>{`Example2 - Test clicked ${test} ${
        test === 1 ? "time" : "times"
      }`}</h3>
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <button onClick={() => counter > 0 && setCounter(counter - 1)}>-</button>
      <button onClick={() => setTest(test + 1)}>Test</button>
      {repos.map(repo => (
        <p key={repo.id}>{repo.name}</p>
      ))}
    </>
  );
}
