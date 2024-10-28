import "../styles/Navbar.css";
import navicon from "../assets/icons/navicon.svg";

const Navbar = ({ setShowMenu }) => (
  <div className="navbar">
    <img
      src={navicon}
      alt="Menu"
      className="navbar__icon"
      onClick={() => setShowMenu(true)}
    />
    <h1 className="navbar__title">Interval</h1>
  </div>
);

export default Navbar;
