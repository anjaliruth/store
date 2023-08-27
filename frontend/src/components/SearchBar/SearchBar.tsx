import { useState } from "react";
import ProductGrid from "../ProductGrid/ProductGrid";
export default function input({dataFromServer}) {
  const [filter, setFilter] = useState<string>("");
  const filteredItems = dataFromServer.filter((item) => {
    return item.name.toLowerCase().includes(filter.toLowerCase());
  }
  );
  console.log(filter)
  return (


    <div>
      <input placeholder="Search" onChange={(e)=>setFilter(e.target.value)} className="inputField"/>

      <ProductGrid filteredItems={filteredItems} />
    </div>
  );
}
