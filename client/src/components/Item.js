import React from "react";

function Item({ item, changeCart }) {
  return (
    <div className="Item-button" onClick={() => changeCart(item)}>
      <div  style={{width: '100&'}} >
        <img 
        src={item.image_url} 
        alt="image-link-failed.png"
        style={{width: '100%', height: '190px',borderRadius: '10px'}}

         />
      </div>
      <div style={{height: '90px'}}>
        <h5 style={{marginTop: '0.5%'}}>{item.name}</h5>
        <p style={{marginTop: '9%'}}> {item.quantity} left </p>
      </div>
    </div>
  );
}

export default Item;
