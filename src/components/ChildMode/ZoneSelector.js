import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { zones } from "../../data/zones";
import "./ChildMode.css";

const ZoneSelector = () => {
  const { setZone } = useContext(AppContext);

  return (
    <div className="zone-selector-container home-scene">
      <div className="home-cloud cloud-one">☁️</div>
      <div className="home-cloud cloud-two">☁️</div>
      <div className="home-cloud cloud-three">☁️</div>

      <div className="home-rainbow">🌈</div>

      <div className="home-tree tree-one">🌳</div>
      <div className="home-tree tree-two">🌳</div>

      <div className="home-flower flower-one">🌼</div>
      <div className="home-flower flower-two">🌸</div>
      <div className="home-flower flower-three">🌷</div>

      <h1 className="child-home-title">How do you feel?</h1>

      <div className="zone-grid home-zone-grid simple-zone-grid">
        {zones.map((z) => (
          <button
            key={z.name}
            className={`zone-btn simple-zone-card ${z.name.toLowerCase()}`}
            onClick={() => setZone(z.name)}
            aria-label={`${z.name} Zone`}
          >
            <span className="zone-label">{z.name} Zone</span>
          </button>
        ))}
      </div>

      <div className="home-hills">
        <div className="hill hill-left" />
        <div className="hill hill-right" />
        <div className="path" />
      </div>
    </div>
  );
};

export default ZoneSelector;