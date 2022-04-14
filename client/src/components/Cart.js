import React, { useState } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

function Cart({ cartItems, isCheckout}) {
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(isCheckout);

  let total = 0;

  const newArr = [];
  cartItems.forEach((e) => newArr.push(e.price));
  total = newArr.reduce((cv, pv) => cv + pv, 0);

  async function handleCheckOut() {
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

  const renderButton = () => {
      return(
          <div>
        <button onClick={handleCheckOut}>Cash</button>
        <button onClick={handleCheckOut}>Card</button>
        </div>
      )
  }

  return (
    <div>
      {cartItems.map((item) => {
        return <CartItem key={item.id} item={item} />;
      })}
      <p>total: {total}</p>
      {checkout ? <button> hi </button> : renderButton()}
    </div>
  );
}

export default Cart;
