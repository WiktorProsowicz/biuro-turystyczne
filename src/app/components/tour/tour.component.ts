import { CurrencyPipe, NgClass, NgIf, NgStyle, UpperCasePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { currencyToFactor } from '../shared/helpers';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [NgStyle, NgClass, UpperCasePipe, CurrencyPipe, NgIf],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css'
})
export class TourComponent {
  @Input() tour: any;
  @Input() currencyCode: any;
  @Input() additionalBookedSeats: number = 0;

  @Output() tourDeleted = new EventEmitter<boolean>();
  @Output() tourBooked = new EventEmitter<boolean>();
  @Output() tourCanceled = new EventEmitter<boolean>();

  rateTour(rating: number) {
    this.tour.rating = rating;
  }

  adjustToCurrency(price: number) {
    return price / currencyToFactor[this.currencyCode];
  }

  bookTour() {
    this.tourBooked.emit(true);
  }

  cancelTour() {
    this.tourCanceled.emit(true);
  }

  deleteTour() {
    this.tourDeleted.emit(true);
  }

  getTourSeatsIndication() {
    const availableSeats = this.tour.maxPeople - this.tour.bookedSeats;

    if (availableSeats < 10) {
      return "tour-almost-sold-out"; // Style for almost sold out
    } else {
      return "tour-available"; // Style for available
    }
  }

  cumulativeBookedSeats() {
    return this.tour.bookedSeats + this.additionalBookedSeats;
  }
}
