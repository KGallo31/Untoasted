import React, { useState } from "react";
import { Link } from "react-router-dom";

function ClockIn({ user, setUser }) {
  const [pin, setPin] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggingInUser = {
      username: username,
      password: pin,
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

  const clockIn = () => {
    const c = !user.clocked_in;
    fetch(`/clockin/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clocked_in: c,
      }),
    })
      .then((r) => r.json())
      .then();
  };

  if (!user || user.errors) {
    return (
        <div style={{width: "auto",display: "flex",flexDirection: "row",alignContent: "center"}}>
      <div className="lander-flex">
        <form onSubmit={(e) => handleSubmit(e)}>
          <table>
            <tr>
              <td>
                <input
                  placeholder="Enter Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                  <button
                    type="button"
                    onClick={() => changePin(1)}
                    className="btn btn-primary"
                  >
                    1
                  </button>
              </td>
              <td>
                  <button
                    type="button"
                    onClick={() => changePin(2)}
                    className="btn btn-primary"
                  >
                    2
                  </button>
              </td>
              <td>
                  <button
                    type="button"
                    onClick={() => changePin(3)}
                    className="btn btn-primary"
                  >
                    3
                  </button>
              </td>
            </tr>
            <tr>
              <td>
                  <button
                    type="button"
                    onClick={() => changePin(4)}
                    className="btn btn-primary"
                  >
                    4
                  </button>
              </td>
              <td>
                  <button
                    type="button"
                    onClick={() => changePin(5)}
                    className="btn btn-primary"
                  >
                    5
                  </button>
              </td>
              <td>
                  <button
                    type="button"
                    onClick={() => changePin(6)}
                    className="btn btn-primary"
                  >
                    6
                  </button>
              </td>
            </tr>
            <tr>
              <td>
                  <button
                    type="button"
                    onClick={() => changePin(7)}
                    className="btn btn-primary"
                  >
                    7
                  </button>
              </td>
              <td>
                  <button
                    type="button"
                    onClick={() => changePin(8)}
                    className="btn btn-primary"
                  >
                    8
                  </button>
              </td>
              <td>
                  <button
                    type="button"
                    onClick={() => changePin(9)}
                    className="btn btn-primary"
                  >
                    9
                  </button>
              </td>
            </tr>
            <tr>
              <td>
                  <button
                    type="button"
                    onClick={() => setPin("")}
                    className="btn btn-primary"
                  >
                    clear
                  </button>
              </td>
              <td>
                  <button
                    type="button"
                    onClick={() => changePin(0)}
                    className="btn btn-primary"
                  >
                    0
                  </button>
              </td>
              <td>
                  <button type="submit" className="btn btn-primary">
                    enter{" "}
                  </button>
              </td>
              <input className="form-control" type="password" value={pin} />
            </tr>
          </table>
        </form>
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
          <button onClick={clockIn}>Clock In</button>
        </Link>
      )}
    </div>
  );
}

export default ClockIn;
