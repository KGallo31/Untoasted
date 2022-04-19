import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cart from "./Cart";

function CheckOut({}) {
  let params = useParams();
  let navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [isCard, setIsCard] = useState(false);

  const [currentCart, setCurrentCart] = useState([]);

  useEffect(() => {
    fetch(`/currentCart/${params.id}`)
      .then((r) => r.json())
      .then((d) => setCurrentCart(d.items));
  }, []);

  let total = 0;

  const changeCashAmount = (num) => {
    const cash = cashAmount + num;
    setCashAmount(cash);
  };

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
      sale_id: params.id,
    };
    fetch("/charges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then(() => navigate(`/receipt/${params.id}`));
  };

  const renderCheckOut = () => {
    if (isCard) {
      return (
        <div class="creditCardForm">
          <div class="heading">
            <h1>Confirm Purchase</h1>
          </div>
          <div class="payment">
            <form onSubmit={handleSubmit}>
              <div class="form-group" id="card-number-field">
                <label for="cardNumber">Card Number</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => setCardNumber(e.target.value)}
                  id="cardNumber"
                />
              </div>
              <div class="form-group CVV">
                <label for="cvv">CVV</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => setCardCvc(e.target.value)}
                  id="cvv"
                />
              </div>

              <div class="form-group" id="expiration-date">
                <label>Expiration Date</label>
                <select onChange={(e) => setCardMonth(e.target.value)}>
                  <option value="01">January</option>
                  <option value="02">February </option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select onChange={(e) => setCardYear(e.target.value)}>
                  <option value="2022"> 2022</option>
                  <option value="2023"> 2023</option>
                  <option value="2024"> 2024</option>
                  <option value="2025"> 2025</option>
                  <option value="2026"> 2026</option>
                  <option value="2027"> 2027</option>
                </select>
              </div>
              <div class="form-group" id="credit_cards">
                <img src={require("../images/visa.jpg")} id="visa" />
                <img
                  src={require("../images/mastercard.jpg")}
                  id="mastercard"
                />
                <img src={require("../images/amex.jpg")} id="amex" />
              </div>
              <div class="form-group" id="pay-now">
                <button
                  type="submit"
                  class="btn btn-default"
                  id="confirm-purchase"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div style={{ width: "auto" }}>
        <div className="check-out-flex">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h1 style={{alignSelf: "flex-end"}}>{cashAmount}</h1>
            
            <table style={{ fontFamily: "impact", fontSize: "40px" }}>
              <tr style={{ width: "300px" }}>
                <td style={{ textAlign: "right" }}>
                  <button
                    className="calc-button"
                    type="button"
                    onClick={() => changeCashAmount(1)}
                  >
                    1
                  </button>
                </td>
                <td>
                  <button
                    className="calc-button"
                    type="button"
                    onClick={() => changeCashAmount(2)}
                  >
                    2
                  </button>
                </td>
                <td>
                  <button
                    className="calc-button"
                    type="button"
                    onClick={() => changeCashAmount(3)}
                  >
                    3
                  </button>
                </td>
              </tr>
              <tr style={{ width: "300px" }}>
                <td style={{ textAlign: "right" }}>
                  <button
                    className="calc-button"
                    type="button"
                    onClick={() => changeCashAmount(4)}
                  >
                    4
                  </button>
                </td>
                <td>
                  <button
                    className="calc-button"
                    type="button"
                    onClick={() => changeCashAmount(5)}
                  >
                    5
                  </button>
                </td>
                <td>
                  <button
                    className="calc-button"
                    type="button"
                    onClick={() => changeCashAmount(6)}
                  >
                    6
                  </button>
                </td>
              </tr>
              <tr style={{ width: "300px" }}>
                <td style={{ textAlign: "right" }}>
                  <button
                    className="calc-button"
                    type="button"
                    onClick={() => changeCashAmount(7)}
                  >
                    7
                  </button>
                </td>
                <td>
                  <button
                    className="calc-button"
                    type="button"
                    onClick={() => changeCashAmount(8)}
                  >
                    8
                  </button>
                </td>
                <td>
                  <button
                    className="calc-button"
                    type="button"
                    onClick={() => changeCashAmount(9)}
                  >
                    9
                  </button>
                </td>
              </tr>
              <tr style={{ width: "300px" }}>
                <td>
                  <button
                    type="button"
                    className="calc-button"
                    onClick={() => setCashAmount("")}
                  >
                    clear
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="calc-button"
                    onClick={() => changeCashAmount(0)}
                  >
                    0
                  </button>
                </td>
                <td>
                  <button
                    type="submit"
                    className="calc-button"
                  >
                    enter{" "}
                  </button>
                </td>
              </tr>
            </table>
          </form>
          <button
            className="calc-button"
            style={{ width: "495px" , fontFamily: "impact", fontSize: "40px" }}
            onClick={() => setCashAmount(total)}
          >
            Exact Amount
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "no-wrap" }}>
      <div
        style={{
          // flexGrow: "1",
          border: "5px solid lightgray",
          margin: "0.5%",
          padding: "10px",
        }}
      >
        <Cart cartItems={currentCart} isCheckout={false} />

        <button onClick={() => setIsCard(false)}>cash</button>
        <button onClick={() => setIsCard(true)}>card</button>
      </div>
      {renderCheckOut()}
    </div>
  );
}

export default CheckOut;
