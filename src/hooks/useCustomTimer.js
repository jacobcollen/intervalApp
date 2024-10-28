import { useState, useEffect, useRef } from "react";

const useCustomTimer = (
	initialTime,
	onTimeOver,
	intervalMode,
	onIntervalRestart
) => {
	const [time, setTime] = useState(
		initialTime.minutes * 60 + initialTime.seconds
	);
	const [running, setRunning] = useState(false);
	const [finished, setFinished] = useState(false);
	const timerRef = useRef(null);

	useEffect(() => {
		if (running) {
			timerRef.current = setInterval(() => {
				setTime((prevTime) => {
					if (prevTime <= 0) {
						if (intervalMode) {
							onIntervalRestart();
							return initialTime.minutes * 60 + initialTime.seconds;
						} else {
							clearInterval(timerRef.current);
							setFinished(true);
							onTimeOver();
							return 0;
						}
					}
					return prevTime - 1;
				});
			}, 1000);
		}

		return () => clearInterval(timerRef.current);
	}, [running, initialTime, onTimeOver, intervalMode, onIntervalRestart]);

	const startTimer = () => {
		setRunning(true);
		setFinished(false);
	};

	const pauseTimer = () => setRunning(false);

	const resetTimer = () => {
		setRunning(false);
		setFinished(false);
		setTime(initialTime.minutes * 60 + initialTime.seconds);
	};

	const setInitialTime = (newTime) => {
		setTime(newTime.minutes * 60 + newTime.seconds);
		setFinished(false);
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
		finished,
	};
};

export default useCustomTimer;
