import "../styles/TextTimer.css";

const numberToWords = (num) => {
	const ones = [
		"ZERO",
		"ONE",
		"TWO",
		"THREE",
		"FOUR",
		"FIVE",
		"SIX",
		"SEVEN",
		"EIGHT",
		"NINE",
		"TEN",
		"ELEVEN",
		"TWELVE",
		"THIRTEEN",
		"FOURTEEN",
		"FIFTEEN",
		"SIXTEEN",
		"SEVENTEEN",
		"EIGHTEEN",
		"NINETEEN",
	];
	const tens = [
		"",
		"",
		"TWENTY",
		"THIRTY",
		"FORTY",
		"FIFTY",
		"SIXTY",
		"SEVENTY",
		"EIGHTY",
		"NINETY",
	];

	if (num < 20) return `${ones[num]}`;
	const ten = Math.floor(num / 10);
	const one = num % 10;
	return one === 0 ? `${tens[ten]}` : `${tens[ten]}-${ones[one]}`;
};

const TextTimer = ({ minutes, seconds, onAbort, onToggle, shakeVertical }) => {
	const formattedTime = () => {
		if (minutes === 0 && seconds === 0) {
			return "TIMER ENDED";
		}
		if (minutes === 0 && seconds > 0) {
			return `${numberToWords(seconds)} ${
				seconds === 1 ? "SECOND" : "SECONDS"
			}`;
		}
		if (seconds === 0) {
			return `${numberToWords(minutes)} ${
				minutes === 1 ? "MINUTE" : "MINUTES"
			}`;
		}
		return `${numberToWords(minutes)} ${
			minutes === 1 ? "MINUTE" : "MINUTES"
		} AND ${numberToWords(seconds)} ${seconds === 1 ? "SECOND" : "SECONDS"}`;
	};

	return (
		<div
			className={`container ${shakeVertical ? "shake-vertical" : ""}`}
			onClick={onToggle}
		>
			<div className="container__middle">
				<h1 className="text-timer__time">{formattedTime()}</h1>
			</div>
			<div className="container__bottom">
				<button className="button" onClick={onAbort}>
					ABORT TIMER
				</button>
			</div>
		</div>
	);
};

export default TextTimer;
