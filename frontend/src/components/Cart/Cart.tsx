import React from "react";

export default function Cart({ cartItems }) {
  return (
    <div className="">
      <button className="cartButton">
        <span className="material-symbols-outlined">shopping_cart</span>
        <h3>{cartItems.length}</h3>
      </button>

      <div className="cartList">
        {cartItems.map((item) => (
          <div key={item.id} className="cartItem">
            <img src={item.image} alt={item.name} />
            <p className="productNameInCart">{item.name}</p>
            <h4> £{item.price}</h4>
            <h3>{item.description}</h3>
          </div>
        ))}

      </div>

      <div className="totalPrice">
        <h2>Total:</h2>
        <h2> £{cartItems.reduce((total, item) => total + parseFloat(item.price), 0)}</h2>

      </div>
    </div>
  );
}
