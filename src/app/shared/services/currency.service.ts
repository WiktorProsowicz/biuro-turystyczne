import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  currencyCode: string = 'PLN';

  constructor() { }

  getCurrencyCode() {
    return this.currencyCode;
  }

  setCurrencyCode(currencyCode: string) {
    this.currencyCode = currencyCode;
  }

  convertPrice(price: number) {

    const currencyConversion: { [key: string]: number } = {
      "PLN": 1,
      "EUR": 4.5,
      "USD": 4,
      "GBP": 5
    };

    return price * currencyConversion[this.currencyCode];
  }
}
