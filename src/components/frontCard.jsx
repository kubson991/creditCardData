import { useEffect } from "react";
import "./frontCard.css";

function dateFormatter(date) {
  if (date) {
    const formattedDate = date.split("-");
    return formattedDate[0].slice(2) + " / " + formattedDate[1];
  } else {
    return "00 / 00"
  }
}
function FrontCard({ number, carholderName, month }) {
  return (
    <div className="Card">
      <div className="circles">
        <div></div>
        <div></div>
      </div>
      <p className="numberCard">{number ? number : "0000 0000 0000 0000"}</p>
      <p className="Name">{carholderName ? carholderName : "John Doe"}</p>
      <p className="date">{dateFormatter(month)}</p>
    </div>
  );
}

export default FrontCard;
