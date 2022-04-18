import React from "react";
import ItemContainer from "./ItemContainer";
import Cart from "./Cart";

function Home({ items, setCartItems, cartItems, isCardPayment }) {
  const changeCart = (item) => {
    const newCart = [...cartItems, item];
    setCartItems(newCart);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "no-wrap" }}>
      <div style={{ flexGrow: "1", border: '5px solid lightgray', margin: '0.5%', padding: '10px'}}>
        <Cart
          cartItems={cartItems}
          isCardPayment={isCardPayment}
          isCheckOut={true}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          flexGrow: "2"
        }}
      >
        <ItemContainer items={items} changeCart={changeCart} />
      </div>
    </div>
  );
}

export default Home;
