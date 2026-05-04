import React, { useState } from "react";
import "./ChildMode.css";

const EmergencyFocus = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const words = ["In", "Hold", "Out", "Safe"];
  const instructions = [
    "Breathe in slowly.",
    "Hold gently.",
    "Breathe out slowly.",
    "You are safe."
  ];

  return (
    <div className="emergency-focus-screen">
      <button className="emergency-close-btn" onClick={onClose}>
        Done
      </button>

      <h2>Focus</h2>
      <p>Look at the circle. You are safe.</p>

      <button
        className="emergency-focus-circle"
        onClick={() => setStep(step + 1)}
      >
        {words[step % 4]}
      </button>

      <p className="emergency-focus-text">
        {instructions[step % 4]}
      </p>
    </div>
  );
};

const ChildMode = ({ onExit, onSelectZone }) => {
  const [showGuide, setShowGuide] = useState(false);
  const [calmMode, setCalmMode] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  if (showEmergency) {
    return <EmergencyFocus onClose={() => setShowEmergency(false)} />;
  }

  return (
    <div className={`child-mode-home ${calmMode ? "calm-mode" : ""}`}>
      <div className="pretty-bg" aria-hidden="true">
        <div className="sun">☀️</div>
        <div className="cloud cloud-left">☁️</div>
        <div className="cloud cloud-right">☁️</div>
        <div className="tree">🌳</div>
        <div className="flowers">🌼 🌸 🌼</div>
        <div className="butterfly">🦋</div>
      </div>

      <button className="exit-btn" onClick={onExit}>
        ← Exit
      </button>

      <button
        className="calm-toggle"
        onClick={() => setCalmMode(!calmMode)}
      >
        Calm Mode: {calmMode ? "On" : "Off"}
      </button>

      <button
        className="parent-guide-btn"
        onClick={() => setShowGuide(true)}
      >
        Parent Guide
      </button>

      {showGuide && (
        <div className="guide-modal" onClick={() => setShowGuide(false)}>
          <div className="guide-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="guide-close-btn"
              onClick={() => setShowGuide(false)}
            >
              ×
            </button>

            <h3>Parent Guide</h3>
            <p>Stay close</p>
            <p>Use a calm voice</p>
            <p>Let them choose</p>
            <p>Do not force</p>
          </div>
        </div>
      )}

      <button
        className="emergency-bar"
        onClick={() => setShowEmergency(true)}
        aria-label="Emergency Calm"
      >
        Need help now
      </button>

      <h1 className="home-title">How do you feel?</h1>

      <div className="zone-grid">
        <button className="zone-btn blue" onClick={() => onSelectZone("Blue")}>
          Blue Zone
        </button>

        <button className="zone-btn green" onClick={() => onSelectZone("Green")}>
          Green Zone
        </button>

        <button className="zone-btn yellow" onClick={() => onSelectZone("Yellow")}>
          Yellow Zone
        </button>

        <button className="zone-btn red" onClick={() => onSelectZone("Red")}>
          Red Zone
        </button>
      </div>
    </div>
  );
};

export default ChildMode;