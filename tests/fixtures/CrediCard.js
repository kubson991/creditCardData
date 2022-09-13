const CreditCard=class CreditCard {
  constructor({name, number, CSV, date}) {
    this.name = name;
    this.number = number;
    this.CSV = CSV;
    this.date = date;
  }
}

export default CreditCard