import { useRef, useState } from "react";
import Button from "./Button";
import Toggle from "./Toggle";
import caretLeft from "../assets/icons/caret-left.svg";
import caretRight from "../assets/icons/caret-right.svg";
import "../styles/SetTimer.css";

const SetTimer = ({
	time,
	setTime,
	onStart,
	intervalMode,
	setIntervalMode,
	shake,
}) => {
	const holdIntervalRef = useRef(null);
	const [activeChevron, setActiveChevron] = useState(null);

	const adjustTime = (amount) => {
		setTime((prev) => {
			let totalSeconds = prev.minutes * 60 + prev.seconds + amount;
			if (totalSeconds < 0) totalSeconds = 0;
			return {
				minutes: Math.floor(totalSeconds / 60),
				seconds: totalSeconds % 60,
			};
		});
	};

	const startHold = (chevron, amount) => {
		setActiveChevron(chevron);
		holdIntervalRef.current = setInterval(() => adjustTime(amount), 45);
	};

	const stopHold = () => {
		clearInterval(holdIntervalRef.current);
		holdIntervalRef.current = null;
		setTimeout(() => setActiveChevron(null), 300);
	};

	const handleClick = (chevron, amount) => {
		setActiveChevron(chevron);
		adjustTime(amount);
		setTimeout(() => setActiveChevron(null), 100);
	};

	return (
		<div className="container">
			<div className="container__middle">
				<div className={`time-control ${shake ? "shake" : ""}`}>
					<img
						src={caretLeft}
						alt="Decrease Time"
						onMouseDown={() => startHold("left", -1)}
						onMouseUp={stopHold}
						onMouseLeave={stopHold}
						onTouchStart={() => startHold("left", -1)}
						onTouchEnd={stopHold}
						onClick={() => handleClick("left", -1)}
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
						alt="Increase Time"
						onMouseDown={() => startHold("right", 1)}
						onMouseUp={stopHold}
						onMouseLeave={stopHold}
						onTouchStart={() => startHold("right", 1)}
						onTouchEnd={stopHold}
						onClick={() => handleClick("right", 1)}
						className={`set-timer__chevron set-timer__chevron--right ${
							activeChevron === "right" ? "set-timer__chevron--pressed" : ""
						}`}
					/>
				</div>
			</div>
			<div className="container__bottom">
				<div className="set-timer__interval-toggle">
					<Toggle
						checked={intervalMode}
						onChange={() => setIntervalMode((prev) => !prev)}
					/>
					<span>Enable Intervals</span>
				</div>
				<Button
					className="set-timer__start-button"
					onClick={onStart}
					text="START TIMER"
				/>
			</div>
		</div>
	);
};

export default SetTimer;
