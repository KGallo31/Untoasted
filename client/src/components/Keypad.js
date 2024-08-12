import React from "react";

function Keypad({ onClickFunc, }) {
    return(
        <table style={{ fontFamily: "impact", fontSize: "40px" }}>
        <tr style={{ width: "300px" }}>
          <td style={{ textAlign: "right" }}>
            <button
              className="calc-button"
              type="button"
              onClick={() => onClickFunc(1)}
            >
              1
            </button>
          </td>
          <td>
            <button
              className="calc-button"
              type="button"
              onClick={() => onClickFunc(2)}
            >
              2
            </button>
          </td>
          <td>
            <button
              className="calc-button"
              type="button"
              onClick={() => onClickFunc(3)}
            >
              3
            </button>
          </td>
        </tr>
        <tr style={{ width: "300px" }}>
          <td style={{ textAlign: "right" }}>
            <button
              className="calc-button"
              type="button"
              onClick={() => onClickFunc(4)}
            >
              4
            </button>
          </td>
          <td>
            <button
              className="calc-button"
              type="button"
              onClick={() => onClickFunc(5)}
            >
              5
            </button>
          </td>
          <td>
            <button
              className="calc-button"
              type="button"
              onClick={() => onClickFunc(6)}
            >
              6
            </button>
          </td>
        </tr>
        <tr style={{ width: "300px" }}>
          <td style={{ textAlign: "right" }}>
            <button
              className="calc-button"
              type="button"
              onClick={() => onClickFunc(7)}
            >
              7
            </button>
          </td>
          <td>
            <button
              className="calc-button"
              type="button"
              onClick={() => onClickFunc(8)}
            >
              8
            </button>
          </td>
          <td>
            <button
              className="calc-button"
              type="button"
              onClick={() => onClickFunc(9)}
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
              onClick={() => onClickFunc("")}
            >
              clear
            </button>
          </td>
          <td>
            <button
              type="button"
              className="calc-button"
              onClick={() => onClickFunc(0)}
            >
              0
            </button>
          </td>
          <td>
            <button type="submit" className="calc-button">
              enter{" "}
            </button>
          </td>
        </tr>
      </table>
    )
}

export default Keypad;