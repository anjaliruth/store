import { useState } from "react";

export default function Cart({ cartItems, setCartItems, itemSize }) {
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

  function increaseCartQuantity(id, selectedSize) {
    setCartItems((currItems) => {
      const existingCartItem = currItems.find((item) => item.id === id);

      // Check if an item with the same size already exists in the cart
      const existingItemWithSize = existingCartItem.sizes.find(
        (sizeItem) => sizeItem.size === selectedSize
      );

      if (!existingItemWithSize) {
        // Add a new size for the existing item
        return currItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              sizes: [...item.sizes, { size: selectedSize, quantity: 1 }],
            };
          } else {
            return item;
          }
        });
      } else {
        // Increment quantity of existing item with the selected size
        return currItems.map((item) => {
          if (item.id === id) {
            const updatedSizes = item.sizes.map((sizeItem) =>
              sizeItem.size === selectedSize
                ? { ...sizeItem, quantity: sizeItem.quantity + 1 }
                : sizeItem
            );
            return { ...item, sizes: updatedSizes };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id, selectedSize) {
    setCartItems((currItems) => {
      const existingCartItem = currItems.find((item) => item.id === id);

      // Check if an item with the same size already exists in the cart
      const existingItemWithSize = existingCartItem.sizes.find(
        (sizeItem) => sizeItem.size === selectedSize
      );

      if (existingItemWithSize.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id == id) {
            const updatedSizes = item.sizes.map((sizeItem) =>
              sizeItem.size === selectedSize
                ? { ...sizeItem, quantity: sizeItem.quantity - 1 }
                : sizeItem
            );
            return { ...item, sizes: updatedSizes };
          } else {
            return item;
          }
        });
      }
    });
  }

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
                <img src={item.image} alt={item.name} className="imageInCart"/>
                <div className="description">
                  <h3 className="productNameInCart">{item.name}</h3>
                  <p className="itemSize">{sizeItem.size}</p>

                  <div className="calculationInCart">
                    <button
                      className="minusAmt"
                      onClick={() => decreaseCartQuantity(item.id, itemSize)}
                    >
                      -
                    </button>
                    <h4 className="itemQuantity">{sizeItem.quantity}</h4>
                    <button
                      className="plusAmt"
                      onClick={() => increaseCartQuantity(item.id, itemSize)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cartItemPrice">
                <h3>£{item.price * sizeItem.quantity}</h3>
                </div>
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
