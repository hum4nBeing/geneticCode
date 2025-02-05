import React, { useState } from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "./select";

const ToolWorkbench = ({ tools, data,handleRemove, handleDataChange }) => {
  const [selectedTool, setSelectedTool] = useState(null);
 

  const handleEvaluate = () => {
    if (selectedTool && selectedTool.function) {
      const result = selectedTool.function(data);
      console.log("Result:", result);
      alert(JSON.stringify(result));
    }
  };


  return (
    <div className=" flex flex-col items-center ">
      <Card className="relative w-full max-w-md border p-4 left-[13vw] w-[50vw] h-[50vh]">
        <CardContent>
          <div className="flex flex-col space-y-4 ">
            {/* Tool Selector */}
            <Select
              onValueChange={(value) => {
                const tool = tools.find((t) => t.name === value);
                setSelectedTool(tool);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={selectedTool ? selectedTool.name : "Select a tool"} className={selectedTool ? "text-black-700" : "text-gray-400"}>
                  
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {tools.map((tool, index) => (
                  <SelectItem key={index} value={tool.name}>
                    {tool.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Workbench */}
            <div className="border p-4 rounded-md">
              {Object.keys(data).length > 0 ? (
                Object.entries(data).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">{value.organism}:</span>
                    <input
                      type="text"
                      value={value.sequence}
                      onChange={(e) => handleDataChange(key, e.target.value)}
                      className="border rounded px-2 py-1 w-2/3"
                    />
                    <Button
                      onClick={() => handleRemove(key)}
                      className="ml-2 bg-red-500 text-white hover:bg-red-600 rounded px-2 py-1"
                    >
                      Remove
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No data available.</p>
              )}
            </div>

            {/* Evaluate Button */}
            <Button
              disabled={!selectedTool}
              onClick={handleEvaluate}
              className={`w-full ${
                selectedTool
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } rounded-lg px-4 py-2`}
            >
              Evaluate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolWorkbench;