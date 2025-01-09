import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        {isLoggedIn && (
          <li>
            <NavLink to="/saved">Saved</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
