import { Component } from '@angular/core';
import { SummaryComponent } from '../summary/summary.component';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToursBookingService } from '../../shared/services/tours-booking.service';
import { CurrencyService } from '../../shared/services/currency.service';
import { Tour } from '../../shared/interfaces/tour';
import { ToursService } from '../../shared/services/tours.service';
import { PurchasingService } from '../../shared/services/purchasing.service';
import { BookingComponent } from '../booking/booking.component';


@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [SummaryComponent, CurrencyPipe, NgFor, NgIf, FormsModule, BookingComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {

  checkBoxes: { [key: number]: boolean } = {};

  constructor(private bookingService: ToursBookingService, private purchasingService: PurchasingService, private currencyService: CurrencyService, private toursService: ToursService) {

  }

  hasBooking(tour: Tour) {
    return this.bookingService.getTourBooking(tour) > 0;
  }

  getBookedTours() {
    return this.toursService.getTours().filter((tour: Tour) => this.hasBooking(tour));
  }

  getCheckedTours() {
    return this.getBookedTours().filter((tour: Tour) => this.isChecked(tour));
  }

  doCheckout() {

    this.getCheckedTours().forEach((tour: Tour) => {
      this.purchasingService.addPurchase({
        tour: tour,
        date: new Date().toISOString(),
        seats: this.bookingService.getTourBooking(tour)
      });
    });

    this.getCheckedTours().forEach((tour: Tour) => {
      delete this.checkBoxes[tour.id];
    });

    this.bookingService.deleteBooking(this.getCheckedTours());

  }

  getSeats(tour: Tour) {
    return this.bookingService.getTourBooking(tour);
  }

  getTotalPrice(tour: Tour) {
    return this.bookingService.getTourBooking(tour) * tour.price;
  }

  changeCheck(tour: Tour) {

    if (this.checkBoxes[tour.id] === false) {
      this.checkBoxes[tour.id] = true;
    }
    else {
      this.checkBoxes[tour.id] = false;
    }
  }

  isChecked(tour: Tour) {

    if (this.checkBoxes[tour.id] === undefined) {
      this.checkBoxes[tour.id] = true;
    }

    return this.checkBoxes[tour.id];
  }

  adjustToCurrency(price: number) {
    return this.currencyService.convertPrice(price);
  }

  getCurrency() {
    return this.currencyService.getCurrencyCode();
  }


}
