import "./Form.css";
import { useState, useEffect } from "react";
import formatter from "../helpers/formatter";

function Form({ GetValues, submit }) {
  const [number, setNumber] = useState("");
  const [numberHelper, setnumberHelper] = useState("");

  useEffect(() => {
    if (
      !/^(?:(?![-\a-zA-Z(\,.$%)\ `+*\{\}\]\[=:;/_ \\]).)+$/.test(number) ||
      number.length > 16
    ) {
      setNumber(number.substring(0, number.length - 1));
    }
    const formattedValue = formatter(number);
    setnumberHelper(formattedValue);
  }, [number]);

  useEffect(() => {
    const { CSV, carholderName, month } =
      document.getElementById("creditCardForm").elements;
    GetValues({
      CSV: CSV.value,
      cardNumber: numberHelper,
      carholderName: carholderName.value,
      month: month.value,
    });
    if (document.getElementById("CUSTOM").value.length < 16) {
      document
        .getElementById("CUSTOM")
        .setCustomValidity(
          "El numero de la targeta debe ser de 16 caracteres."
        );
    } else {
      document.getElementById("CUSTOM").setCustomValidity("");
    }
  }, [numberHelper]);

  function showOptions(e) {
    e.target.showPicker();
  }
  function Submit(event) {
    event.preventDefault();
    const { CSV, carholderName, month } = event.target.elements;
    GetValues({
      CSV: CSV.value,
      cardNumber: numberHelper,
      carholderName: carholderName.value,
      month: month.value,
    });
    submit();
  }
  function ElemntChange() {
    const { CSV, carholderName, month } =
      document.getElementById("creditCardForm").elements;
    GetValues({
      CSV: CSV.value,
      cardNumber: numberHelper,
      carholderName: carholderName.value,
      month: month.value,
    });
  }

  return (
    <section className="Form">
      <form onSubmit={Submit} id="creditCardForm" name="CrediCardForm">
        <div className="name ">
          <label htmlFor="carholderName" className="formLabel">
            CARDHOLDER NAME
          </label>
          <input
            type="text"
            name="carholderName"
            className="formInput"
            placeholder="e.g Jane Appleseed"
            onInput={ElemntChange}
            required
            aria-label="NameInput"
            pattern="^(?!(.*\d+.*)$).+$"
          />
        </div>
        <div className="number">
          <label htmlFor="cardNumber" className="formLabel">
            CARD NUMBER
          </label>
          <div className="containerCarnumber" cardnumber={numberHelper}>
            <input
              id="CUSTOM"
              type="text"
              name="cardNumber"
              className="formInput"
              placeholder="e.g 1234 5678 9123 0000"
              required
              onInput={(e) => {
                setNumber(e.target.value);
              }}
              value={number}
              aria-label="CardNumberInput"
            />
          </div>
        </div>
        <div className="date">
          <div className="monthAndYear">
            <label htmlFor="month" className="formLabel">
              EXP.DATE (MM/YY)
            </label>
            <input
              type="month"
              name="month"
              className="formInput"
              onClick={showOptions}
              required
              onInput={ElemntChange}
              aria-label="CardDateInput"
            />
          </div>
          <div className="CSV">
            <label htmlFor="CSV" className="formLabel">
              CSV
            </label>
            <input
              min="100"
              max="999"
              type="number"
              name="CSV"
              className="formInput"
              placeholder="e.g. 123"
              required
              onInput={ElemntChange}
              aria-label="CSV"
            />
          </div>
        </div>
        <button type="submit" className="submitButton">
          {" "}
          Confirm
        </button>
      </form>
    </section>
  );
}

export default Form;
