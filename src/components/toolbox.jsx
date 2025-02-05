import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";

const Toolbox = ({ tools, onToolSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tools based on the search term
  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTool = (tool) => {
    onToolSelect(tool.function);
  };

  return (
    <div className="relative w-80 p-4 border rounded-lg shadow-lg left-[12vw] h-[45vh]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Tools</h2>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => console.log("Close Toolbox")}
        >
          &times;
        </button>
      </div>

      <Input
        type="text"
        placeholder="Search tools..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <div className="overflow-y-auto max-h-64 border-t pt-2">
        {filteredTools.map((tool, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelectTool(tool)}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                {/* Placeholder for icon */}
                <span role="img" aria-label="tool">
                  🛠️
                </span>
              </div>
              <div>
                <p className="font-semibold">{tool.name}</p>
                <p className="text-sm text-gray-500">Details</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600">
        Use Tool
      </Button>
    </div>
  );
};

export default Toolbox;