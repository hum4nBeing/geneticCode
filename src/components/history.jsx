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
    <div className="flex">
      <div
        className={`fixed top-16 left-0 h-[90vh] w-[15vw] bg-gray-200 border-r shadow-md z-10 transform transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {isVisible && (
          <button
            onClick={toggleVisibility}
            className="absolute top-2 left-[-2rem] bg-gray-300 rounded-full p-2 shadow"
          >
            {"<"}
          </button>
        )}

        {!isVisible && (
          <button
            onClick={toggleVisibility}
            className="absolute top-2 right-[-2rem] bg-gray-300 rounded-full p-2 shadow"
          >
            {">"}
          </button>
        )}

        {/* History Items with Timeline */}
        <div className="overflow-y-auto h-full p-4">
          <h2 className="text-2xl font-bold mb-4">History</h2>
          <div className="relative">
            {historyData.map((item, index) => (
              <div key={index} className="flex items-start gap-2 relative">
                {/* Circle Indicator */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 border-2 border-blue-400 rounded-full bg-white"></div>
                  {index !== historyData.length - 1 && (
                    <div className="w-px h-10 bg-gray-400"></div>
                  )}
                </div>

                {/* Content */}
                <div
                  onClick={() => handleItemClick(item)}
                  className="cursor-pointer p-1"
                >
                  <div className="font-semibold text-sm">X TOOL</div>
                  <div className="text-xs text-gray-600">{item.details}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryBox;
