import React, { useContext } from "react";
import { AppProvider, AppContext } from "./context/AppContext";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import ChildMode from "./components/ChildMode/ChildMode";
import ZoneScreen from "./components/ChildMode/ZoneScreen";

function Router() {
  const {
    page,
    isLoggedIn,
    parentMode,
    setParentMode,
    zone,
    setZone,
  } = useContext(AppContext);

  if (!isLoggedIn) {
    if (page === "home") return <Home />;
    if (page === "signup") return <Signup />;
    return <Login />;
  }

  if (parentMode) {
    return <Dashboard />;
  }

  if (zone) {
    return (
      <ZoneScreen
        zone={zone}
        onBack={() => setZone(null)}
      />
    );
  }

  return (
    <ChildMode
      onExit={() => setParentMode(true)}
      onSelectZone={(selectedZone) => setZone(selectedZone)}
    />
  );
}

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;