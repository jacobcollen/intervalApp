import { motion } from "framer-motion";
import "../styles/Menu.css";
import closeIcon from "../assets/icons/close.svg";

const Menu = ({ setView, setShowMenu }) => {
	const selectView = (view) => {
		setView(view);
		setShowMenu(false);
	};

	return (
		<motion.div
			className="menu"
			initial={{ y: "-100%", opacity: 0 }}
			animate={{
				y: "0%",
				opacity: 1,
				transition: { type: "spring", damping: 15, duration: 0.5 },
			}}
			exit={{ y: "-100%", opacity: 0, transition: { duration: 0.3 } }}
		>
			<div className="menu__overlay" onClick={() => setShowMenu(false)}>
				<div className="menu__content" onClick={(e) => e.stopPropagation()}>
					<img
						src={closeIcon}
						alt="Close Menu"
						className="menu__close-icon"
						onClick={() => setShowMenu(false)}
					/>
					<div className="menu__nav">
						<button
							onClick={() => selectView("analog")}
							className="menu__button"
						>
							ANALOG TIMER
						</button>
						<button
							onClick={() => selectView("digital")}
							className="menu__button"
						>
							DIGITAL TIMER
						</button>
						<button onClick={() => selectView("text")} className="menu__button">
							TEXT TIMER
						</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Menu;
