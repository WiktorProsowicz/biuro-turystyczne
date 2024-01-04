import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
import { currencyToFactor } from '../shared/helpers';


@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CurrencyPipe, NgIf, NgFor],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  @Input() toursBooking: any;
  @Input() tours: any;
  @Input() currencyCode: any;

  getTotalBookedSeats() {
    return this.tours.reduce((cum: any, tour: any) => cum + (this.toursBooking[tour.id] || 0), 0);
  }

  getTotalBookedTours() {
    return this.tours.filter((tour: any) => (this.toursBooking[tour.id] || 0) > 0).length;
  }

  getTotalPrice() {
    return this.tours.reduce((cum: any, tour: any) => cum + tour.price * (this.toursBooking[tour.id] || 0), 0);
  }

  adjustToCurrency(price: number) {
    return price / currencyToFactor[this.currencyCode];
  }
}
