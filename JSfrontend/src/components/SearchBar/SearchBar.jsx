import { useState } from "react";
import ProductGrid from "../ProductGrid/ProductGrid";
export default function SearchBar({
  dataFromServer,
  cartItems,
  setCartItems,
  itemSize,
  setItemSize,
  setIsCartOpen,
  isCartOpen,
}) {
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");
  const filteredItems = dataFromServer.filter((item) => {
    return (item.name.toLowerCase().includes(filter.toLowerCase()) && (category === "" || item.category === category));
  });
  console.log(filter);
  return (
    <div>
      <input
        placeholder="Search"
        onChange={(e) => setFilter(e.target.value)}
        className="inputField"
      />
      <select
        onChange={(e) => setCategory(e.target.value)}
        className="category"
      >
        <option value="">Category</option>
        <option value="Hat">Hat</option>
        <option value="Hoodie">Hoodie</option>
        <option value="Jacket">Jacket</option>
        <option value="Mask">Mask</option>
        <option value="Sweater">Sweater</option>
        <option value="T-Shirt">T-Shirt</option>
      </select>

      <ProductGrid
        filteredItems={filteredItems}
        cartItems={cartItems}
        setCartItems={setCartItems}
        dataFromServer={dataFromServer}
        itemSize={itemSize}
        setItemSize={setItemSize}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
    </div>
  );
}
