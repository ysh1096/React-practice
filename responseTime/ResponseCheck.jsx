import React, { useState } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('click to start');
  const [result, setResult] = useState([]);
  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('click on green');
      timeOut.current = setTimeout(() => {
        setState('now');
        setMessage('click now');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      clearTimeout(timeOut.current);
      setState('waiting');
      setMessage('too early, try agin');
    } else if (state === 'now') {
      endTime.current = new Date();
      setState('waiting');
      setMessage('Click to Start');
      setResult((prevState) => {
        return [...prevState, this.endTime - this.startTime];
      });
    }
  };

  const onReset = () => {
    setResult([]);
  };
  const renderAverage = () => {
    const { result } = state;
    return state.result.length === 0 ? null : (
      <>
        <div>Average Time: {state.result.reduce((a, c) => a + c) / state.result.length}ms</div>
        <button onClick={onReset}>Reset</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state.state} onClick={onClickScreen}>
        {state.message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;
