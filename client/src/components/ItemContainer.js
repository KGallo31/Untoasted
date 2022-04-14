import React from "react";
import Item from "./Item";

function ItemContainer({ items, changeCart }) {
  return (
    <div>
      {items.map((item) => {
        return <Item key={item.id} item={item} changeCart={changeCart} />;
      })}
    </div>
  );
}

export default ItemContainer;
