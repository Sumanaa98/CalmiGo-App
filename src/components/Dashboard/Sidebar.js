import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
  const { activeTab, setActiveTab } = useContext(AppContext);

  return (
    <div className="sidebar">
      <h2>🌿 CalmiGo</h2>

      <ul>
        <li
          onClick={() => setActiveTab("Dashboard")}
          className={activeTab === "Dashboard" ? "active" : ""}
        >
          Dashboard
        </li>

        <li
          onClick={() => setActiveTab("Logs")}
          className={activeTab === "Logs" ? "active" : ""}
        >
          Logs
        </li>

        <li
          onClick={() => setActiveTab("Settings")}
          className={activeTab === "Settings" ? "active" : ""}
        >
          Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
