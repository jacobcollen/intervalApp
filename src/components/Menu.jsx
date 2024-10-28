import { motion } from "framer-motion";
import "../styles/Menu.css";
import closeIcon from "../assets/icons/close.svg";

const Menu = ({ setView, setShowMenu, shake }) => (
	<motion.div
		className={`menu ${shake ? "shake" : ""}`}
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
					<button onClick={() => setView("analog")} className="menu__button">
						ANALOG TIMER
					</button>
					<button onClick={() => setView("digital")} className="menu__button">
						DIGITAL TIMER
					</button>
					<button onClick={() => setView("text")} className="menu__button">
						TEXT TIMER
					</button>
				</div>
			</div>
		</div>
	</motion.div>
);

export default Menu;
