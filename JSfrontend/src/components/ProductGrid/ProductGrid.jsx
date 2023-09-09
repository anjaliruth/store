export default function ProductGrid({
  filteredItems,
  cartItems,
  setCartItems,
  dataFromServer,
  itemSize,
  setItemSize,
}) {
  function getIndCartItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  console.log("size:", itemSize);
  function increaseCartQuantity(id, selectedSize) {
    setCartItems((currItems) => {
      const existingCartItems = currItems.find((item) => item.id === id);

      //if item does not exist in the cart
      if (!existingCartItems) {
        // Find the item in the dataFromServer array
        const newItem = dataFromServer.find((item) => item.id === id);
        // if item not found in dataFromServer
        if (!newItem) {
          return currItems;
        }

        // Add the new item to the cart with quantity 1, with selected Size
        return [...currItems, { ...newItem, quantity: 1, size: selectedSize }];
      } else {

        // Increment quantity of existing item in cart
        return currItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (cartItems.find((item) => item.id == id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id == id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeCartItem(id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  console.log("Cart Items:", cartItems);
  return (
    <div className="productGrid">
      {filteredItems.map((item) => (
        <div key={item.id} className="productCard">
          <img src={item.image} alt={item.name} />
          <h1 className="productName">{item.name}</h1>
          <h2 className="price"> £{item.price}</h2>
          <h3>{item.description}</h3>
          <div className="sizeDropdown">
            <select
              value={itemSize}
              onChange={(e) => setItemSize(e.target.value)}
            >
              <option value="Size">Size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
          {getIndCartItemQuantity(item.id) === 0 ? (
            <button
              className="addToCartButton"
              onClick={() => increaseCartQuantity(item.id, itemSize)}
            >
              {" "}
              + Add to Cart
            </button>
          ) : (
            <div className="quantityForCart">
              <div className="calculationInCart">
                <button
                  className="minusAmt"
                  onClick={() => decreaseCartQuantity(item.id)}
                >
                  -
                </button>
                <span>{getIndCartItemQuantity(item.id)}</span> in cart
                <button
                  className="plusAmt"
                  onClick={() => increaseCartQuantity(item.id)}
                >
                  +
                </button>
              </div>
              <button
                className="removeButton"
                onClick={() => removeCartItem(item.id)}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
