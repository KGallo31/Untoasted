import React, { useState } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

function Cart({ cartItems, isCheckOut, setCartItems}) {
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(isCheckOut);

  let subTotal = 0;
  let total = 0;
  let tax = 0.06;

  const itemPrice = [];
  cartItems.forEach((e) => {
    itemPrice.push(e.price);
  });
  subTotal = itemPrice.reduce((cv, pv) => cv + pv, 0);
  tax = tax * itemPrice.length;
  total = subTotal + subTotal * tax;

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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "no-wrap",
        }}
      >
        <p
          style={{
            marginTop: "-1%",
            marginBottom: "-2%",
            fontSize: "25px",
            color: "white",
            alignSelf: "flexStart",
          }}
        >
          Name
        </p>
        <p
          style={{
            marginTop: "-1%",
            marginBottom: "-2%",
            fontSize: "25px",
            color: "white",
            alignSelf: "flexEnd",
          }}
        >
          $
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          flexWrap: "no-wrap",
          marginBottom: "0px",
          marginTop: "5%",
        }}
      >
        {cartItems.map((item) => {
          return (
            <CartItem
              key={item.id}
              item={item}
            />
          );
        })}
      </div>
      <div style={{ marginTop: "5%" }}>
        <p style={{ color: "white" }}>Sub Total: {subTotal.toFixed(2)}</p>
        <p style={{ color: "white" }}>Total Tax: {tax.toFixed(2)}</p>
        <p style={{ color: "white" }}>Total: {total.toFixed(2)}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            flexGrow: "1",
          }}
        >
          {checkout && (
            <button className="Cart-button" onClick={handleCheckOut}>
              checkout
            </button>
          )}
          {checkout && (
            <button className="Cart-button"  onClick={() => setCartItems([])}>
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
