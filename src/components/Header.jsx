import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Theme from "./Theme";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { user, isLoggedIn, onLogout } = useAuth();

  return (
    <header className="header">
      <Navbar />

      <div className="header__right">
        <Theme />

        {isLoggedIn ? (
          <>
            <button onClick={onLogout} className="btn btn__login">
              Logout
            </button>
            <p className="header__username">{user.name}</p>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn__login">
              Login
            </Link>

            <Link to="/signup" className="btn btn__login">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
