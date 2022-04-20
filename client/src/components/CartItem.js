import React from "react";

function CartItem({ item, removeCartItem }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "no-wrap",
        border: "2px solid darkblue",
        margin: "-3%",
        backgroundColor: "lightblue",
        justifyContent: "space-between",
        marginTop: '1%'
      }}
    >
      <p style={{ paddingLeft: "1px", alignSelf: "flex-start" }}>{item.name}</p>
      <p style={{ paddingRight: "1px", alignSelf: "flex-end" }}>{item.price}</p>
    </div>
  );
}

export default CartItem;
