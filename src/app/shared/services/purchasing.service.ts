import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../interfaces/purchase';
import { Tour } from '../interfaces/tour';
import { ToursService } from './tours.service';

@Injectable({
  providedIn: 'root'
})
export class PurchasingService {

  private purchases: Purchase[] = [];

  constructor(private httpClient: HttpClient, private toursService: ToursService) {
    this.httpClient.get<any>('assets/tours.json').subscribe(data => {

      Object.keys(data.purchases).forEach((key: any) => {

        this.purchases.push(
          {
            tour: this.toursService.getTour(data.purchases[key].tourId),
            date: data.purchases[key].date,
            seats: data.purchases[key].seats,
          }
        );
      });

    });


  }

  getPurchasedSeats(tour: Tour) {
    return this.purchases.filter((purchase: Purchase) => purchase.tour.id === tour.id).reduce((sum: number, purchase: Purchase) => sum + purchase.seats, 0);
  }

  addPurchase(purchase: Purchase) {
    this.purchases.push(purchase);
  }

  getPurchases() {
    return this.purchases;
  }

}
