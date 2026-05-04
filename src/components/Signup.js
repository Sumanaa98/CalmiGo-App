import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Signup = () => {
  const { setIsLoggedIn, setPage } = useContext(AppContext);

  // # step control
  const [step, setStep] = useState(1);

  // # child info
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");

  // # selections
  const [communicationStyles, setCommunicationStyles] = useState([]);
  const [sensoryPreferences, setSensoryPreferences] = useState([]);
  const [supportNeeds, setSupportNeeds] = useState([]);

  // # account
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // # validation messages
  const [error, setError] = useState("");

  // # options (same as before)
  const communicationOptions = [
    "Uses words / speech",
    "Uses short phrases",
    "Uses visuals (PECS, symbols)",
    "Uses gestures or pointing",
    "Uses AAC device",
    "Uses sounds or vocalisations",
    "Echoes words (echolalia)",
    "Understands more than expresses",
    "Responds to visuals better than speech",
    "Still developing communication",
    "Uses sign language"
  ];

  const sensoryOptions = [
    "Sensitive to noise",
    "Sensitive to light",
    "Sensitive to touch",
    "Sensitive to crowded spaces",
    "Prefers quiet environments",
    "Seeks movement",
    "Seeks deep pressure",
    "Avoids certain textures",
    "Enjoys sensory toys",
    "Overwhelmed by busy environments",
    "Needs low-stimulation spaces"
  ];

  const supportOptions = [
    "Needs visual supports",
    "Benefits from routine",
    "Needs help identifying emotions",
    "Needs calming strategies",
    "Needs movement breaks",
    "Needs adult support to regulate",
    "Benefits from countdowns",
    "Needs simple instructions",
    "Needs reassurance",
    "Benefits from sensory tools",
    "Needs support during transitions"
  ];

  // # toggle helper
  const toggleOption = (option, state, setState) => {
    setState((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  // # validation: step 1
  const isFormComplete = () => {
    return (
      childName.trim() !== "" &&
      age !== "" &&
      communicationStyles.length > 0 &&
      sensoryPreferences.length > 0 &&
      supportNeeds.length > 0
    );
  };

  // # validation: password
  const isValidPassword = (pwd) => {
    const hasCapital = /[A-Z]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    return hasCapital && hasSpecial;
  };

  // # step 1 → step 2
  const handleContinue = () => {
    if (!isFormComplete()) {
      setError("Please complete all sections before continuing.");
      return;
    }
    setError("");
    setStep(2);
  };

  // # final submit
  const handleCreateAccount = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter a username and password.");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must include a capital letter and a special character.");
      return;
    }

    setError("");

    setIsLoggedIn(true);
  };

  return (
    <div className="login-screen">

      <div className="app-header" onClick={() => setPage("home")}>
        CalmiGo
      </div>

      <div className="login-card">

        {/* # STEP 1 */}
        {step === 1 && (
          <>
            <h2>Create your account</h2>
            <p className="form-subtext">
              Tell us about your child so we can personalise support.
            </p>

            <h3>Child Details</h3>

            <label>Child Name</label>
            <input value={childName} onChange={(e) => setChildName(e.target.value)} />

            <label>Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />

            <h3>Communication Style</h3>
            <div className="checkbox-grid">
              {communicationOptions.map((option) => (
                <label key={option} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={communicationStyles.includes(option)}
                    onChange={() =>
                      toggleOption(option, communicationStyles, setCommunicationStyles)
                    }
                  />
                  <span className="checkbox-text">{option}</span>
                </label>
              ))}
            </div>

            <h3>Sensory Preferences</h3>
            <div className="checkbox-grid">
              {sensoryOptions.map((option) => (
                <label key={option} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={sensoryPreferences.includes(option)}
                    onChange={() =>
                      toggleOption(option, sensoryPreferences, setSensoryPreferences)
                    }
                  />
                  <span className="checkbox-text">{option}</span>
                </label>
              ))}
            </div>

            <h3>Support Needs</h3>
            <div className="checkbox-grid">
              {supportOptions.map((option) => (
                <label key={option} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={supportNeeds.includes(option)}
                    onChange={() =>
                      toggleOption(option, supportNeeds, setSupportNeeds)
                    }
                  />
                  <span className="checkbox-text">{option}</span>
                </label>
              ))}
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={handleContinue}>Continue</button>
          </>
        )}

        {/* # STEP 2 */}
         {step === 2 && (
            <>
              <h2>Review details</h2>

              {/* # basic info */}
              <p><strong>Name:</strong> {childName}</p>
              <p><strong>Age:</strong> {age}</p>

              {/* # communication */}
              <h3>Communication Style</h3>
              {communicationStyles.length > 0 ? (
                <ul>
                  {communicationStyles.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>No options selected</p>
              )}

              {/* # sensory */}
              <h3>Sensory Preferences</h3>
              {sensoryPreferences.length > 0 ? (
                <ul>
                  {sensoryPreferences.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>No options selected</p>
              )}

              {/* # support */}
              <h3>Support Needs</h3>
              {supportNeeds.length > 0 ? (
                <ul>
                  {supportNeeds.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>No options selected</p>
              )}

              {/* # actions */}
              <button onClick={() => setStep(1)}>Back</button>
              <button onClick={() => setStep(3)}>Continue</button>
            </>
          )}

        {/* # STEP 3 */}
        {step === 3 && (
          <>
            <h2>Create a username and password</h2>

            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="helper-text">
              Password must include a capital letter and a special character.
            </p>

            {error && <p style={{ color: "red" }}>{error}</p>}

           {/* # back arrow */}
          <div className="back-row" onClick={() => setStep(2)}>
            ← Back
          </div>

          {/* # primary action */}
          <button className="primary" onClick={handleCreateAccount}>
            Create Account
          </button>
          </>
        )}

      </div>
    </div>
  );
};

export default Signup;