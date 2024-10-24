import { motion } from "framer-motion";
import Button from "./Button";
import alarmicon from "../assets/icons/bell-icon.svg";
import "../styles/AlarmView.css";

const AlarmView = ({ setView }) => {
	const startNewTimer = () => setView("setTimer");

	return (
		<div className="container alarm-view__background">
			<div className="container__middle">
				<div className="alarm-view__animation">
					<motion.img
						src={alarmicon}
						alt="Alarm"
						className="alarm-view__icon"
						animate={{ rotate: [0, 5, -5, 0] }}
						transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
					/>
					<h1 className="alarm-view__headline">Times up!</h1>
					<div className="alarm-view__rings">
						<div className="ring"></div>
						<div className="ring"></div>
						<div className="ring"></div>
					</div>
				</div>
			</div>
			<div className="container__bottom">
				<Button
					onClick={startNewTimer}
					text="START NEW TIMER"
					className="button--light"
				/>
			</div>
		</div>
	);
};

export default AlarmView;
