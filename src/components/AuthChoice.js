import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const AuthChoice = () => {
  const { setPage } = useContext(AppContext);

  return (
    <div className="login-screen">

      {/* # header */}
      <div className="app-header" onClick={() => setPage("home")}>
        CalmiGo
      </div>

      <div className="login-card" style={{ textAlign: "center" }}>

        <h2>Welcome</h2>

        <p className="form-subtext">
          Choose how you'd like to continue
        </p>

        <div className="button-group">
          <button onClick={() => setPage("signup")}>
            Create an account
          </button>

          <button className="secondary" onClick={() => setPage("login")}>
            Log in
          </button>
        </div>

      </div>
    </div>
  );
};

export default AuthChoice;