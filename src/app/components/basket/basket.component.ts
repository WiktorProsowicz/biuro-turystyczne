import { Component, Input, Output } from '@angular/core';
import { SummaryComponent } from '../summary/summary.component';
import { EventEmitter } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { currencyToFactor } from '../shared/helpers';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [SummaryComponent, CurrencyPipe, NgFor, NgIf, FormsModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  @Input() toursBooking: any;
  @Input() tours: any;
  @Input() currencyCode: any;

  @Output() tourBooked = new EventEmitter<any>();
  @Output() tourCanceled = new EventEmitter<any>();
  @Output() checkOut = new EventEmitter<any>();

  checkBoxes: any = {};

  bookTour(tour: any) {
    this.tourBooked.emit(tour);
  }

  cancelTour(tour: any) {
    this.tourCanceled.emit(tour);
  }

  hasAnyBooking() {
    return Object.keys(this.toursBooking).some((key: any) => this.toursBooking[key] > 0);
  }

  doCheckout() {
    this.checkOut.emit(this.getBookingInfo().filter((item: any) => this.checkBoxes[item.tour.id]));
  }

  getBookingInfo() {
    const bookingInfos = this.tours.map((tour: any) => {
      return {
        tour: tour,
        bookedSeats: (this.toursBooking[tour.id] || 0),
        price: tour.price * (this.toursBooking[tour.id] || 0)
      };
    }).filter((item: any) => item.bookedSeats > 0);

    return bookingInfos;

  }

  changeCheckboxes(bookingInfo: any) {

    if (this.checkBoxes[bookingInfo.tour.id] === false) {
      this.checkBoxes[bookingInfo.tour.id] = true;
    }
    else {
      this.checkBoxes[bookingInfo.tour.id] = false;
    }
  }

  getCheckBoxVal(bookingInfo: any) {

    if (this.checkBoxes[bookingInfo.tour.id] === undefined) {
      this.checkBoxes[bookingInfo.tour.id] = true;
    }

    return this.checkBoxes[bookingInfo.tour.id];
  }

  adjustToCurrency(price: number) {
    return price / currencyToFactor[this.currencyCode];
  }

  getTotalBookedSeats(tour: any) {
    return tour.bookedSeats + this.toursBooking[tour.id];
  }
}
