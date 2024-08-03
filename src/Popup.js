import React, { useState } from "react";
import axios from "axios";
import "./Popup.css";

const initialSchemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function Popup({ closePopup }) {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] =
    useState(initialSchemaOptions);
  const [newSchemaLabel, setNewSchemaLabel] = useState("");

  const handleAddSchema = (event) => {
    const selectedValue = event.target.value;
    if (!selectedValue) return;

    const selectedOption = availableSchemas.find(
      (option) => option.value === selectedValue
    );
    setSelectedSchemas([...selectedSchemas, selectedOption]);
    setAvailableSchemas(
      availableSchemas.filter((option) => option.value !== selectedValue)
    );
  };

  const handleAddNewSchema = () => {
    if (!newSchemaLabel) return;

    const newSchemaValue = newSchemaLabel.toLowerCase().replace(/ /g, "_");
    const newSchemaOption = { label: newSchemaLabel, value: newSchemaValue };

    setAvailableSchemas([...availableSchemas, newSchemaOption]);
    setNewSchemaLabel("");
  };

  const handleRemoveSchema = (value) => {
    const schemaToRemove = selectedSchemas.find(
      (schema) => schema.value === value
    );
    setSelectedSchemas(
      selectedSchemas.filter((schema) => schema.value !== value)
    );
    setAvailableSchemas([...availableSchemas, schemaToRemove]);
  };

  const handleSaveSegment = async () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((option) => ({
        [option.value]: option.label,
      })),
    };

    // Log data to be sent for verification
    console.log("Data to be sent:", data);

    try {
      const response = await axios.post(
        "https://cors-anywhere.herokuapp.com/https://webhook.site/be1e1858-3782-4c4b-89a8-d2d58a4dffbd",
        data
      );

      if (response.status === 200) {
        alert("Segment saved successfully!");
        closePopup();
      } else {
        alert(
          `Failed to save segment. Server responded with: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error saving segment:", error);
      alert("An error occurred while saving the segment.");
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="nav-bar">
          <button className="back-btn" onClick={closePopup}>
            &lt;
          </button>
          <h4 className="popup_title">Saving Segment</h4>
        </div>
        <h2>Save Segment</h2>
        <div className="section-1">
          <h4 className="header-popup">Enter the Name of the segment</h4>
          <input
            type="text"
            placeholder="Segment Name"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />
        </div>
        <h4 className="desc">
          To save your segment, you need to add the schemas to build the query.
        </h4>
        <div className="section-2">
          {selectedSchemas.map((schema, index) => (
            <div key={index} className="dropdown-container">
              <select value={schema.value} readOnly>
                <option value={schema.value}>{schema.label}</option>
              </select>
              <button
                className="remove-schema-btn"
                onClick={() => handleRemoveSchema(schema.value)}
              >
                -
              </button>
            </div>
          ))}
        </div>
        <select onChange={handleAddSchema} defaultValue="">
          <option value="" disabled>
            Add schema to segment
          </option>
          {availableSchemas.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="section-3">
          <input
            type="text"
            placeholder="New schema label"
            value={newSchemaLabel}
            onChange={(e) => setNewSchemaLabel(e.target.value)}
          />
          <button className="add-schema-btn" onClick={handleAddNewSchema}>
            + Add new schema
          </button>
        </div>
        <div className="action-buttons">
          <button className="save_segment" onClick={handleSaveSegment}>
            Save the segment
          </button>
          <button className="cancel" onClick={closePopup}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
