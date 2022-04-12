import React,{useState,useEffect} from 'react'
import ItemContainer from './ItemContainer'
import Cart from './Cart'

function Home({items}) {

    const [cartItems, setCartItems] = useState([])
    const changeCart = (item) => {
        const newCart = [...cartItems,item]
        setCartItems(newCart)
    }
  

  return (
    <div>
        <ItemContainer items={items} changeCart={changeCart}/>
        <Cart cartItems={cartItems}/>
    </div>
  )

}

export default Home