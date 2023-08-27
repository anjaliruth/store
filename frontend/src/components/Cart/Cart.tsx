import React from 'react'

export default function Cart({cartItems}) {
  return (
    <button className="cartButton">
        <span className="material-symbols-outlined">
shopping_cart
</span>
<h3>{cartItems.length}</h3>
    </button>
  )
}
