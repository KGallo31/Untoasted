import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cart from "./Cart";

function CheckOut({ }) {
  let params = useParams();
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cashAmount, setCashAmount] = useState("")
  const [isCard,setIsCard] = useState(false)

  const [currentCart, setCurrentCart] = useState([]);

  useEffect(() => {
    fetch(`/currentCart/${params.id}`)
      .then((r) => r.json())
      .then((d) => setCurrentCart(d.items));
  }, []);

  let total = 0;

  const changeCashAmount = (num) => {
      const cash = num + cashAmount
      setCashAmount(cash)
  }

  const newArr = [];
  currentCart.forEach((e) => newArr.push(e.price));
  total = newArr.reduce((cv, pv) => cv + pv, 0);

  const handleSubmit = (e) => {
    const form = document.getElementById('form');
    e.preventDefault();
    const data = {
      card: {
        number: cardNumber,
        exp_month: cardMonth,
        exp_year: cardYear,
        cvc: cardCvc,
      },
      total_price: total,
      sale_id: params.id
    };  
    fetch("/charges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then(console.log);
      form.reset()
  };

  const renderCheckOut = () => {
      if(isCard){
        return (
        <div>
        <form id="form" onSubmit={handleSubmit}>
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
        </div>)
      }
      return (
      <div>
        <div className="row">
              <div className="col-sm align-self-center">
                <button
                  type="button"
                  onClick={() => changeCashAmount(1)}
                  className="btn btn-primary"
                >
                  1
                </button>
              </div>
              <div className="col-sm align-self-center">
                <button
                  type="button"
                  onClick={() => changeCashAmount(2)}
                  className="btn btn-primary"
                >
                  2
                </button>
              </div>
              <div className="col-sm align-self-center">
                <button
                  type="button"
                  onClick={() => changeCashAmount(3)}
                  className="btn btn-primary"
                >
                  3
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <button
                  type="button"
                  onClick={() => changeCashAmount(4)}
                  className="btn btn-primary"
                >
                  4
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  onClick={() => changeCashAmount(5)}
                  className="btn btn-primary"
                >
                  5
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  onClick={() => changeCashAmount(6)}
                  className="btn btn-primary"
                >
                  6
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <button
                  type="button"
                  onClick={() => changeCashAmount(7)}
                  className="btn btn-primary"
                >
                  7
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  onClick={() => changeCashAmount(8)}
                  className="btn btn-primary"
                >
                  8
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  onClick={() => changeCashAmount(9)}
                  className="btn btn-primary"
                >
                  9
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <button
                  type="button"
                  onClick={() => setCashAmount("")}
                  className="btn btn-primary"
                >
                  clear
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => changeCashAmount(0)}
                >
                  0
                </button>
              </div>
              <div className="col-sm">
                <button type="submit" className="btn btn-primary">
                  enter{" "}
                </button>
                </div>
                <div>
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={() => changeCashAmount(total)}
                >
                  Exact Amount
                </button>
            <input className="form-control" type="text" value={cashAmount} />
          </div>
                </div>
        </div>
              )
            }

  return (
    <div>
      <Cart cartItems={currentCart} isCheckout={false} />
      <button onClick={() => setIsCard(false)}>cash</button>
      <button onClick={() => setIsCard(true)}>card</button>
      {renderCheckOut()}
    </div>
  )
}

export default CheckOut;
