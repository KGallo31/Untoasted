import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cart from "./Cart";

function CheckOut({ items }) {
  let params = useParams();
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const [currentCart, setCurrentCart] = useState([]);

  useEffect(() => {
    fetch(`/currentCart/${params.id}`)
      .then((r) => r.json())
      .then((d) => setCurrentCart(d.items));
  }, []);
  console.log(currentCart);
  let total = 0;

  const newArr = [];
  currentCart.forEach((e) => newArr.push(e.price));
  total = newArr.reduce((cv, pv) => cv + pv, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      card: {
        number: cardNumber,
        exp_month: cardMonth,
        exp_year: cardYear,
        cvc: cardCvc,
      },
      total_price: total,
    };
    fetch("/charges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then(console.log);
  };

  return (
    <div>
      <Cart cartItems={currentCart} isCheckout={true} />
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="card number"
        />
        <input
          type="text"
          onChange={(e) => setCardMonth(e.target.value)}
          placeholder="month"
        />
        <input
          type="text"
          onChange={(e) => setCardYear(e.target.value)}
          placeholder="year"
        />
        <input
          type="text"
          onChange={(e) => setCardCvc(e.target.value)}
          placeholder="cvc"
        />
        <button type="submit">checkout</button>
      </form>
    </div>
  );
}

export default CheckOut;
