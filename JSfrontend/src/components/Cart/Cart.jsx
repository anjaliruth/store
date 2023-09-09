import { useState } from "react";

export default function Cart({ cartItems, setCartItems }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  console.log("Cart Items:", cartItems);
  console.log("isCartOpen:", isCartOpen);

  function deleteFromCart(item) {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  }

  const cartQuantity = cartItems.reduce((totalQuantity, item) => {
    const sizeQuantity = item.sizes.reduce((sizeTotal, sizeItem) => {
      return sizeTotal + sizeItem.quantity;
    }, 0);
    return totalQuantity + sizeQuantity;
  }, 0);

  console.log("Cart Quantity:", cartQuantity);
  // outer reduce adds teh total fore each item
  const totalPrice = cartItems.reduce((totalAmt, item) => {
    return (
      totalAmt +
      // inner reduce calculates the total amount for one particular item, taking into account the quantity and size
      item.sizes.reduce((itemTotal, sizeItem) => {
        return itemTotal + item.price * sizeItem.quantity;
      }, 0)
    );
  }, 0);

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
          {/* flatMap flattens the nested structure */}
          {cartItems.flatMap((item) =>
            item.sizes.map((sizeItem) => (
              <div key={`${item.id}-${sizeItem.size}`} className="cartItem">
                <img src={item.image} alt={item.name} />
                <h3 className="productNameInCart">{item.name}</h3>
                <p>{sizeItem.size}</p>
                <p>x{sizeItem.quantity}</p>
                <h3>£{item.price * sizeItem.quantity}</h3>
              </div>
            ))
          )}

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
