import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [parentMode, setParentMode] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const [childProfileType, setChildProfileType] = useState("non-verbal");

  const [zone, setZone] = useState(null);
  const [activeTool, setActiveTool] = useState(null);

  const [logs, setLogs] = useState([]);

  const [sensorySettings, setSensorySettings] = useState({
    sound: true,
    motion: true,
    vibration: false,
  });

  const logEvent = (zoneName, toolName) => {
    const entry = {
      date: new Date().toLocaleString(),
      zone: zoneName,
      tool: toolName,
    };
    setLogs((prev) => [entry, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        page, setPage,
        isLoggedIn, setIsLoggedIn,
        parentMode, setParentMode,
        activeTab, setActiveTab,
        childProfileType, setChildProfileType,
        zone, setZone,
        activeTool, setActiveTool,
        logs, logEvent,
        sensorySettings, setSensorySettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
