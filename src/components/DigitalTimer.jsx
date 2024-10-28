import "../styles/DigitalTimer.css";

const DigitalTimer = ({
	minutes,
	seconds,
	onAbort,
	onToggle,
	shakeVertical,
}) => {
	return (
		<div
			className={`container ${shakeVertical ? "shake-vertical" : ""}`}
			onClick={onToggle}
		>
			<div className="container__middle">
				<h1 className="digital-timer__time">
					{minutes}:{String(seconds).padStart(2, "0")}
				</h1>
			</div>
			<div className="container__bottom">
				<button className="button" onClick={onAbort}>
					ABORT TIMER
				</button>
			</div>
		</div>
	);
};

export default DigitalTimer;
