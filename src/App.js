// src/App.js
import React, { useState } from "react";
import Popup from "./Popup";
import "./App.css";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="App">
      <div className="nav-bar">
        <button className="back-btn">&lt;</button>
        <h4 className="app_title">View Audience</h4>
      </div>
      <button
        className="save-btn"
        onClick={togglePopup}
        disabled={showPopup} // Disable button when popup is shown
      >
        Save segment
      </button>
      {showPopup && <Popup closePopup={togglePopup} />}
    </div>
  );
}

export default App;
