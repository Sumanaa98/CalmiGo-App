import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Logs from "./Logs";
import Settings from "./Settings";

const Dashboard = () => {
  const { activeTab } = useContext(AppContext);

  // # mock data (replace later with real state)
  const child = {
    name: "Michael",
    age: 4,
    communication: ["Uses visuals", "Uses gestures"],
    needs: ["Needs routine", "Needs calming strategies"]
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Topbar />

        {/* # DASHBOARD HOME */}
        {activeTab === "Dashboard" && (
          <div className="dashboard-grid">

            {/* # profile */}
            <div className="card profile-card">
              <div className="avatar">👤</div>
              <h3>{child.name}</h3>
              <p>Age: {child.age}</p>

              <div className="tag-group">
                {child.communication.map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>

            {/* # quick actions */}
            <div className="card">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button>Start calming session</button>
                <button>View logs</button>
                <button>Update profile</button>
              </div>
            </div>

            {/* # recent activity */}
            <div className="card logs-card">
              <h3>Recent Activity</h3>
              <ul>
                <li>Calming session completed</li>
                <li>Red zone episode logged</li>
                <li>Breathing tool used</li>
              </ul>
            </div>

            {/* # support needs */}
            <div className="card">
              <h3>Support Focus</h3>
              <div className="tag-group">
                {child.needs.map((item) => (
                  <span key={item} className="tag soft">{item}</span>
                ))}
              </div>
            </div>

            {/* # tip */}
            <div className="card tips-card">
              <h3>Tip</h3>
              <p>
                Consistent routines help children feel safe and more in control.
              </p>
            </div>

          </div>
        )}

        {activeTab === "Logs" && <Logs />}
        {activeTab === "Settings" && <Settings />}
      </div>
    </div>
  );
};

export default Dashboard;