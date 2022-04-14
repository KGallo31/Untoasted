import React from "react";

function Item({ item, changeCart }) {
  return (
    <div>
      <div className="pull-right">
        <div onClick={() => changeCart(item)} className="card w-75">
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <img src={item.image_url} alt="lol.png" />
            <p className="card-text"> {item.price}/ea </p>
            <p> {item.quantity} left </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
