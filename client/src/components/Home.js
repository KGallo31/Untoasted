import React, { useState } from "react";
import ItemContainer from "./ItemContainer";
import Cart from "./Cart";

function Home({ items, user, setCartItems, cartItems, setSale }) {
  const changeCart = (item) => {
    const newCart = [...cartItems, item];
    setCartItems(newCart);
  };

  return (
    <div>
      <ItemContainer items={items} changeCart={changeCart} />
      <Cart cartItems={cartItems} isCheckout={false} />
    </div>
  );
}

export default Home;
