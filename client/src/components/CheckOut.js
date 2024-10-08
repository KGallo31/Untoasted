import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import Keypad from "./Keypad";

function CheckOut({ setCartItems, setItems }) {
  let params = useParams();
  let navigate = useNavigate();
  let subTotal = 0;
  let total = 0;
  let tax = 0.06; // TODO: add endpoint to get tax rate based on users current location


  const itemPrice = [];
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

  const changeCashAmount = (num) => {
    const arr = [...cashAmount, num];
    if (!arr.includes(".")) {
      if (arr.length > 2) {
        arr.splice(arr.length - 1, 0, ".");
      }
    }
    const findDecimal = (element) => element === ".";
    const indexOfDecimal = arr.findIndex(findDecimal);
    if (arr.slice(indexOfDecimal).length > 3) {
      arr.splice(indexOfDecimal, 1);
      arr.splice(indexOfDecimal + 1, indexOfDecimal + 2, ".", 0, 0);
    }
    setCashAmount(arr);
  };

  currentCart.forEach((e) => {
    itemPrice.push(e.price);
  });
  subTotal = itemPrice.reduce((cv, pv) => cv + pv, 0);
  tax = tax * itemPrice.length;
  total = subTotal + subTotal * tax;

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
      .then((d) => {
        console.log(d);
        if (d.error) {
          alert(d.error);
        } else {
          navigate(`/receipt/${d.id}`);
        }
      });
  };

  const handleCashSubmit = (e) => {
    e.preventDefault();
    const newCash = parseFloat(cashAmount.join(""));
    const cashChange = newCash - total;
    if (cashChange.toFixed(2) < 0.0) {
      alert("Insignificant Amount Of Cash!!!");
    } else {
      setCashAmount(newCash);
      alert(
        `Total: $${total.toFixed(
          2
        )} Cash Paid: $${newCash} Change: $${cashChange.toFixed(2)}`
      );
      fetch("/cash-check-out", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: currentCart }),
      })
        .then((r) => r.json())
        .then(setItems);
      setCartItems([]);
      navigate("/home");
    }
  };

  const renderCheckOut = () => {
    if (isCard) {
      return (
        <div className="creditCardForm">
          <div className="heading">
            <h1>Confirm Purchase</h1>
          </div>
          <div className="payment">
            <form onSubmit={handleSubmit}>
              <div className="form-group" id="card-number-field">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setCardNumber(e.target.value)}
                  id="cardNumber"
                />
              </div>
              <div className="form-group CVV">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setCardCvc(e.target.value)}
                  id="cvv"
                />
              </div>

              <div className="form-group" id="expiration-date">
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
                  <option value="2024"> 2024</option>
                  <option value="2025"> 2025</option>
                  <option value="2026"> 2026</option>
                  <option value="2027"> 2027</option>
                  <option value="2028"> 2028</option>
                  <option value="2029"> 2029</option>
                  <option value="2030"> 2030</option>
                  <option value="2031"> 2031</option>
                </select>
              </div>
              <div className="form-group" id="credit_cards">
                <img src={require("../images/visa.jpg")} id="visa" />
                <img
                  src={require("../images/mastercard.jpg")}
                  id="mastercard"
                />
                <img src={require("../images/amex.jpg")} id="amex" />
              </div>
              <div className="form-group" id="pay-now">
                <button
                  type="submit"
                  className="btn btn-default"
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
      <div className="check-out-flex">
        <form onSubmit={(e) => handleCashSubmit(e)}>
          <h1 style={{ alignSelf: "flex-end" }}>${cashAmount}</h1>
          <Keypad onClickFunc={changeCashAmount} />
        </form>
        <button
          className="calc-button"
          style={{ width: "495px", fontFamily: "impact", fontSize: "40px" }}
          onClick={() => {
            const stringTotal = total.toFixed(2).toString();

            setCashAmount(stringTotal.split(""));
          }}
        >
          Exact Amount
        </button>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: "-3%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20%",
          justifyContent: "center",
          marginLeft: ".5%",
        }}
      >
        <div
        className="receipt-page-cart-container"
        >
          <Cart cartItems={currentCart} isCheckout={false} />

          <div style={{ border: "5px solid black", padding: "" }}>
            <button
              style={{ width: "50%", height: "100%", fontSize: "40px" }}
              onClick={() => setIsCard(false)}
            >
              cash
            </button>
            <button
              style={{
                width: "50%",
                height: "100%",
                fontSize: "40px",
              }}
              onClick={() => setIsCard(true)}
            >
              card
            </button>
          </div>
        </div>
        <div
        className="receipt-page-home-button-container"
        >
          <Link to="/home">
            <button className="Cart-button">Home</button>
          </Link>
        </div>
      </div>
      <div
      className="checkout-main-content-container"
      >
        {renderCheckOut()}
      </div>
    </div>
  );
}

export default CheckOut;
