import { Injectable } from '@angular/core';
import { Purchase } from '../interfaces/purchase';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  purchases: Purchase[] = [];

  constructor() { }

  addPurchase(purchase: Purchase) {
    this.purchases.push(purchase);
  }

  getPurchases() {
    return this.purchases;
  }
}
