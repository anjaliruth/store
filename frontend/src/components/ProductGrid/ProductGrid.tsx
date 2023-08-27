import {useState} from 'react'


export default function ProductGrid({ filteredItems }) {
const [cart, setCart] = useState([]);
console.log("Cart:", cart)
  function addToCart(item) {
setCart([...cart, item])
    console.log("add to cart button works")
  }
  return (
    <div className="productGrid">
      {filteredItems.map((item) => (
        <div key={item.id} className="productCard">
          <img src={item.image} alt={item.name} />
          <h1 className="productName">{item.name}</h1>
          <h2>Price: £{item.price}</h2>
          <h3>{item.description}</h3>
          <button className="addToCartButton" onClick={()=> addToCart(item)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
