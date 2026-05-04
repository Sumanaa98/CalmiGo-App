import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import ActivityView from "./ActivityView";
import "./ChildMode.css";

const ZoneScreen = () => {
  const { zone, setZone, logEvent } = useContext(AppContext);
  const [activeActivity, setActiveActivity] = useState(null);

  useEffect(() => {
    if (zone === "Red") {
      logEvent("Red", "Entered Safety Mode");
    }
  }, [zone, logEvent]);

  const handleActivityClick = (activity) => {
    logEvent(zone, activity.label);
    setActiveActivity(activity);
  };

  const zoneMessage = {
    Blue: "Your body feels slow. Let’s wake it up.",
    Green: "You are calm. Let’s stay steady.",
    Yellow: "Your body feels fast. Let’s slow it down.",
    Red: "Big feelings. You are safe."
  };

  const activities = {
    Blue: [
      { label: "Show Your Feelings", icon: "🗣️" },
      { label: "Sun Tap", icon: "☀️" },          // keep (fast tapping = alertness)
      { label: "Energy Bubbles", icon: "🫧" },   // keep (light + engaging)
      { label: "Speed Tap", icon: "⚡" },        // NEW (fast reaction tapping)
      { label: "Catch the Star", icon: "🌟" },   // UPGRADE of Star Chase (more dynamic)
      { label: "Color Smash", icon: "🎨" },      // UPGRADE of Color Burst (more active)
    ],

    Green: [
      { label: "Calm Drawing", icon: "✎" },
      { label: "Soft Focus", icon: "◎" },
      { label: "Gentle Match", icon: "▦" },
      { label: "Color Garden", icon: "🌷" },
      { label: "Show Your Feelings", icon: "🗣️" },
      { label: "Riddle Cards", icon: "?" }
    ],

    Yellow: [
      { label: "Find Your Focus", icon: "🟡" },
      { label: "Show Your Feelings", icon: "🗣️" },
      { label: "Slow Maze", icon: "🌀" },
      { label: "Sensory Screen", icon: "🍓" },
      { label: "Bubble Pop", icon: "🫧" },
      { label: "Tap & Breathe", icon: "✨" }
    ],

    Red: [
      { label: "Emergency Breathe", icon: "💨" },
      { label: "Safe Count", icon: "123" },
      { label: "Safe Place", icon: "🌈" },
      { label: "Show Your Feelings", icon: "🗣️" },
      { label: "Scribble", icon: "✎" },
      { label: "Help Card", icon: "🆘" }
    ]
  };

  if (activeActivity) {
    return (
      <ActivityView
        activity={activeActivity}
        zone={zone}
        onClose={() => setActiveActivity(null)}
      />
    );
  }

  return (
    <div className={`zone-screen ${zone.toLowerCase()}`}>
      <h2 className="zone-title">{zone} Zone</h2>
      <p className="zone-message">{zoneMessage[zone]}</p>

      <div className="activity-grid">
        {activities[zone].map((activity) => (
          <button
            key={activity.label}
            className={`activity-card ${zone.toLowerCase()}-activity-card`}
            onClick={() => handleActivityClick(activity)}
          >
            <div className="activity-symbol">{activity.icon}</div>
            <div className="card-label">{activity.label}</div>
          </button>
        ))}
      </div>

      <button className="zones-back-btn" onClick={() => setZone(null)}>
        <div className="zones-icon">
          <div className="zones-swatch blue" />
          <div className="zones-swatch green" />
          <div className="zones-swatch yellow" />
          <div className="zones-swatch red" />
        </div>
      </button>
    </div>
  );
};

export default ZoneScreen;