import { useState } from "react";
import "./App.css";
import FrontCard from "./components/frontCard";
import BackCard from "./components/backCard";
import Form from "./components/Form";
import Succes from "./components/Succes";
import { useSelector, useDispatch } from "react-redux";
import { onError, reset } from "./store";

function App() {
  const { errorInesperado } = useSelector((state) => state.popups);
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState({
    CSV: "000",
    cardNumber: "0000 0000 0000 0000",
    carholderName: "",
    month: "",
  });
  const [success, setSucces] = useState(false);

  const fetchInfo = () => {
    try {
      const date = cardData.month.split("-");
      const today = new Date();
      if (
        parseInt(date[0]) < today.getFullYear() ||
        (parseInt(date[0]) === today.getFullYear() &&
          parseInt(date[1]) < today.getMonth() + 1)
      ) {
        throw new Error("Se vencio");
      }
      setSucces(true);
    } catch (error) {
      dispatch(onError());
    }
  };

  function GetValues(values) {
    setCardData({ ...values });
  }

  return (
    <div className="App">
      <section className="cardContainer">
        <div className="frontCard">
          <FrontCard
            number={cardData.cardNumber}
            carholderName={cardData.carholderName}
            month={cardData.month}
          ></FrontCard>
        </div>
        <div className="backCard">
          <BackCard CSV={cardData.CSV}></BackCard>
        </div>
      </section>
      <section className="FormContainer">
        {errorInesperado && (
          <div className="Alert">
            <div className="alert_Icon" onClick={() => dispatch(reset())}></div>
            <p aria-label="ErrorInesperado">Error Inesperado</p>
          </div>
        )}
        {!success && (
          <div className="FormBox">
            <Form
              GetValues={GetValues}
              submit={() => {
                fetchInfo();
              }}
            ></Form>
          </div>
        )}
        {success && (
          <div className="FormBox">
            <Succes
              done={() => {
                setSucces(false);
              }}
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
