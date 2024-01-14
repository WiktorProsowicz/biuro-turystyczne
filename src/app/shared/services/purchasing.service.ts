import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../interfaces/purchase';
import { Tour } from '../interfaces/tour';
import { ToursService } from './tours.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getTourStatus } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class PurchasingService {

  private purchases: Purchase[] = [];

  constructor(private httpClient: HttpClient, private toursService: ToursService, private db: AngularFireDatabase) {
    this.db.object('purchases').valueChanges().subscribe(data => {

      Object.keys(data).forEach((key: any) => {

        this.purchases.push(
          {
            tour: this.toursService.getTour(data[key].tourId),
            date: data[key].date,
            seats: data[key].seats,
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

  hasAnyUpcomingTours() {
    return this.purchases.some((purchase: Purchase) => getTourStatus(purchase.tour) === 'upcoming');
  }

}
