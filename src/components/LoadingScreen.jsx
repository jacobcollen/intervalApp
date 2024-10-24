import { motion } from "framer-motion";
import logo from "../assets/icons/logo.svg";
import "../styles/LoadingScreen.css";

const LoadingScreen = ({ onProceed }) => (
	<motion.div
		className="loading-screen"
		initial={{ opacity: 0.5, scale: 0.9 }}
		animate={{ opacity: 1, scale: 1 }}
		exit={{ opacity: 0, scale: 0.8 }}
		transition={{ duration: 0.5 }}
		onClick={onProceed}
	>
		<div className="loading-screen">
			<img src={logo} alt="Logo" className="loading-screen__logo" />
		</div>
	</motion.div>
);

export default LoadingScreen;
