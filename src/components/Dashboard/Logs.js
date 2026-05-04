import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Logs = () => {
  const { logs } = useContext(AppContext);

  // # mock data fallback
  const demoLogs = [
    {
      date: "Today, 10:30 AM",
      zone: "Red",
      tool: "Breathing exercise"
    },
    {
      date: "Yesterday, 4:15 PM",
      zone: "Yellow",
      tool: "Calm corner"
    },
    {
      date: "Yesterday, 11:00 AM",
      zone: "Blue",
      tool: "Movement break"
    }
  ];

  const displayLogs = logs.length > 0 ? logs : demoLogs;

  // # zone colour helper
  const getZoneClass = (zone) => {
    return zone.toLowerCase();
  };

  return (
    <div className="logs-container">

      <h3>Regulation Logs</h3>

      <p className="helper-text">
        A simple overview of recent emotional regulation sessions.
      </p>

      <div className="logs-list">
        {displayLogs.map((log, index) => (
          <div key={index} className="log-card">

            <div className={`zone-indicator ${getZoneClass(log.zone)}`}>
              {log.zone}
            </div>

            <div className="log-content">
              <p className="log-tool">{log.tool}</p>
              <p className="log-date">{log.date}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Logs;