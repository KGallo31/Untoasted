import React, { useState } from "react";
import ItemContainer from "./ItemContainer";
import Cart from "./Cart";

function Home({ items, setCartItems, cartItems, isCardPayment}) {
    
  const changeCart = (item) => {
    const newCart = [...cartItems, item];
    setCartItems(newCart);
  };

  return (
    <div>
      <ItemContainer items={items} changeCart={changeCart} />
      <Cart cartItems={cartItems} isCardPayment={isCardPayment} isCheckOut={true}/>
    </div>
  );
}

export default Home;
