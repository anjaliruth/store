

export default function ProductGrid({ filteredItems, cartItems, setCartItems }) {
  function addToCart(item) {
    setCartItems([...cartItems, item]); // Update the cartItems state in the parent component
    console.log("add to cart button works");
  }
console.log("Cart Items:", cartItems)
  return (
    <div className="productGrid">
      {filteredItems.map((item) => (
        <div key={item.id} className="productCard">
          <img src={item.image} alt={item.name} />
          <h1 className="productName">{item.name}</h1>
          <h2 className="price"> £{item.price}</h2>
          <h3>{item.description}</h3>
          <button className="addToCartButton" onClick={() => addToCart(item)}> + Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
