import React, { useCallback } from "react";
import classes from "./TimerComponent.css"
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

const Timer = () => {
  let [sec, setSec] = useState(0);
  const [btn, setBtn] = useState("stop");
  const [time, setTime] = useState(false);

  useEffect(() => {
    const unsubscribe = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (btn === "start") {
          setSec(++sec);
        }
      });
    return () => unsubscribe.next();
  }, [btn, sec]);

  const controllers = {
    start: useCallback(() => {
      setBtn("start");
      setTime(!time);
    }, [time]),

    stop: useCallback(() => {
      setBtn("stop");
      setSec(0);
      setTime(!time);
    }, [time]),

    wait: useCallback(() => {
      setBtn("wait");
      setTime(!time);
    }, [time]),

    reset: useCallback(() => {
      setSec(0);
    }, []),
  };

  return (
    <div>
      <h1>Timer</h1>
      <div>
        <p> {new Date(sec * 1000).toISOString().substr(11, 8)}</p>
      </div>
      <div>
        {time === false ? (
          <button className="start" onClick={controllers.start}>Start</button>
        ) : (
          <button className="stop" onClick={controllers.stop}>Stop</button>
        )}
        <button className="reset" onClick={controllers.reset}>Reset</button>
        <button className="wait" onDoubleClick={controllers.wait}>Wait</button>
      </div>
    </div>
  );
};

export default Timer;
