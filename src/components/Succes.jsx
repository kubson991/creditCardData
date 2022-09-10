import "./Succes.css";
import img from "../assets/icon-complete.svg";

function Succes({ done }) {
  return (
    <section className="Succes">
      <img src={img} alt="succes" />
      <h1>THANK YOU!</h1>
      <p>We`ve added your card details</p>
      <button onClick={done}>Continue</button>
    </section>
  );
}

export default Succes;
