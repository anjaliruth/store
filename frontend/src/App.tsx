import { useEffect, useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar.tsx";

function App() {
  const [dataFromServer, setDataFromServer] = useState<string[]>([]);


  console.log("Here it is:", dataFromServer)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5001/items");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDataFromServer(data);
        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchData();
  }, []);


  
  

  return (
    <>
      <div>
        <SearchBar dataFromServer={dataFromServer}/>
        
      </div>
    </>
  );
}

export default App;
