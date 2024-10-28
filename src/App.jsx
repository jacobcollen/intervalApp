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
	const [time, setTime] = useState({ minutes: 0, seconds: 0 });
	const [showMenu, setShowMenu] = useState(false);
	const [intervalMode, setIntervalMode] = useState(false);
	const [shake, setShake] = useState(false);
	const [shakeVertical, setShakeVertical] = useState(false);

	const isClockView =
		view === "digital" || view === "analog" || view === "text";
	const isTimeZero = time.minutes === 0 && time.seconds === 0;

	const {
		startTimer,
		pauseTimer,
		resetTimer,
		setInitialTime,
		minutes,
		seconds,
		running,
		finished,
	} = useCustomTimer(
		time,
		() => setView("alarm"),
		intervalMode,
		() => {
			setShakeVertical(true);
			setTimeout(() => setShakeVertical(false), 500);
		}
	);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 3000);
		return () => clearTimeout(timer);
	}, []);

	const handleStartTimer = () => {
		setInitialTime(time);
		startTimer();
		setView("digital");
	};

	const handleStart = () => {
		if (isTimeZero) {
			triggerShake();
			return;
		}
		handleStartTimer();
	};

	const triggerShake = () => {
		setShake(true);
		setTimeout(() => setShake(false), 500);
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

	const resetAll = () => {
		resetTimer();
		setView("setTimer");
	};

	const navigateToView = (desiredView) => {
		if (isTimeZero) {
			triggerShake();
		} else if (view !== "setTimer" || !running) {
			setView(desiredView);
		}
		setShowMenu(false);
	};

	if (loading) {
		return <LoadingScreen />;
	}

	return (
		<>
			{view !== "alarm" && <Navbar setShowMenu={setShowMenu} />}
			{showMenu && view !== "alarm" && (
				<Menu
					setView={navigateToView}
					setShowMenu={setShowMenu}
					shake={shake}
				/>
			)}
			{!showMenu && (
				<>
					{view === "setTimer" && (
						<SetTimer
							key="setTimer"
							time={time}
							setTime={setTime}
							onStart={handleStart}
							intervalMode={intervalMode}
							setIntervalMode={setIntervalMode}
							shake={shake}
						/>
					)}
					{view === "digital" && (
						<DigitalTimer
							key="digital"
							minutes={minutes}
							seconds={seconds}
							onAbort={handleAbort}
							onToggle={handleToggle}
							shakeVertical={shakeVertical}
						/>
					)}
					{view === "analog" && (
						<AnalogTimer
							key="analog"
							minutes={minutes}
							seconds={seconds}
							onAbort={handleAbort}
							onToggle={handleToggle}
							shakeVertical={shakeVertical}
						/>
					)}
					{view === "text" && (
						<TextTimer
							key="text"
							minutes={minutes}
							seconds={seconds}
							onAbort={handleAbort}
							onToggle={handleToggle}
							shakeVertical={shakeVertical}
						/>
					)}
					{view === "alarm" && !intervalMode && finished && (
						<AlarmView resetAll={resetAll} />
					)}
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
