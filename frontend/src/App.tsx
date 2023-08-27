import { useEffect, useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar.tsx";
import Cart from "./components/Cart/Cart.tsx";

function App() {
  const [dataFromServer, setDataFromServer] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);

  console.log("Here it is:", dataFromServer);
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
      <div className="main-container">
        <div className="customerDisplay">
          <SearchBar
            dataFromServer={dataFromServer}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
          <Cart cartItems={cartItems} setCartItems={setCartItems} />
        </div>
      </div>
    </>
  );
}

export default App;
