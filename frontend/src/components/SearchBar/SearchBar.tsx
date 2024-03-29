import { useState } from "react";
import ProductGrid from "../ProductGrid/ProductGrid";
export default function SearchBar({dataFromServer, cartItems, setCartItems}) {
  const [filter, setFilter] = useState<string>("");
  const filteredItems = dataFromServer.filter((item) => {
    return item.name.toLowerCase().includes(filter.toLowerCase());
  }
  );
  console.log(filter)
  return (


    <div>
      <input placeholder="Search" onChange={(e)=>setFilter(e.target.value)} className="inputField"/>

      <ProductGrid filteredItems={filteredItems} cartItems={cartItems} setCartItems={setCartItems}/>
    </div>
  );
}
