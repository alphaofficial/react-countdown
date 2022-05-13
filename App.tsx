import * as React from 'react';
import './style.css';

export default function App() {
  const [minutes, setMinutes] = React.useState<number>();
  const [seconds, setSeconds] = React.useState<number>();

  const [displayMinutes, setDisplayMinutes] = React.useState(0);
  const [displaySeconds, setDisplaySeconds] = React.useState(0);

  const [start, setStart] = React.useState<boolean>(false);

  const timerCountdown = () => {
    if (start) {
      setDisplaySeconds((prev) => prev - 1);

      if (displaySeconds === 0 && displayMinutes > 0) {
        //subtract 1 from minutes and add 59 to seconds
        setDisplayMinutes((prev) => prev - 1);
        setDisplaySeconds((prev) => prev + 60);
      }
      if (displayMinutes === 0 && displaySeconds === 0) {
        //stop timer
        setStart(false);
      }
    }
  };

  function useInterval(callback: any, delay: number) {
    const savedCallback = React.useRef(null);

    // Remember the latest callback.
    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    React.useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const startTimer = () => {
    setStart(true);
  };

  useInterval(() => {
    return timerCountdown();
  }, 1000);

  return (
    <div>
      <div>
        <div>
          <div>
            <label>Minutes</label>
            <input
              type="number"
              name="minutes"
              value={minutes}
              onChange={(e) => {
                setMinutes(e.target.valueAsNumber);
                setDisplayMinutes(e.target.valueAsNumber);
              }}
            />
          </div>

          <div>
            <label>Seconds</label>
            <input
              type="number"
              name="minutes"
              value={seconds}
              onChange={(e) => {
                setSeconds(e.target.valueAsNumber);
                setDisplaySeconds(e.target.valueAsNumber);
              }}
            />
          </div>

          <div>
            <button onClick={startTimer}>Start</button>
          </div>
          <div>
            <div>
              {displayMinutes}:{displaySeconds}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
