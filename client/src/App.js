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
        setItems(items.sort((a, b) =>   a.id - b.id)); //Calls /Items endpoint to retrieve current options from DB 
      });
  }, [user]); 

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then(setUser); // If user is logged in already bring them to clock in screen 
      } else {
        r.json().then(() => navigate("/"));  // If user is not logged in then bring them to pin screen
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
            user={user}
              items={items}
              setCartItems={setCartItems}
              cartItems={cartItems}
              setIsCardPayment={setIsCardPayment}
              clockIn={clockIn}
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
