import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../interfaces/purchase';
import { Tour } from '../interfaces/tour';
import { ToursService } from './tours.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getTourStatus } from '../helpers';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class PurchasingService {

  private purchases: Purchase[] = [];

  constructor(private httpClient: HttpClient, private toursService: ToursService, private db: AngularFireDatabase, private usersService: UsersService) {
    this.db.object('purchases').valueChanges().subscribe(data => {

      this.purchases = [];

      Object.keys(data).forEach((key: any) => {

        this.purchases.push(
          {
            tour: this.toursService.getTour(data[key].tourId),
            date: data[key].date,
            seats: data[key].seats,
            userId: data[key].userId
          }
        );
      });

    });


  }

  getPurchasedSeats(tour: Tour) {
    return this.purchases.filter((purchase: Purchase) => purchase.tour.id === tour.id).reduce((sum: number, purchase: Purchase) => sum + purchase.seats, 0);
  }

  addPurchase(purchase: Purchase) {
    this.db.object('purchases/' + this.purchases.length).set({
      tourId: purchase.tour.id,
      date: purchase.date,
      seats: purchase.seats,
      userId: purchase.userId
    });
  }

  getPurchases() {

    if(this.usersService.getCurrentUser() == null) {
      return [];
    }

    return this.purchases.filter((purchase: Purchase) => purchase.userId == this.usersService.getCurrentUser().id);

  }

  hasAnyUpcomingTours() {
    return this.purchases.some((purchase: Purchase) => getTourStatus(purchase.tour) === 'upcoming');
  }

}
