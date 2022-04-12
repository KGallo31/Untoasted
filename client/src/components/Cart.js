import React, {useState} from 'react'
import CartItem from './CartItem'

function Cart({cartItems}) {

    console.log(cartItems)
    let total = 0


    if(cartItems.length > 0){
        total = cartItems.reduce((cv,pv) => cv.price + pv.price)
        console.log(total)
    }

    

  return (
    <div>
        {cartItems.map((item)=> {
            return <CartItem key={item.id} item={item}/>
        })}

        {/* <CartItem /> */}
        {/* {cartItems.map(item => {
            <CartItem item={item}/>
        })} */}
    </div>
  )

}

export default Cart