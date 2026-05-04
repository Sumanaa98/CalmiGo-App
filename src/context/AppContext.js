import React, { createContext, useState } from "react";

export const AppContext = createContext();

const getStored = (key, fallback) => {
  const saved = localStorage.getItem(key);
  if (saved === null) return fallback;

  try {
    return JSON.parse(saved);
  } catch {
    return fallback;
  }
};

export const AppProvider = ({ children }) => {
  const [page, setPageState] = useState(() => getStored("page", "home"));
  const [isLoggedIn, setIsLoggedInState] = useState(() =>
    getStored("isLoggedIn", false)
  );
  const [parentMode, setParentModeState] = useState(() =>
    getStored("parentMode", true)
  );
  const [activeTab, setActiveTabState] = useState(() =>
    getStored("activeTab", "Dashboard")
  );
  const [zone, setZoneState] = useState(() => getStored("zone", null));
  const [currentUser, setCurrentUserState] = useState(() =>
    getStored("currentUser", null)
  );

  const [childProfileType, setChildProfileType] = useState("non-verbal");
  const [activeTool, setActiveTool] = useState(null);
  const [logs, setLogs] = useState(() => getStored("logs", []));

  const [sensorySettings, setSensorySettings] = useState({
    sound: true,
    motion: true,
    vibration: false,
  });

  const setPage = (value) => {
    setPageState(value);
    localStorage.setItem("page", JSON.stringify(value));
  };

  const setIsLoggedIn = (value) => {
    setIsLoggedInState(value);
    localStorage.setItem("isLoggedIn", JSON.stringify(value));
  };

  const setParentMode = (value) => {
    setParentModeState(value);
    localStorage.setItem("parentMode", JSON.stringify(value));
  };

  const setActiveTab = (value) => {
    setActiveTabState(value);
    localStorage.setItem("activeTab", JSON.stringify(value));
  };

  const setZone = (value) => {
    setZoneState(value);
    localStorage.setItem("zone", JSON.stringify(value));
  };

  const setCurrentUser = (value) => {
    setCurrentUserState(value);
    localStorage.setItem("currentUser", JSON.stringify(value));
  };

  const logEvent = (zoneName, toolName) => {
    const entry = {
      date: new Date().toLocaleString(),
      zone: zoneName,
      tool: toolName,
    };

    setLogs((prev) => {
      const updated = [entry, ...prev];
      localStorage.setItem("logs", JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setParentMode(true);
    setZone(null);
    setActiveTab("Dashboard");
    setCurrentUser(null);
    setPage("login");
    localStorage.removeItem("currentUser");
  };

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        isLoggedIn,
        setIsLoggedIn,
        parentMode,
        setParentMode,
        activeTab,
        setActiveTab,
        childProfileType,
        setChildProfileType,
        zone,
        setZone,
        activeTool,
        setActiveTool,
        logs,
        logEvent,
        sensorySettings,
        setSensorySettings,
        currentUser,
        setCurrentUser,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};