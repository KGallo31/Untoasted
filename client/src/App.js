import { React, useState, useEffect } from "react";
import ClockIn from "./components/ClockIn";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import CheckOut from "./components/CheckOut";

function App() {
  const [cartItems, setCartItems] = useState([]);
  // const [sale,setSale] = useState([])

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/items")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then(setUser);
      } else {
        r.json().then(() => navigate("/"));
      }
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<ClockIn user={user} setUser={setUser} />} />
        <Route
          path="/home"
          element={
            <Home
              items={items}
              user={user}
              setCartItems={setCartItems}
              cartItems={cartItems}
            />
          }
        />
        <Route path="/checkout/:id" element={<CheckOut items={items} />} />
      </Routes>
    </div>
  );
}

export default App;
