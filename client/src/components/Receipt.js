import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Receipt() {
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetch(`/receipts/${params.id}`)
      .then((r) => r.json())
      .then(setCurrentReceipt);
  }, []);

  if (currentReceipt) {
    return (
      <div style={{ width: "100%", textAlign: "center", color: "white" }}>
        <div style={{ marginBottom: "-125px" }}>
          <img src="https://res.cloudinary.com/april-skrine/image/upload/v1650481069/unlogo-removebg-preview_wyv574.png" />
        </div>
        <div
          style={{
            display: "inlineBlock",
            textAlign: "left",
            margin: "0 auto",
            flexDirection: "column",
            width: "450px",
            position: "relative",
            border: "2px solid lightgrey",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <div>
            <h1
              style={{
                textAlign: "center",
                backgroundColor: "#00008B",
                padding: "20px",
                marginTop: "-10px",
                marginLeft: "-8px",
                marginRight: "-8px",
              }}
            >
              Receipt for Order Number {params.id}
            </h1>
            <hr></hr>
            <p>
              Amount paid: $
              {currentReceipt.receipt_details.total_price.toFixed(2)}
            </p>
            <p>Date Paid {currentReceipt.receipt_details.date_processed}</p>
            <p>
              Payment Details: {currentReceipt.receipt_details.card_type}-
              {currentReceipt.receipt_details.last4}
            </p>
          </div>
          <div>
            <h3> Items Bought: </h3>
            <div style={{ textAlign: "justify", textIndent: "40px" }}>
              {currentReceipt.items.map((i) => {
                return (
                  <p>
                    {i.name} price: ${i.price}{" "}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <Link to="/home">
            <button className="Receipt-button">Home</button>
          </Link>
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default Receipt;
