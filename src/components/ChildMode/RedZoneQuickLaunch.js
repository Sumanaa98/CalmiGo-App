import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const RedZoneQuickLaunch = ({ onEmergency }) => {
  const { logEvent } = useContext(AppContext);

  const handleEmergency = () => {
    logEvent("Emergency", "Opened Emergency Focus");
    onEmergency();
  };

  return (
    <button onClick={handleEmergency} className="emergency-bar">
      Need help now
    </button>
  );
};

export default RedZoneQuickLaunch;