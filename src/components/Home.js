import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { setPage } = useContext(AppContext);

  // # navigation helper
  const goTo = (page) => setPage(page);

  return (
    <div className="home-screen">
      <div className="home-content">

        {/* # visual anchor */}
        <div className="home-icon"></div>

        {/* # title */}
        <h1>Welcome to CalmiGo</h1>

        {/* # tagline */}
        <p className="tagline">
          Helping children feel calm, safe, and in control.
        </p>

        {/* # primary action only */}
        <div className="button-group">
          <button
            className="primary"
            onClick={() => goTo("authChoice")}
          >
            Continue
          </button>
        </div>

        {/* # reassurance */}
        <p className="reassurance">
          Take your time. There is no rush.
        </p>

      </div>
    </div>
  );
};

export default Home;