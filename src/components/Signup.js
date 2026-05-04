import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Signup = () => {
  const {
    setIsLoggedIn,
    setPage,
    setCurrentUser,
    setParentMode,
    setZone,
  } = useContext(AppContext);

  const [step, setStep] = useState(1);

  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");

  const [communicationStyles, setCommunicationStyles] = useState([]);
  const [sensoryPreferences, setSensoryPreferences] = useState([]);
  const [supportNeeds, setSupportNeeds] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

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
    "Uses sign language",
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
    "Needs low-stimulation spaces",
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
    "Needs support during transitions",
  ];

  const toggleOption = (option, state, setState) => {
    setState((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const isFormComplete = () => {
    return (
      childName.trim() !== "" &&
      age !== "" &&
      communicationStyles.length > 0 &&
      sensoryPreferences.length > 0 &&
      supportNeeds.length > 0
    );
  };

  const isValidPassword = (pwd) => {
    const hasCapital = /[A-Z]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    return hasCapital && hasSpecial;
  };

  const handleContinue = () => {
    if (!isFormComplete()) {
      setError("Please complete all sections before continuing.");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleCreateAccount = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter a username and password.");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must include a capital letter and a special character.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const cleanUsername = username.trim();

    const usernameExists = users.some(
      (user) => user.username === cleanUsername
    );

    if (usernameExists || cleanUsername.toLowerCase() === "parent") {
      setError("This username already exists.");
      return;
    }

    const newUser = {
      username: cleanUsername,
      password,
      childName,
      age,
      communicationStyles,
      sensoryPreferences,
      supportNeeds,
      isDemo: false,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setParentMode(true);
    setZone(null);
    setError("");
  };

  return (
    <div className="login-screen">
      <div className="app-header" onClick={() => setPage("home")}>
        CalmiGo
      </div>

      <div className="login-card">
        {step === 1 && (
          <>
            <h2>Create your account</h2>
            <p className="form-subtext">
              Tell us about your child so we can personalise support.
            </p>

            <h3>Child Details</h3>

            <label>Child Name</label>
            <input
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
            />

            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <h3>Communication Style</h3>
            <div className="checkbox-grid">
              {communicationOptions.map((option) => (
                <label key={option} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={communicationStyles.includes(option)}
                    onChange={() =>
                      toggleOption(
                        option,
                        communicationStyles,
                        setCommunicationStyles
                      )
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
                      toggleOption(
                        option,
                        sensoryPreferences,
                        setSensoryPreferences
                      )
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

        {step === 2 && (
          <>
            <h2>Review details</h2>

            <p>
              <strong>Name:</strong> {childName}
            </p>
            <p>
              <strong>Age:</strong> {age}
            </p>

            <h3>Communication Style</h3>
            <ul>
              {communicationStyles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3>Sensory Preferences</h3>
            <ul>
              {sensoryPreferences.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3>Support Needs</h3>
            <ul>
              {supportNeeds.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <button onClick={() => setStep(1)}>Back</button>
            <button onClick={() => setStep(3)}>Continue</button>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Create a username and password</h2>

            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

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

            <div className="back-row" onClick={() => setStep(2)}>
              ← Back
            </div>

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