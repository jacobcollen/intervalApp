import { motion } from "framer-motion";
import "../styles/AnalogTimer.css";

const AnalogTimer = ({
	minutes,
	seconds,
	onAbort,
	onToggle,
	shakeVertical,
}) => {
	const secondsAngle = (seconds / 60) * 360;
	const minutesAngle = ((minutes % 60) / 60) * 360 + (seconds / 60) * 6;

	const ticks = Array.from({ length: 60 }, (_, index) => {
		const angle = (index / 60) * 360;
		const isMajorTick = index % 5 === 0;
		return (
			<div
				key={index}
				className={`analog-timer__tick ${
					isMajorTick ? "analog-timer__tick-major" : ""
				}`}
				style={{ transform: `rotate(${angle}deg) translate(0, -125px)` }}
			/>
		);
	});

	return (
		<div
			className={`container ${shakeVertical ? "shake-vertical" : ""}`}
			onClick={onToggle}
		>
			<div className="container__middle">
				<div className="analog-timer">
					<div className="analog-timer__circle">
						{ticks}
						<motion.div
							className="analog-timer__second-hand"
							style={{ transform: `rotate(${secondsAngle - 90}deg)` }}
							transition={{ type: "tween", duration: 1, ease: "linear" }}
						/>
						<motion.div
							className="analog-timer__minute-hand"
							animate={{ rotate: minutesAngle - 90 }}
							initial={false}
							transition={{ type: "tween", duration: 1, ease: "linear" }}
						/>
						<div className="analog-timer__center" />
					</div>
				</div>
			</div>
			<div className="container__bottom">
				<button className="button" onClick={onAbort}>
					ABORT TIMER
				</button>
			</div>
		</div>
	);
};

export default AnalogTimer;
