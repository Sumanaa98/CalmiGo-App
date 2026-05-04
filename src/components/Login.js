import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { setIsLoggedIn, setPage } = useContext(AppContext);

  // # state: email input
  const [email, setEmail] = useState("");

  // # submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="login-screen">

      {/* # app header / navigation back to home */}
      <div className="app-header" onClick={() => setPage("home")}>
        CalmiGo
      </div>

      <form className="login-card" onSubmit={handleSubmit}>

        {/* # title */}
        <h2>Welcome back</h2>

        {/* # supporting text */}
        <p className="form-subtext">
          Log in to continue.
        </p>

        {/* # input field */}
        <label>Parent Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* # submit button */}
        <button type="submit">Log In</button>

        {/* # navigation to signup */}
        <p className="form-link" onClick={() => setPage("signup")}>
          New here? Create an account
        </p>

      </form>
    </div>
  );
};

export default Login;