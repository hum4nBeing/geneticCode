import { useState , useCallback} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dropbox from './components/dropbox'
import Toolbox from './components/toolbox'
import Header from './components/header'
import HistoryBox from './components/history'
import ToolWorkbench from './components/workbench'
import GeneCodeViewer from './components/getCode'



function App() {
  const [workdata ,setworkData]=useState([]);
   const [historyData,setHistoryData]=useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dropData, setDropData] = useState([]);
 
  const handleItemClick = (item) => {
    console.log("Clicked item:", item); // Log or perform other actions
    setSelectedItem(item); // Update state with the clicked item's data
  };
  const tools = [
  { name: "Tool 1", function: (data) => ({ result: "Tool 1 processed " + JSON.stringify(data) }) },
  { name: "Tool 2", function: (data) => ({ result: "Tool 2 processed " + JSON.stringify(data) }) },
];

const handledropupdate = (newCode) => {
  setDropData((prevData) => [...prevData, ...newCode]);
};
const handleworkupdate = useCallback((newData) => {
  setworkData(newData);
}, []);
const handleRemoveItem = (index) => {
  setDropData((prevData) => prevData.filter((_, idx) => idx !== index));
};


const handleWDataChange = (key, value) => {
  setworkData((prevData) => ({
    ...prevData,
    [key]: value,
  }));
};

const handleWRemove = (key) => {
  setworkData((prevData) => {
    const updatedData = { ...prevData };
    delete updatedData[key];
    return updatedData;
  });

  // Remove the item from selected items in Dropbox
  setDropData((prevData) =>
    prevData.map((item) => ({
      ...item,
      selected: item.organism === key ? false : item.selected, // Uncheck the item
    }))
  );
};

  
  return (<>
   <Header />
   <div className='flex w-[100vw] h-[90vh]'>
    <HistoryBox historyData={historyData} onItemClick={handleItemClick}/>
    <div>
      <Dropbox dropData={dropData} handleworkupdate={handleworkupdate} handledropupdate={handledropupdate} handleRemoveItem={handleRemoveItem}/>
      <Toolbox tools={tools} onToolSelect={handleItemClick} />
    </div>
    <ToolWorkbench tools={tools} data={workdata} handleRemove={handleWRemove} handleDataChange={handleWDataChange}/>
   </div>
   
  </>
  )
}

export default App
