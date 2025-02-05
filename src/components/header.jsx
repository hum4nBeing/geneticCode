import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 border-b shadow-md ">
      {/* Placeholder for the left side */}
      <div className="bg-gray-300 h-8 w-24 rounded"></div>

      {/* Placeholder for the right side */}
      <div className="flex items-center space-x-4">
        <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
        <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
        <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;