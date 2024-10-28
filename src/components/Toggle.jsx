import { Check } from "@phosphor-icons/react";
import "../styles/Toggle.css";

const Toggle = ({ checked, onChange }) => {
	return (
		<label className="toggle">
			<input type="checkbox" checked={checked} onChange={onChange} />
			<div className="slider">
				<div className="slider-circle"></div>
			</div>
			{checked && <Check size={14} weight="bold" className="check-icon" />}
		</label>
	);
};

export default Toggle;
