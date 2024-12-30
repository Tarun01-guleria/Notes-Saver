import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav-bar">
      <NavLink to="/" className="home-nav">
        Home
      </NavLink>
      <NavLink to="/notes" className="notes-nav">
        Notes
      </NavLink>
    </div>
  );
}

export default Navbar;
