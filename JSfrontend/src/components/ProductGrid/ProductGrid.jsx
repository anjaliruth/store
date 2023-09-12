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
              value={itemSize[item.id]}
              onChange={(e) => setItemSize(e.target.value)}
            >
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
          {getIndCartItemQuantity(item.id) === 0 ? (
            // Render the button as usual when a size is selected
            <button
              className="addToCartButton"
              onClick={() => increaseCartQuantity(item.id, itemSize)}
            >
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
