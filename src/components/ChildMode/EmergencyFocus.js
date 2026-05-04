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

export default EmergencyFocus;