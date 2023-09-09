import { useState } from "react";

export default function Cart({ cartItems, setCartItems }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  console.log("Cart Items:", cartItems);
  console.log("isCartOpen:", isCartOpen);

  function deleteFromCart(item) {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  }
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <div className="cartButton-container">
        <button
          className="cartButton"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          <h3>{cartQuantity > 0 ? `(${cartQuantity})` : null}</h3>
        </button>
      </div>

      {isCartOpen && cartItems.length > 0 && (
        <div className="cartList">
          {cartItems.map((item) => (
            <div key={item.id} className="cartItem">
              <img src={item.image} alt={item.name} />
              <p className="productNameInCart">{item.name}</p>
              <p>x{item.quantity}</p>
              <h4> £{item.price * item.quantity}</h4>
              <button
                className="deleteButton"
                onClick={() => deleteFromCart(item)}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}

          {cartItems.length > 0 && (
            <div className="totalPrice">
              <h2>Total:</h2>
              <h2> £{totalPrice}</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
