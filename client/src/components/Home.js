import React from "react";
import ItemContainer from "./ItemContainer";
import Cart from "./Cart";
import { Link } from "react-router-dom";

function Home({
  items,
  setCartItems,
  cartItems,
  isCardPayment,
  removeCartItem,
  clockIn,
}) {
  const changeCart = (item) => {
    const newCart = [...cartItems, item];
    setCartItems(newCart);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "no-wrap" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            flexGrow: "1",
            border: "5px solid lightgray",
            margin: ".5%",
            marginRight: "-9px",
            padding: "10px",
            borderRadius: "10px",
            width: "100%",
            backgroundColor: "darkblue",
          }}
        >
          <Cart
            cartItems={cartItems}
            isCardPayment={isCardPayment}
            isCheckOut={true}
            setCartItems={setCartItems}
          />
        </div>
        <div style={{ alignSelf: "center" }}>
          <Link to="/">
            <button
              onClick={clockIn}
              style={{ width: "100%" }}
              className="Cart-button"
            >
              Clock Out
            </button>
          </Link>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          flexGrow: "2",
          marginLeft: "2%",
        }}
      >
        <ItemContainer items={items} changeCart={changeCart} />
      </div>
    </div>
  );
}

export default Home;
