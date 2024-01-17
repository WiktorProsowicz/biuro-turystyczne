import { Component } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
import { ToursBookingService } from '../../shared/services/tours-booking.service';
import { CurrencyService } from '../../shared/services/currency.service';


@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CurrencyPipe, NgIf, NgFor, NgClass],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {

  constructor(private bookingService: ToursBookingService, private currencyService: CurrencyService) { }

  getTotalBookedSeats() {
    return this.bookingService.getNumberOfBookedSeats();
  }

  getTotalBookedTours() {
    return this.bookingService.getNumberOfBookedTours();
  }

  getTotalPrice() {
    return this.bookingService.getTotalPrice();
  }

  adjustToCurrency(price: number) {
    return this.currencyService.convertPrice(price);
  }

  getCurrency() {
    return this.currencyService.getCurrencyCode();
  }

  getBookedToursIndication() {
    if (this.getTotalBookedTours() > 10) {
      return 'summary__BookedToursGreen';
    }

    return 'summary__BookedToursRed'
  }
}
