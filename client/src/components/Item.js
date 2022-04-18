import React from "react";

function Item({ item, changeCart }) {
  return (
    <div style={{ width: "40%", margin: '0.5%', padding: '10px', border: '5px solid lightgray', textAlign: 'center'}}>
      <div onClick={() => changeCart(item)}>
        <h5>{item.name}</h5>
        <img src={item.image_url} alt="lol.png" />
        <p> {item.price}/ea </p>
        <p> {item.quantity} left </p>
      </div>
    </div>
  );
}

export default Item;
