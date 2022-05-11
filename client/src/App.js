import { React, useState, useEffect } from "react";
import ClockIn from "./components/ClockIn";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import CheckOut from "./components/CheckOut";
import Receipt from "./components/Receipt";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [isCardPayment, setIsCardPayment] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/items")
      .then((r) => r.json())
      .then((items) => {
        setItems(items.sort((a, b) => a.id - b.id));
      });
  }, [user]);
  console.log(items.sort((a, b) => a.id - b.id));

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then(setUser);
      } else {
        r.json().then(() => navigate("/"));
      }
    });
  }, []);
  const clockIn = () => {
    const c = !user.clocked_in;
    fetch(`/clockin/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clocked_in: c,
        clock_out: new Date(),
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (user.clocked_in) {
          setUser(null);
        } else {
          setUser(d);
        }
      });
  };

  // const removeCartItem = (item) => {
  //   const findItemIndex = (element) => {
  //     console.log(element,item)
  //     return element.id != item.id
  //   }
  //   const indexCurrentItem = cartItems.findIndex(findItemIndex)
  //   console.log(cartItems.findIndex(findItemIndex))
  //   const newCart = cartItems.splice(indexCurrentItem)
  //   setCartItems(newCart)
  // }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<ClockIn clockIn={clockIn} user={user} setUser={setUser} />}
        />
        <Route
          path="/home"
          element={
            <Home
              items={items}
              user={user}
              setCartItems={setCartItems}
              cartItems={cartItems}
              setIsCardPayment={setIsCardPayment}
              clockIn={clockIn}
              // removeCartItem={removeCartItem}
            />
          }
        />
        <Route
          path="/checkout/:id"
          element={<CheckOut setItems={setItems} setCartItems={setCartItems} />}
        />
        <Route
          path="receipt/:id"
          element={<Receipt setCartItems={setCartItems} />}
        />
      </Routes>
    </div>
  );
}

export default App;
