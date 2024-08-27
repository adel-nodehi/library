import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/saved">Saved</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
