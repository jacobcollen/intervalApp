import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import SetTimer from "./components/SetTimer";
import DigitalTimer from "./components/DigitalTimer";
import AnalogTimer from "./components/AnalogTimer";
import TextTimer from "./components/TextTimer";
import AlarmView from "./components/AlarmView";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import TimerAnimations from "./components/TimerAnimations";
import useCustomTimer from "./hooks/useCustomTimer";
import "./styles/index.css";

const App = () => {
	const [loading, setLoading] = useState(true);
	const [view, setView] = useState("setTimer");
	const [time, setTime] = useState({ minutes: 2, seconds: 0 });
	const [showMenu, setShowMenu] = useState(false);

	const {
		startTimer,
		pauseTimer,
		resetTimer,
		setInitialTime,
		minutes,
		seconds,
		running,
	} = useCustomTimer(time, () => setView("alarm"));

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 3000);
		return () => clearTimeout(timer);
	}, []);

	const handleStartTimer = () => {
		setInitialTime(time);
		startTimer();
		setView("digital");
	};

	const handleToggle = () => {
		if (running) {
			pauseTimer();
		} else {
			startTimer();
		}
	};

	const handleAbort = () => {
		resetTimer();
		setView("setTimer");
	};

	const navigateToView = (desiredView) => {
		if (view === "setTimer" && !running) {
			setInitialTime(time);
			startTimer();
		}
		setView(desiredView);
		setShowMenu(false);
	};

	const isClockView =
		view === "digital" || view === "analog" || view === "text";

	if (loading) {
		return <LoadingScreen />;
	}

	return (
		<>
			{view !== "alarm" && <Navbar setShowMenu={setShowMenu} />}
			{showMenu && view !== "alarm" && (
				<Menu setView={navigateToView} setShowMenu={setShowMenu} />
			)}
			{!showMenu && (
				<>
					{view === "setTimer" && (
						<SetTimer
							key="setTimer"
							time={time}
							setTime={setTime}
							onStart={handleStartTimer}
						/>
					)}
					{view === "digital" && (
						<DigitalTimer
							key="digital"
							minutes={minutes}
							seconds={seconds}
							onAbort={handleAbort}
							onToggle={handleToggle}
						/>
					)}
					{view === "analog" && (
						<AnalogTimer
							key="analog"
							minutes={minutes}
							seconds={seconds}
							onAbort={handleAbort}
							onToggle={handleToggle}
						/>
					)}
					{view === "text" && (
						<TextTimer
							key="text"
							minutes={minutes}
							seconds={seconds}
							onAbort={handleAbort}
							onToggle={handleToggle}
						/>
					)}
					{view === "alarm" && <AlarmView setView={setView} />}
				</>
			)}
			{!running && isClockView && (
				<div className="container__bottom" onClick={handleToggle}>
					<TimerAnimations />
				</div>
			)}
		</>
	);
};

export default App;
