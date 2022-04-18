import React from "react";
import Item from "./Item";

function ItemContainer({ items, changeCart }) {
  return (
    <div style={{width: '100%', display: 'flex', flexFlow: 'row wrap',}}>
      {items.map((item) => {
        return <Item key={item.id} item={item} changeCart={changeCart} />;
      })}
    </div>
  );
}

export default ItemContainer;
