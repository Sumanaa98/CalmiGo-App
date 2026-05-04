import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
  const { activeTab, setActiveTab } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <h2>🌿 CalmiGo</h2>

        <ul>
          <li
            onClick={() => handleClick("Dashboard")}
            className={activeTab === "Dashboard" ? "active" : ""}
          >
            Dashboard
          </li>

          <li
            onClick={() => handleClick("Logs")}
            className={activeTab === "Logs" ? "active" : ""}
          >
            Logs
          </li>

          <li
            onClick={() => handleClick("Settings")}
            className={activeTab === "Settings" ? "active" : ""}
          >
            Settings
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;