import React, { useState } from "react";
import { Card } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { Search, Eye, Trash2, ArrowLeft } from "lucide-react";

const GeneCodeViewer = ({setShowModal,onSubmit}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [geneData, setGeneData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [viewingGene, setViewingGene] = useState(null);
  const [rightPanelData, setRightPanelData] = useState([]);
  const [id,setId]=useState(0);
  const [error,setError]=useState(null);
  
  const fetchGeneData = async () => {
    
     if(searchQuery.trim().length <1)return;
    
    // try {console.log("yes")
     
    //     const nucleotideUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=${searchQuery.trim()}&rettype=gb&retmode=text`;
    //     const response = await fetch(nucleotideUrl);
        
    //     if (!response.ok) {
    //       throw new Error(`Failed to fetch data (status: ${response.status})`);
    //     }
  
    //     const textData = await response.text();
    //     const parsedData = parseGenBankData(textData);
      
        
  
    //     const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi`;
    //   const params = new URLSearchParams({
    //     db: 'nuccore',
    //     id: searchQuery.trim(),
    //     rettype: 'gb',
    //     retmode: 'xml',
    //   });
    
     
    //     const respons = await fetch(`${url}?${params}`);
    //     const xmlText = await respons.text();
    //     console.log(xmlText)
    
     
    //     const parser = new DOMParser();
    //     const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
        
    //     const cdsData = [];
        
      
    //     const features = xmlDoc.getElementsByTagName('GBFeature');
    //     for (let feature of features) {
    //       const qualifiers = feature.getElementsByTagName('GBFeature_key');
    //       for (let qualifier of qualifiers) {
    //         const qualifierName = qualifier.textContent;
    //         if (qualifierName === 'CDS') {
    //           const location = feature.getElementsByTagName('GBFeature_location')[0].textContent;
     
              
    //          if(location) cdsData.push({
    //             location: location,
                
    //         });
    //         }
    //       }
    //     }
    //    const tData = [];
    //     for (let feature of features) {
    //       const qualifiers = feature.getElementsByTagName('GBQualifier');
    //       for (let qualifier of qualifiers) {
    //         const qualifierName = qualifier.getElementsByTagName('GBQualifier_name')[0].textContent;
    //         if (qualifierName === 'translation') {
          
    //           const translation = qualifier.getElementsByTagName('GBQualifier_value')[0].textContent;
              
    //          if(translation) tData.push({
    //             translation: translation,
    //           });
    //         }
    //       }
    //     }
        
    //   const len = parsedData.sequence.length;
    //  setId((id)=>{return id+1;})
      
    //    parsedData.cds = cdsData;
    //    parsedData.translation = tData;
    //    parsedData.length = len;
    //    parsedData.id=id;
    //    setGeneData([parsedData]);
  
    //   } catch (err) {
    //     setError(err.message);
    //   }
    
     let x = {
      cds : [{len : "1..8"}],
      id : 1,
      length : 5,
      translation : [{translation : "wwww"}],
      organism : "jsda",
      sequence : "awauy2eiugeuihgiuehuighuighshhshshbuuhuihehvuahvhvaiavhjjejbbj",


     }

    
    setGeneData([x]);
    
  };


  const parseGenBankData = (data) => {
    const lines = data.split("\n");
    const parsed = {
      accession: "",
      organism: "",
      definition: "",
      sequence: "",
      cds : {},
      translation: [],
      
    };

    let readingSequence = false;
    let readingCDS = false;
    let readingTranslation = false;

    lines.forEach((line) => {
      if (line.startsWith("ACCESSION")) {
        parsed.accession = line.split(/\s+/)[1];
      } else if (line.startsWith("  ORGANISM")) {
        parsed.organism = line.replace("  ORGANISM  ", "").trim();
      } else if (line.startsWith("DEFINITION")) {
        parsed.definition = line.replace("DEFINITION  ", "").trim();
      } else if (line.startsWith("     CDS")) {
        readingCDS = true;
      } else if (readingCDS && line.includes("/translation=")) {
        readingTranslation = true;
        readingCDS = false;
      } else if (line.startsWith("ORIGIN")) {
        readingSequence = true;
      } else if (readingSequence) { 
        parsed.sequence += line.replace(/[^a-zA-Z]/g, ""); // Remove numbers & spaces
      } else if (readingCDS) {
  
      } else if (readingTranslation) {
        
      }
    });
  
    return parsed;
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
    <div className="absolute bg-white opacity-100 border z-5 p-4 rounded-xl w-[70vw] flex flex-col gap-4 top-[0vh] left-[14vw] ">
      {viewingGene ? (
        <div className="p-4 border rounded-lg shadow-lg">
          <Button variant="outline" onClick={() => setViewingGene(null)}>
            <ArrowLeft className="mr-2" /> Back
          </Button>
          <h2 className="text-xl font-bold mt-2">{viewingGene.organism}</h2>
          <p className="text-sm">Length: {viewingGene.length}</p>
          <pre className="bg-gray-100 p-2 mt-2 rounded whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
  { viewingGene.sequence}
</pre>


        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gene code"
            />
            <Button onClick={fetchGeneData} children={<Search />}>
              
            </Button>
          </div>
          {error && <p className="text-red-500 font-semibold">Error: {error}</p>}

          <div className="flex gap-4">
            <div className="w-1/3 border rounded-lg p-2 overflow-auto">
              {geneData.map((gene) => (
                <Card key={gene.id} className="mb-2 p-2 flex justify-between items-center">
                  <input
                    type="checkbox"
                    checked={selectedData.includes(gene.id)}
                    onChange={() => handleSelect(gene)}
                  />
                  <div className="cursor-pointer" onClick={() => handleSelect(gene)}>
                    <h3 className="text-sm font-semibold">{gene.organism}</h3>
                    <p className="text-xs text-gray-500">Length: {gene.length}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setViewingGene(gene)}>
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleRemove(gene.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="w-2/3 border rounded-lg p-4 min-h-[200px]">
              {rightPanelData.length > 0 ? (
                rightPanelData.map((gene) => (
                  <div key={gene.id} className="mb-4 border-b pb-2">
                    <h3 className="text-lg font-semibold">{gene.organism}</h3>
                    <p className="text-sm">Length: {gene.length}</p>
                    <pre className="bg-gray-100 p-2 mt-2 rounded whitespace-nowrap overflow-hidden text-ellipsis">{ gene.sequence}</pre>
                    <Button
                      variant="outline"
                      onClick={() => handleSelect(gene)}
                      className="mt-2"
                    >
                      Remove
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">Select a gene to display here</p>
              )}
            </div>
          </div>
             
           
          <Button onClick={handleAddCode} className="mt-4 w-full">
            Add Code
          </Button>
          <Button onClick={() => setShowModal(false)} className="bg-gray-300 hover:bg-gray-400">
            Cancel
          </Button>
        </>
        
      )}
       
            

    </div>
  );
};

export default GeneCodeViewer;
