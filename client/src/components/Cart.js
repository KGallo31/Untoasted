import React, { useState } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Cart({ cartItems, isCheckOut}) {
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(isCheckOut); 

  let total = 0;

  const newArr = [];
  cartItems.forEach((e) => newArr.push(e.price));
  total = newArr.reduce((cv, pv) => cv + pv, 0);

  async function handleCheckOut(e) {
    const newSale = {
      total_price: total,
      cart_items: cartItems,
    };
    fetch("/add_cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSale),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((sale) => {
            navigate(`/checkout/${sale.id}`);
          });
        }
      })
      .then();
  }

  return (
    <div>
      {cartItems.map((item) => {
        return <CartItem key={item.id} item={item} />;
      })}
      <p>total: {total}</p>
      {checkout && <button onClick={handleCheckOut}>checkout</button>}
    </div>
  );
}

export default Cart;
