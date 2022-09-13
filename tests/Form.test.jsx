import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vitest as jest } from "vitest";
import Form from "../src/components/Form";
import CreditCard from "./fixtures/CrediCard";
import formatter from "../src/helpers/formatter";
import App from "../src/App";
import { Provider } from "react-redux";
import store from "../src/store";

const validCreditCard = new CreditCard({
  name: "Sebastian Poveda Florez",
  number: "1234567812345678",
  CSV: "420",
  date: "2023-07",
});

describe("Form funciona", () => {
  const GetValues = jest.fn();
  const submit = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("comprobaciones de nombre", () => {
    render(<Form GetValues={GetValues}></Form>);

    const holderNameInput = screen.getByLabelText("NameInput");

    expect(holderNameInput.validity.valid).toBeFalsy(); //! Campo no puede estar vacio

    fireEvent.input(holderNameInput, {
      target: { value: "Sebastian Poveda2" },
    });

    expect(holderNameInput.validity.valid).toBeFalsy(); //! Campo no puede contener numeros

    fireEvent.input(holderNameInput, {
      target: { value: validCreditCard.name },
    });

    expect(holderNameInput.validity.valid).toBeTruthy(); //* tiene texto
  });

  test("comprobaciones de numero de tarjeta ", () => {
    render(<Form GetValues={GetValues}></Form>);

    const holderCardInput = screen.getByLabelText("CardNumberInput");

    expect(holderCardInput.validity.valid).toBeFalsy(); //!esta vacio

    fireEvent.input(holderCardInput, { target: { value: "abcdefgabcdefgui" } });

    expect(holderCardInput.validity.valid).toBeFalsy(); //! no son numeros

    fireEvent.input(holderCardInput, { target: { value: "12345678 2345678" } });

    expect(holderCardInput.validity.valid).toBeFalsy(); //! contiene espacios

    fireEvent.input(holderCardInput, {
      target: { value: validCreditCard.number + "1" },
    });

    expect(holderCardInput.value).toBe(validCreditCard.number); //? esperamos que el formateador del input no deje agregar mas numeros luego de 16 caracteres

    fireEvent.input(holderCardInput, { target: { value: "234567812345678" } });

    expect(holderCardInput.validity.valid).toBeFalsy(); //! contiene un numero menos

    fireEvent.input(holderCardInput, {
      target: { value: validCreditCard.number },
    }); //* exactame 16 caracteres numericos

    expect(holderCardInput.validity.valid).toBeTruthy();
  });

  test("comprobaciones de Fechas", () => {
    render(<Form GetValues={GetValues}></Form>);

    const CardDateInput = screen.getByLabelText("CardDateInput");

    expect(CardDateInput.validity.valid).toBeFalsy(); //! Campo no puede estar vacio

    fireEvent.input(CardDateInput, { target: { value: validCreditCard.date } });

    expect(CardDateInput.validity.valid).toBeTruthy(); //* tiene fecha
  });

  test("comprobaciones de CSV", () => {
    render(<Form GetValues={GetValues}></Form>);

    const CSV = screen.getByLabelText("CSV");

    expect(CSV.validity.valid).toBeFalsy(); //! Campo no puede estar vacio

    fireEvent.input(CSV, { target: { value: "44" } });

    expect(CSV.validity.valid).toBeFalsy(); //! Campo no puede contener menos de 3 numeros
    fireEvent.input(CSV, { target: { value: "4444" } });

    expect(CSV.validity.valid).toBeFalsy(); //! Campo no puede contener mas de 3 numeros

    fireEvent.input(CSV, { target: { value: validCreditCard.CSV } });

    expect(CSV.validity.valid).toBeTruthy(); //* contiene numero exacto
  });

  test("test Submit", () => {
    render(<Form GetValues={GetValues} submit={submit}></Form>);
    const holderNameInput = screen.getByLabelText("NameInput");
    const holderCardInput = screen.getByLabelText("CardNumberInput");
    const CardDateInput = screen.getByLabelText("CardDateInput");
    const CSV = screen.getByLabelText("CSV");
    const submitButton = screen.getByRole("button");

    fireEvent.click(submitButton);

    expect(submit).not.toHaveBeenCalledOnce(); //! No sera llamado el submit debido a que los campos no han sido completados

    fireEvent.input(holderNameInput, {
      target: { value: validCreditCard.name },
    });
    fireEvent.input(holderCardInput, {
      target: { value: validCreditCard.number },
    });
    fireEvent.input(CardDateInput, { target: { value: validCreditCard.date } });
    fireEvent.input(CSV, { target: { value: validCreditCard.CSV } });
    fireEvent.click(submitButton);

    expect(submit).toHaveBeenCalledOnce(); //* Se espera que el submit se haya llamado satisfactoriamente cuando todos los campos estan completos
    expect(GetValues).toHaveBeenLastCalledWith(
      expect.objectContaining({
        carholderName: validCreditCard.name,
        cardNumber: formatter(validCreditCard.number),
        CSV: validCreditCard.CSV,
        month: validCreditCard.date,
      })
    );
  });
});

describe("Popup", () => {
  test("deberia activarse al haber un error (tacita)", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const holderNameInput = screen.getByLabelText("NameInput");
    const holderCardInput = screen.getByLabelText("CardNumberInput");
    const CardDateInput = screen.getByLabelText("CardDateInput");
    const CSV = screen.getByLabelText("CSV");
    const submitButton = screen.getByRole("button");

    fireEvent.input(holderNameInput, {
      target: { value: validCreditCard.name },
    });
    fireEvent.input(holderCardInput, {
      target: { value: validCreditCard.number },
    });
    fireEvent.input(CardDateInput, { target: { value: "2020-07" } });
    fireEvent.input(CSV, { target: { value: validCreditCard.CSV } });

    expect(store.getState().popups.errorInesperado).toBeFalsy();

    fireEvent.click(submitButton);

    expect(store.getState().popups.errorInesperado).toBeTruthy();
  });
  test("deberia activarse al haber un error (literal)", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const holderNameInput = screen.getByLabelText("NameInput");
    const holderCardInput = screen.getByLabelText("CardNumberInput");
    const CardDateInput = screen.getByLabelText("CardDateInput");
    const CSV = screen.getByLabelText("CSV");
    const submitButton = screen.getByRole("button");

    fireEvent.input(holderNameInput, {
      target: { value: validCreditCard.name },
    });
    fireEvent.input(holderCardInput, {
      target: { value: validCreditCard.number },
    });
    fireEvent.input(CardDateInput, { target: { value: "2020-07" } });
    fireEvent.input(CSV, { target: { value: validCreditCard.CSV } });

    fireEvent.click(submitButton);
    try {

      expect(screen.getByLabelText("ErrorInesperado")).toBeDefined();

    } catch (error) {
      
      throw new Error('Popup no se muestra')
    }
  });
});
