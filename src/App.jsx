import { useState } from "react";
import "./App.css";
import FrontCard from "./components/frontCard";
import BackCard from "./components/backCard";
import Form from "./components/Form";
import Succes from "./components/Succes";
function App() {
  const [cardData, setCardData] = useState({
    CSV: "000",
    cardNumber: "0000 0000 0000 0000",
    carholderName: "",
    month: "",
  });
  const [success, setSucces] = useState(false);

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
        {!success && (
          <div className="FormBox">
            <Form
              GetValues={GetValues}
              submit={() => {
                setSucces(true);
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
