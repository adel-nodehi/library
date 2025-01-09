import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignupPage = () => {
  const { onSignup } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("sssss");
  const [password, setUPassword] = useState("sssss");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) return;

    try {
      await onSignup(username, password);
    } catch (err) {
      alert(err + ", Try another username");
      console.error(err);
    }

    setUsername("");
    setUPassword("");

    navigate("/");
  }

  return (
    <div className="sign-up">
      <form className="sign-up__form" onSubmit={handleSubmit}>
        <h1 className="sign-up__title">Sign Up</h1>

        <div className="sign-up__input-wrapper">
          <label htmlFor="username" className="sign-up__label">
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            minLength={4}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="sign-up__input"
          />
        </div>

        <div className="sign-up__input-wrapper">
          <label htmlFor="password" className="sign-up__label">
            Password:
          </label>

          <input
            id="password"
            name="password"
            type="password"
            minLength={4}
            required
            value={password}
            onChange={(e) => setUPassword(e.target.value)}
            className="sign-up__input"
          />
        </div>

        <button className="sign-up__submit-btn">Sign up</button>

        <p className="sign-up__paragraph">
          already have an account?{" "}
          <Link className="sign-up__link" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
