import { useRef, useState } from "react";
import Button from "./Button";
import caretLeft from "../assets/icons/caret-left.svg";
import caretRight from "../assets/icons/caret-right.svg";
import "../styles/SetTimer.css";

const SetTimer = ({ time, setTime, onStart }) => {
	const holdIntervalRef = useRef(null);
	const [showWarning, setShowWarning] = useState(false);
	const [activeChevron, setActiveChevron] = useState(null);

	const startHold = (chevron, callback) => {
		setActiveChevron(chevron);
		holdIntervalRef.current = setInterval(callback, 25);
	};

	const stopHold = () => {
		clearInterval(holdIntervalRef.current);
		holdIntervalRef.current = null;
		setTimeout(() => setActiveChevron(null), 20);
	};

	const scaleDown = (chevron) => {
		setActiveChevron(chevron);
		setTimeout(() => setActiveChevron(null), 100);
	};

	const handleMouseDown = (chevron, callback) => {
		scaleDown(chevron);
		startHold(chevron, callback);
	};

	const handleClick = (chevron, callback) => {
		scaleDown(chevron);
		callback();
	};

	const incrementSeconds = () =>
		setTime((prev) => ({
			...prev,
			seconds: prev.seconds < 59 ? prev.seconds + 1 : 0,
			minutes: prev.seconds === 59 ? prev.minutes + 1 : prev.minutes,
		}));

	const decrementSeconds = () =>
		setTime((prev) => {
			if (prev.minutes === 0 && prev.seconds === 0) {
				return prev;
			}
			return {
				...prev,
				seconds: prev.seconds > 0 ? prev.seconds - 1 : 59,
				minutes:
					prev.seconds === 0 && prev.minutes > 0
						? prev.minutes - 1
						: prev.minutes,
			};
		});

	const isTimeZero = time.minutes === 0 && time.seconds === 0;

	const handleStart = () => {
		if (isTimeZero) {
			setShowWarning(true);
			setTimeout(() => setShowWarning(false), 1500);
			return;
		}
		onStart();
	};

	return (
		<div className="container">
			<div className="container__middle">
				<div className="set-timer">
					<div className={`time-control ${showWarning ? "shake" : ""}`}>
						<img
							src={caretLeft}
							alt="Decrease Seconds"
							onMouseDown={() => handleMouseDown("left", decrementSeconds)}
							onMouseUp={stopHold}
							onMouseLeave={stopHold}
							onTouchStart={() => handleMouseDown("left", decrementSeconds)}
							onTouchEnd={stopHold}
							onClick={() => handleClick("left", decrementSeconds)}
							className={`set-timer__chevron set-timer__chevron--left ${
								activeChevron === "left" ? "set-timer__chevron--pressed" : ""
							}`}
						/>
						<div className="set-timer__display">
							<h1 className="set-timer__time">
								{time.minutes} : {String(time.seconds).padStart(2, "0")}
							</h1>
							<div className="set-timer__time-span">
								<span>minutes</span>
								<span>seconds</span>
							</div>
						</div>
						<img
							src={caretRight}
							alt="Increase Seconds"
							onMouseDown={() => handleMouseDown("right", incrementSeconds)}
							onMouseUp={stopHold}
							onMouseLeave={stopHold}
							onTouchStart={() => handleMouseDown("right", incrementSeconds)}
							onTouchEnd={stopHold}
							onClick={() => handleClick("right", incrementSeconds)}
							className={`set-timer__chevron set-timer__chevron--right ${
								activeChevron === "right" ? "set-timer__chevron--pressed" : ""
							}`}
						/>
					</div>
				</div>
			</div>
			<div className="container__bottom">
				<Button
					className="set-timer__start-button"
					onClick={handleStart}
					text="START TIMER"
					disabled={isTimeZero}
				/>
			</div>
		</div>
	);
};

export default SetTimer;
