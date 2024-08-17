import React from "react";
import Item from "./Item";

function ItemContainer({ items, changeCart }) {
  const sortByName = (a,b) => {
    if (a.name > b.name){
      return 1;
    } 
    if (b.name > a.name){
      return -1;
    }
  }

  return (
    <div className="item-container">
      {items.sort(sortByName).map((item) => {
        return <Item key={item.id} item={item} changeCart={changeCart} />;
      })}
    </div>
  );
}

export default ItemContainer;
