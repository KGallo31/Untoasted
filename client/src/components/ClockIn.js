import React, { useState } from "react";
import { Link } from "react-router-dom";
import Keypad from "./Keypad";

function ClockIn({ user, setUser, clockIn}) {
  const [pin, setPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggingInUser = {
      username: pin,
    };
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loggingInUser),
    })
      .then((r) => r.json())
      .then(setUser);
  };

  const changePin = (num) => {
    if(num === ""){
      setPin("")
      return;
    }
    const currentPin = pin + num;
    setPin(currentPin);
  };

  if (!user || user.errors) {
    return (
      <div style={{ width: "auto" }}>
        <div className="lander-flex">
          <div className="landing-image-container">
            <img
              src="https://res.cloudinary.com/april-skrine/image/upload/v1650481069/unlogo-removebg-preview_wyv574.png"
              alt="logo.png"
            />
          </div>
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Keypad onClickFunc={changePin} />
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1> Welcome {user.name} </h1>
      {user.clocked_in ? (
        <button onClick={clockIn}>Clock Out</button>
      ) : (
        <Link to="/home">
          <button className='' onClick={clockIn}>Clock In</button>
        </Link>
      )}
    </div>
  );
}

export default ClockIn;
