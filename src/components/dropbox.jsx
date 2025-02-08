import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import GeneCodeViewer from "./getCode";

const Dropbox = ({
  dropData,
  handleworkupdate,
  handledropupdate,
  handleRemoveItem,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCode, setNewCode] = useState(null);

  const [filteredData, setFilteredData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // Stores selected items
  const [viewingItem, setViewingItem] = useState(null); // Stores item details when clicked

  const handleAddCode = () => {
    setShowModal(true);
  };

  // Add new item to dropData when newCode updates
  useEffect(() => {
    if (!newCode) return;
    handledropupdate(newCode);
    setNewCode(null);
    setShowModal(false);
  }, [newCode]);

  // Filter items based on search
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(dropData);
    } else {
      setFilteredData(
        dropData.filter((item) =>
          item.organism.trim().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, dropData]);

  useEffect(() => {
    setSelectedItems(dropData.filter((item) => item.selected)); // Ensure selected items stay in sync
  }, [dropData]);

  // Handle checkbox selection
  const toggleSelection = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.some(
        (selected) => selected.organism === item.organism
      );
      const updatedSelection = exists
        ? prev.filter((selected) => selected.organism !== item.organism)
        : [...prev, item];

      // Update parent component state
      return updatedSelection;
    });
  };
  useEffect(() => {
    // Whenever selectedItems changes, call handleworkupdate
    handleworkupdate(selectedItems);
  }, [selectedItems, handleworkupdate]);

  return (
    <>
      {/* Dropbox Component */}
      <div className="relative w-80 p-4 border rounded-lg left-[15vw] top-[2vw] h-[40vh] bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Dropbox</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setShowModal(false)}
          >
            &times;
          </button>
        </div>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search your code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />

        {/* Add New Code Button */}
        <Button className="mb-1" onClick={handleAddCode}>
          + Add new code
        </Button>
        {/* Header Row*/}
        <div className="flex items-center justify-between px-3 py-1 border-b bg-gray-200 text-[10px] font-medium text-gray-600">
          <span className="w-14 text-left">Select</span>
          <span className="flex-1 text-center">Name of Code</span>
          <span className="w-14 text-center">View</span>
          <span className="w-14 text-center">Remove</span>
        </div>

        {/* List of Items */}
        <ul className="max-h-64 overflow-y-auto border-t pt-2">
          {filteredData.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 px-4 hover:bg-gray-100"
            >
              {/* Checkbox for selection */}
              <input
                type="checkbox"
                checked={selectedItems.some(
                  (selected) => selected.organism === item.organism
                )}
                onChange={() => toggleSelection(item)}
                className="mr-2"
              />

              {/* Item Name */}
              <span className="flex-1">{item.organism}</span>

              {/* View Details Button (Eye Icon) */}
              <button
                className="text-blue-500 hover:text-blue-700 ml-2"
                onClick={() => setViewingItem(item)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5c7.5 0 10.5 7.5 10.5 7.5s-3 7.5-10.5 7.5S1.5 12 1.5 12 4.5 4.5 12 4.5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                  />
                </svg>
              </button>

              {/* Remove Item Button (Cross Icon) */}
              <button
                className="text-red-500 hover:text-red-700 ml-2"
                onClick={() => handleRemoveItem(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {/* Modal for adding new code */}
        {showModal && (
          <GeneCodeViewer setShowModal={setShowModal} onSubmit={setNewCode} />
        )}
      </div>

      {/* Details View (Centered in the body) */}
      {viewingItem && (
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[50vw]">
            <h3 className="text-xl font-bold mb-2">{viewingItem.organism}</h3>
            <p className="text-gray-700">{viewingItem.sequence}</p>

            {/* Close Button (Cross Icon)
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded flex items-center"
              onClick={() => setViewingItem(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Dropbox;
