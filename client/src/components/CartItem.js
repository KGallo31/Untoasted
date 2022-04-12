import React from 'react'

function CartItem({item}) {
    // console.log("hi")
  
    return (
    <div>
        <p> {item.name},{item.price}</p>
    </div>
  )
}

export default CartItem