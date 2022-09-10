import "./backCard.css";

function BackCard({ CSV }) {
  return (
    <div className="BackCard">
      <p className="CSV">{CSV ? CSV : "000"}</p>
    </div>
  );
}

export default BackCard;
