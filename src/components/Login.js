import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const demoUser = {
  username: "parent",
  password: "Calmigo123!",
  childName: "Michael",
  age: "8",
  communicationStyles: ["Uses visuals", "Uses gestures or pointing"],
  sensoryPreferences: ["Prefers quiet environments", "Sensitive to noise"],
  supportNeeds: ["Needs visual supports", "Needs reassurance"],
  isDemo: true,
};

const Login = () => {
  const {
    setIsLoggedIn,
    setPage,
    setCurrentUser,
    setParentMode,
    setZone,
    setActiveTab,
  } = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanUsername = username.trim();

    if (cleanUsername === demoUser.username && password === demoUser.password) {
      setCurrentUser(demoUser);
      setIsLoggedIn(true);
      setParentMode(true);
      setZone(null);
      setActiveTab("Dashboard");
      setError("");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) => user.username === cleanUsername && user.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      setIsLoggedIn(true);
      setParentMode(true);
      setZone(null);
      setActiveTab("Dashboard");
      setError("");
      return;
    }

    setError("Incorrect username or password.");
  };

  return (
    <div className="login-screen">
      <div className="app-header" onClick={() => setPage("home")}>
        CalmiGo
      </div>

      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Welcome back</h2>
        <p className="form-subtext">
          Log in to continue.
        </p>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password!"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Log In</button>

        <p className="form-link" onClick={() => setPage("signup")}>
          New here? Create an account
        </p>
      </form>
    </div>
  );
};

export default Login;