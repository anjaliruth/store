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

  function getIndCartItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }


  function increaseCartQuantity(id, selectedSize) {
    setCartItems((currItems) => {
      const existingCartItem = currItems.find((item) => item.id === id);

      if (!existingCartItem) {
        // Find the item in the dataFromServer array
        const newItem = dataFromServer.find((item) => item.id === id);
        if (!newItem) {
          return currItems; // Item not found in dataFromServer
        }

        // Add the new item to the cart with quantity 1 and the selected size
        return [
          ...currItems,
          { ...newItem, sizes: [{ size: selectedSize, quantity: 1 }] },
        ];
      } else {
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
                <img src={item.image} alt={item.name} />
                <h3 className="productNameInCart">{item.name}</h3>
                <p>{sizeItem.size}</p>
                <h3>£{item.price * sizeItem.quantity}</h3>
                <div className="calculationInCart">
                {/* <button
                  className="minusAmt"
                  onClick={() => decreaseCartQuantity(item.id)}
                >
                  -
                </button> */}
                <span>x{sizeItem.quantity}</span>
                <button
                  className="plusAmt"
                  onClick={() => increaseCartQuantity(item.id, itemSize)}
                >
                  +
                </button>
              </div>
              {/* <button
                className="removeButton"
                onClick={() => removeCartItem(item.id)}
              >
                Remove
              </button> */}
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
