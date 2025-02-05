import React, { useState } from "react";

const HistoryBox = ({ historyData, onItemClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleItemClick = (item) => {
    onItemClick(item);
  };

  return (
    <div
    className={`fixed top-16 left-0 h-[90vh] w-[12vw] bg-gray-100 border-r shadow-md z-1 transform transition-transform duration-300 ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Toggle Buttons */}
      <button
        onClick={toggleVisibility}
        className="absolute top-2 right-[-2rem] bg-gray-300 rounded-full p-2 shadow"
      >
        {isVisible ? "<" : ">"}
      </button>

      {/* History Items */}
      <div className="overflow-y-auto h-full p-4">
        {historyData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item)}
            className="cursor-pointer p-2 mb-2 rounded hover:bg-gray-200"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryBox;
