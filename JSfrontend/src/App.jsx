import { useEffect, useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Cart from "./components/Cart/Cart.jsx";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dataFromServer, setDataFromServer] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [itemSize, setItemSize] = useState("XS");

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

  useEffect(() => {
    // Load cart items from localStorage
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);
  
  function updateCartInLocalStorage(cartItems) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }


  return (
    <>
      {dataFromServer.length === 0 ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="main-container">
          <nav className="navBar">
            <div className="centered">
              <h1 className="appTitle">Tech Stacked</h1>

              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                itemSize={itemSize}
                setItemSize={setItemSize}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                updateCartInLocalStorage={updateCartInLocalStorage}
              />
            </div>
          </nav>

          <div className="customerDisplay">
            <SearchBar
              dataFromServer={dataFromServer}
              cartItems={cartItems}
              setCartItems={setCartItems}
              itemSize={itemSize}
              setItemSize={setItemSize}
              isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                updateCartInLocalStorage={updateCartInLocalStorage}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
