import React, { useState } from "react";

const GenBankFetcher = () => {
  const [accession, setAccession] = useState("");
  const [nucleotideDetails, setNucleotideDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchDetails = async () => {
    setError(null);
    setNucleotideDetails(null);

    try {
      // ✅ Correct NCBI API for GenBank data
      const nucleotideUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=${accession}&rettype=gb&retmode=text`;
      const response = await fetch(nucleotideUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data (status: ${response.status})`);
      }

      const textData = await response.text();
      const parsedData = parseGenBankData(textData);
    
      

      const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi`;
    const params = new URLSearchParams({
      db: 'nuccore',
      id: accession,
      rettype: 'gb',
      retmode: 'xml',
    });
  
   
      const respons = await fetch(`${url}?${params}`);
      const xmlText = await respons.text();
      console.log(xmlText)
  
   
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
      
      const cdsData = [];
      
    
      const features = xmlDoc.getElementsByTagName('GBFeature');
      for (let feature of features) {
        const qualifiers = feature.getElementsByTagName('GBFeature_key');
        for (let qualifier of qualifiers) {
          const qualifierName = qualifier.textContent;
          if (qualifierName === 'CDS') {
            const location = feature.getElementsByTagName('GBFeature_location')[0].textContent;
   
            
           if(location) cdsData.push({
              location: location,
              
          });
          }
        }
      }
     let tData = [];
      for (let feature of features) {
        const qualifiers = feature.getElementsByTagName('GBQualifier');
        for (let qualifier of qualifiers) {
          const qualifierName = qualifier.getElementsByTagName('GBQualifier_name')[0].textContent;
          if (qualifierName === 'translation') {
        
            const translation = qualifier.getElementsByTagName('GBQualifier_value')[0].textContent;
            
           if(translation) tData.push({
              translation: translation,
            });
          }
        }
      }
      
  
   
    
     parsedData.cds = cdsData;
     parsedData.translation = tData;
      setNucleotideDetails(parsedData);


    } catch (err) {
      setError(err.message);
    }
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
      } else if (readingSequence) { console.log(line)
        parsed.sequence += line.replace(/[^a-zA-Z]/g, ""); // Remove numbers & spaces
      } else if (readingCDS) {console.log(line)
        
      } else if (readingTranslation) {
        
      }
    });
  console.log(parsed);
    return parsed;
  };

  return (
    <div className="p-6 space-y-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center">GenBank Nucleotide Fetcher</h1>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={accession}
          onChange={(e) => setAccession(e.target.value)}
          placeholder="Enter GenBank Accession Code"
          className="w-full border rounded px-4 py-2"
        />
        <button
          onClick={fetchDetails}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fetch
        </button>
      </div>

      {error && <p className="text-red-500 font-semibold">Error: {error}</p>}

      {nucleotideDetails && (
        <div className="p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-bold mb-2">Nucleotide Details (JSON):</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-700">
            {JSON.stringify(nucleotideDetails, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default GenBankFetcher;


