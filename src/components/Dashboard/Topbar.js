import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Topbar = () => {
  const { setParentMode } = useContext(AppContext);

  return (
    <div className="topbar">
      <span>Parent Mode</span>

      <button onClick={() => setParentMode(false)}>
        👶 Enter Child Mode
      </button>
    </div>
  );
};

export default Topbar;
