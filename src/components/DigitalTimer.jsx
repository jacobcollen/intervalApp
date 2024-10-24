import Button from "./Button";
import "../styles/DigitalTimer.css";

const DigitalTimer = ({ minutes, seconds, onAbort, onToggle }) => {
	return (
		<div className="container" onClick={onToggle}>
			<div className="container__middle">
				<h1 className="digital-timer__time">
					{minutes}:{String(seconds).padStart(2, "0")}
				</h1>
			</div>
			<div className="container__bottom">
				<Button onClick={onAbort} text="ABORT TIMER" />
			</div>
		</div>
	);
};

export default DigitalTimer;
