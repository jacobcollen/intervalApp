import { motion } from "framer-motion";
import "../styles/TimerAnimations.css";

const TimerAnimations = () => (
	<motion.div
		className="timer-paused-indicator"
		animate={{ scale: [1, 1.1, 1] }}
		transition={{ repeat: Infinity, duration: 1 }}
	>
		<p>Timer paused, click to resume</p>
	</motion.div>
);

export default TimerAnimations;
