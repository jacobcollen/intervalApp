import "../styles/Button.css";

const Button = ({ onClick, text, className = "" }) => (
	<button className={`button ${className}`} onClick={onClick}>
		{text}
	</button>
);

export default Button;
