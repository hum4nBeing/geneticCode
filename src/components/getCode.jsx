import React, { useState } from "react";
import { Card } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { Search, Eye, Trash2, ArrowLeft } from "lucide-react";

const GeneCodeViewer = ({ setShowModal, onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [geneData, setGeneData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [viewingGene, setViewingGene] = useState(null);
  const [rightPanelData, setRightPanelData] = useState([]);
  const [error, setError] = useState(null);

  const fetchGeneData = async () => {
    if (searchQuery.trim().length < 1) return;

    let x = {
      cds: [{ len: "1..8" }],
      id: 1,
      length: 5,
      translation: [{ translation: "wwww" }],
      organism: "jsda",
      sequence:
        "awauy2eiugeuihgiuehuighuighshhshshbuuhuihehvuahvhvaiavhjjejbbj",
    };

    setGeneData([x]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(viewingGene.sequence);
    alert("Copied to clipboard!");
  };

  const handleSelect = (gene) => {
    if (selectedData.includes(gene.id)) {
      setSelectedData(selectedData.filter((id) => id !== gene.id));
      setRightPanelData(rightPanelData.filter((data) => data.id !== gene.id));
    } else {
      setSelectedData([...selectedData, gene.id]);
      setRightPanelData([...rightPanelData, gene]);
    }
  };

  const handleRemove = (id) => {
    setGeneData(geneData.filter((gene) => gene.id !== id));
    setSelectedData(selectedData.filter((geneId) => geneId !== id));
    setRightPanelData(rightPanelData.filter((gene) => gene.id !== id));
  };

  const handleAddCode = () => {
    onSubmit(rightPanelData);
  };

  return (
    <div className="absolute bg-white opacity-100 border z-2 p-10 rounded-xl w-[60vw] flex flex-col gap-4 top-[0vh] left-[14vw] relative">
      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 p-1 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        ✖
      </button>

      {viewingGene ? (
        <div className="p-10 border rounded-lg shadow-lg relative">
          {/* Back Button at Top-Left */}
          <div className="absolute top-2 left-2">
            <Button variant="outline" onClick={() => setViewingGene(null)}>
              <ArrowLeft className="mr-2" /> Back
            </Button>
          </div>

          <h2 className="text-xl font-bold mt-10">{viewingGene.organism}</h2>
          <p className="text-sm">Length: {viewingGene.length}</p>
          <div className="relative">
            <pre className="bg-gray-100 p-2 mt-2 h-40 rounded whitespace-pre-wrap overflow-auto max-w-full">
              {viewingGene.sequence}
            </pre>
            <Button
              onClick={copyToClipboard}
              className="absolute top-2 right-2"
            >
              Copy
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gene code"
            />
            <Button onClick={fetchGeneData}>
              <Search />
            </Button>
          </div>
          {error && (
            <p className="text-red-500 font-semibold">Error: {error}</p>
          )}

          <div className="flex gap-4">
            <div className="w-1/3 border rounded-lg p-3 overflow-auto bg-white shadow-md">
              {geneData.map((gene) => (
                <Card
                  key={gene.id}
                  className="mb-1 flex items-center justify-between p-1 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedData.includes(gene.id)}
                    onChange={() => handleSelect(gene)}
                    className="w-3 h-3 accent-blue-500 cursor-pointer"
                  />

                  {/* Gene Details */}
                  <div
                    className="cursor-pointer flex-1 px-3"
                    onClick={() => handleSelect(gene)}
                  >
                    <h3 className="text-sm font-semibold text-gray-800">
                      {gene.organism}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Length: {gene.length}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewingGene(gene)}
                      className="hover:bg-gray-100 rounded-full p-2"
                    >
                      <Eye size={18} className="text-blue-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(gene.id)}
                      className="hover:bg-red-100 rounded-full p-2"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="w-2/3 border rounded-lg p-4 min-h-[200px]">
              {rightPanelData.length > 0 ? (
                rightPanelData.map((gene) => (
                  <div
                    key={gene.id}
                    className="mb-4 p-4 border rounded-lg shadow-lg bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{gene.organism}</h3>
                      <Button
                        variant="destructive"
                        onClick={() => handleSelect(gene)}
                        className="px-3 py-1 text-sm"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </Button>
                    </div>

                    <p className="text-sm text-gray-600">
                      Length: {gene.length}
                    </p>

                    <div className="bg-gray-100 p-2 mt-2 rounded max-h-32 overflow-auto whitespace-pre-wrap text-sm">
                      {gene.sequence}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center text-lg py-4">
                  Select a gene to display here
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Button
              onClick={handleAddCode}
              className="w-1/5 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all"
            >
              Add Code
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default GeneCodeViewer;
