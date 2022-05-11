import React, { useState } from "react";
import { Link } from "react-router-dom";

function ClockIn({ user, setUser,clockIn}) {
  const [pin, setPin] = useState("");
  // const [username, setUsername] = useState("");

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
    const currentPin = pin + num;
    setPin(currentPin);
  };

  if (!user || user.errors) {
    return (
      <div style={{ width: "auto" }}>
        <div className="lander-flex">
          <div style={{ flexGrow: "4" }}>
            <img
              src="https://res.cloudinary.com/april-skrine/image/upload/v1650481069/unlogo-removebg-preview_wyv574.png"
              alt="logo.png"
            />
          </div>
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <table style={{ fontFamily: "impact", fontSize: "40px" }}>
                <tr>
                </tr>
                <tr style={{ width: "300px" }}>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className="calc-button"
                      style={{ width: "100%" }}
                      type="button"
                      onClick={() => changePin(1)}
                    >
                      1
                    </button>
                  </td>
                  <td>
                    <button
                      className="calc-button"
                      style={{ width: "100%" }}
                      type="button"
                      onClick={() => changePin(2)}
                    >
                      2
                    </button>
                  </td>
                  <td>
                    <button
                      className="calc-button"
                      style={{ width: "100%" }}
                      type="button"
                      onClick={() => changePin(3)}
                    >
                      3
                    </button>
                  </td>
                </tr>
                <tr style={{ width: "300px" }}>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className="calc-button"
                      style={{ width: "100%" }}
                      type="button"
                      onClick={() => changePin(4)}
                    >
                      4
                    </button>
                  </td>
                  <td>
                    <button
                      className="calc-button"
                      style={{ width: "100%" }}
                      type="button"
                      onClick={() => changePin(5)}
                    >
                      5
                    </button>
                  </td>
                  <td>
                    <button
                      className="calc-button"
                      style={{ width: "100%" }}
                      type="button"
                      onClick={() => changePin(6)}
                    >
                      6
                    </button>
                  </td>
                </tr>
                <tr style={{ width: "300px" }}>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className="calc-button"
                      style={{ width: "100%" }}
                      type="button"
                      onClick={() => changePin(7)}
                    >
                      7
                    </button>
                  </td>
                  <td>
                    <button
                      className="calc-button"
                      style={{ width: "100%" }}
                      type="button"
                      onClick={() => changePin(8)}
                    >
                      8
                    </button>
                  </td>
                  <td>
                    <button
                      className="calc-button"
                      style={{ width: "100%" }}
                      type="button"
                      onClick={() => changePin(9)}
                    >
                      9
                    </button>
                  </td>
                </tr>
                <tr style={{ width: "300px" }}>
                  <td>
                    <button
                      type="button"
                      className="calc-button"
                      onClick={() => setPin("")}
                      style={{ width: "105px" }}
                    >
                      clear
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="calc-button"
                      onClick={() => changePin(0)}
                      style={{ width: "105px" }}
                    >
                      0
                    </button>
                  </td>
                  <td>
                    <button
                      type="submit"
                      className="calc-button"
                      style={{ width: "105px" }}
                    >
                      enter{" "}
                    </button>
                  </td>
                </tr>
              </table>
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
