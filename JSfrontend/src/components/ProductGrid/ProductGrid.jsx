export default function ProductGrid({
  filteredItems,
  cartItems,
  setCartItems,
}) {

  function getIndCartItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (cartItems.find((item) => item.id == id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
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
    setCartItems(currItems=> {
        return currItems.filter(item=> item.id !== id)})
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
          {getIndCartItemQuantity(item.id) === 0  ? (
            <button className="addToCartButton" onClick={() => increaseCartQuantity(item.id)}>
              {" "}
              + Add to Cart
            </button>
          ) : (
            <div className="quantityForCart">
              <div className="calculationInCart">
                <button className="minusAmt" onClick={()=> decreaseCartQuantity(item.id)}>-</button>
                <span>{getIndCartItemQuantity(item.id)}</span> in cart
                <button className="plusAmt" onClick={()=> increaseCartQuantity(item.id)}>+</button>
              </div>
              <button className="removeButton" onClick={()=> removeCartItem(item.id)}>Remove</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
