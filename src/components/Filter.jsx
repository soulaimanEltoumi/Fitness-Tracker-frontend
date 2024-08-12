import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Filter({ onFilterChange }) {
  const [targetList, setTargetList] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");

  useEffect(() => {
    // Fetch the target list
    axios
      .get(`${import.meta.env.VITE_LOCAL_API_URL}/exercise/targets`)
      .then((response) => {
        setTargetList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching targets:", error);
      });

    // Fetch the equipment list
    axios
      .get(`${import.meta.env.VITE_LOCAL_API_URL}/exercise/equipment`)
      .then((response) => {
        setEquipmentList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching equipment:", error);
      });
  }, []);

  const handleTargetChange = (event) => {
    const target = event.target.value;
    setSelectedTarget(target);
    onFilterChange(target, selectedEquipment);
  };

  const handleEquipmentChange = (event) => {
    const equipment = event.target.value;
    setSelectedEquipment(equipment);
    onFilterChange(selectedTarget, equipment);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Filter Exercises
      </h2>

      <div className="flex flex-wrap justify-between gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <label className="text-white">Select Target</label>
          <select
            className="p-2 bg-gray-700 text-white rounded-md w-full"
            value={selectedTarget}
            onChange={handleTargetChange}
          >
            <option value="">-- Select Target --</option>
            {targetList.map((target) => (
              <option key={target} value={target}>
                {target}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="text-white">Select Equipment:</label>
          <select
            className="p-2 bg-gray-700 text-white rounded-md w-full"
            value={selectedEquipment}
            onChange={handleEquipmentChange}
          >
            <option value="">-- Select Equipment --</option>
            {equipmentList.map((equipment) => (
              <option key={equipment} value={equipment}>
                {equipment}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center">
        <button
          className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-all duration-300"
          onClick={() => onFilterChange(selectedTarget, selectedEquipment)}
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
