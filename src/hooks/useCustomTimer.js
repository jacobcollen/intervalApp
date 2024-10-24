import { useState, useEffect, useRef } from "react";

const useCustomTimer = (initialTime, onTimeOver) => {
    const [time, setTime] = useState(initialTime.minutes * 60 + initialTime.seconds);
    const [running, setRunning] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (running && time > 0) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current);
                        onTimeOver();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (!running && timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [running, time, onTimeOver]);

    const startTimer = () => setRunning(true);
    const pauseTimer = () => setRunning(false);
    const resetTimer = () => {
        setRunning(false);
        setTime(initialTime.minutes * 60 + initialTime.seconds);
    };
    const setInitialTime = (newTime) => {
        setTime(newTime.minutes * 60 + newTime.seconds);
    };

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return {
        startTimer,
        pauseTimer,
        resetTimer,
        setInitialTime,
        minutes,
        seconds,
        running,
    };
};

export default useCustomTimer;
