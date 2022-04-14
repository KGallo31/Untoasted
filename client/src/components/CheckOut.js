import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Cart from './Cart'

function CheckOut({items}) {
    let params = useParams()
    
    const [currentCart,setCurrentCart] = useState([])

    useEffect( () => {
        fetch(`/currentCart/${params.id}`).then(r=>r.json()).then(d => setCurrentCart(d.items))
    },[])
    console.log(currentCart)
    let total = 0;

  const newArr = [];
  currentCart.forEach((e) => newArr.push(e.price));
  total = newArr.reduce((cv, pv) => cv + pv, 0);





  return (
    <div>
        <Cart cartItems={currentCart} isCheckout={true}/>
    </div>
  )
}

export default CheckOut