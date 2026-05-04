import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Settings = () => {
  const { sensorySettings, setSensorySettings } = useContext(AppContext);
  const [savedMessage, setSavedMessage] = useState("");

  // # local mock settings for a richer page
  const [supportSettings, setSupportSettings] = useState({
    visualPrompts: true,
    simpleLanguage: true,
    routineReminders: true,
    calmingSuggestions: true,
    transitionWarnings: false,
    movementBreaks: true,
  });

  const [childModeSettings, setChildModeSettings] = useState({
    autoplayAudio: false,
    largeButtons: true,
    reducedMotion: true,
    showVisualChoices: true,
    allowSoundEffects: false,
    guidedMode: true,
  });

  // # toggle sensory settings from context
  const toggleSensory = (key) => {
    setSensorySettings({
      ...sensorySettings,
      [key]: !sensorySettings[key],
    });
    setSavedMessage("");
  };

  // # toggle support settings
  const toggleSupport = (key) => {
    setSupportSettings({
      ...supportSettings,
      [key]: !supportSettings[key],
    });
    setSavedMessage("");
  };

  // # toggle  settings
  const toggleChildMode = (key) => {
    setChildModeSettings({
      ...childModeSettings,
      [key]: !childModeSettings[key],
    });
    setSavedMessage("");
  };

  // # save action
  const handleSave = () => {
    setSavedMessage("Settings saved successfully.");
  };

  return (
    <div className="settings-page">
      <div className="settings-header-card">
        <div>
          <h2>Settings</h2>
          <p className="settings-subtext">
            Personalise the experience to better support your child’s needs.
          </p>
        </div>
      </div>

      <div className="settings-grid">
        {/* # child summary */}
        <div className="card settings-summary-card">
          <h3>Child Profile Summary</h3>
          <div className="settings-summary-list">
            <div className="summary-row">
              <span className="summary-label">Child name</span>
              <span className="summary-value">Michael</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Age</span>
              <span className="summary-value">4</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Communication</span>
              <span className="summary-value">Visuals, gestures</span>
            </div>
          </div>
        </div>

        {/* # sensory settings */}
        <div className="card settings-card">
          <h3>Sensory Preferences</h3>
          <p className="settings-section-text">
            Adjust support based on common sensory sensitivities.
          </p>

          <div className="settings-options">
            {Object.keys(sensorySettings).map((key) => (
              <label key={key} className="settings-option">
                <div className="settings-option-copy">
                  <span className="settings-option-title">{formatLabel(key)}</span>
                  <span className="settings-option-desc">
                    {getSensoryDescription(key)}
                  </span>
                </div>

                <input
                  type="checkbox"
                  checked={sensorySettings[key]}
                  onChange={() => toggleSensory(key)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* # support settings */}
        <div className="card settings-card">
          <h3>Support Tools</h3>
          <p className="settings-section-text">
            Choose the support strategies you want the app to prioritise.
          </p>

          <div className="settings-options">
            {Object.keys(supportSettings).map((key) => (
              <label key={key} className="settings-option">
                <div className="settings-option-copy">
                  <span className="settings-option-title">{formatLabel(key)}</span>
                  <span className="settings-option-desc">
                    {getSupportDescription(key)}
                  </span>
                </div>

                <input
                  type="checkbox"
                  checked={supportSettings[key]}
                  onChange={() => toggleSupport(key)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* # child mode settings */}
        <div className="card settings-card">
          <h3>Child Mode Preferences</h3>
          <p className="settings-section-text">
            Control how calm, simple, and guided the child-facing screens feel.
          </p>

          <div className="settings-options">
            {Object.keys(childModeSettings).map((key) => (
              <label key={key} className="settings-option">
                <div className="settings-option-copy">
                  <span className="settings-option-title">{formatLabel(key)}</span>
                  <span className="settings-option-desc">
                    {getChildModeDescription(key)}
                  </span>
                </div>

                <input
                  type="checkbox"
                  checked={childModeSettings[key]}
                  onChange={() => toggleChildMode(key)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* # parent notes */}
        <div className="card settings-notes-card">
          <h3>Helpful Notes</h3>
          <ul className="settings-note-list">
            <li>Reduced motion can help lower visual overwhelm.</li>
            <li>Visual prompts can support children who process images more easily than speech.</li>
            <li>Routine reminders can help with transitions and predictability.</li>
          </ul>
        </div>
      </div>

      <div className="settings-actions">
        {savedMessage && <p className="settings-saved-message">{savedMessage}</p>}
        <button className="primary" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
};

// # format labels from camelCase
const formatLabel = (text) => {
  return text
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

// # sensory descriptions
const getSensoryDescription = (key) => {
  const descriptions = {
    sound: "Reduce or avoid noisy experiences where possible.",
    motion: "Limit moving visuals and overstimulating motion.",
    vibration: "Avoid vibration-based feedback and effects.",
  };

  return descriptions[key] || "Adjust this setting based on your child's needs.";
};

// # support descriptions
const getSupportDescription = (key) => {
  const descriptions = {
    visualPrompts: "Show visual cues and prompts to guide regulation.",
    simpleLanguage: "Use short, clear, easy-to-process language.",
    routineReminders: "Reinforce predictability and familiar structure.",
    calmingSuggestions: "Offer calming tools when dysregulation is detected.",
    transitionWarnings: "Give notice before changing activities or screens.",
    movementBreaks: "Encourage breaks for movement and body regulation.",
  };

  return descriptions[key] || "Enable this support strategy in the app.";
};

// # child mode descriptions
const getChildModeDescription = (key) => {
  const descriptions = {
    autoplayAudio: "Automatically play audio guidance when entering activities.",
    largeButtons: "Use larger touch targets for easier interaction.",
    reducedMotion: "Minimise movement and animation on screen.",
    showVisualChoices: "Present options with stronger visual support.",
    allowSoundEffects: "Play gentle sound feedback during interactions.",
    guidedMode: "Provide extra prompting and step-by-step support.",
  };

  return descriptions[key] || "Adjust how the child mode experience behaves.";
};

export default Settings;