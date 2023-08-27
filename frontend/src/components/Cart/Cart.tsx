import { useState } from "react";

export default function Cart({ cartItems }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  console.log("Cart Items:", cartItems);
  console.log("isCartOpen:", isCartOpen);

  return (
    <div className="cart-container">
      <div className="cartButton-container">
        <button
          className="cartButton"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          <h3>{cartItems.length > 0 ? `(${cartItems.length})` : null}</h3>
        </button>
      </div>

      {isCartOpen && (
        <div className="cartList">
          {cartItems.map((item) => (
            <div key={item.id} className="cartItem">
              <img src={item.image} alt={item.name} />
              <p className="productNameInCart">{item.name}</p>
              <h4> £{item.price}</h4>
              <h3>{item.description}</h3>
            </div>
          ))}

          {cartItems.length > 0 && (
            <div className="totalPrice">
              <h2>Total:</h2>
              <h2>
                {" "}
                £
                {cartItems.reduce(
                  (total, item) => total + parseFloat(item.price),
                  0
                )}
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
