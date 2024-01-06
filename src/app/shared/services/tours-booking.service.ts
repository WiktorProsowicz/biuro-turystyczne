import { Injectable } from '@angular/core';
import { Tour } from '../interfaces/tour';

@Injectable({
  providedIn: 'root'
})
export class ToursBookingService {

  private toursBooking: { [key: number]: number } = {};

  constructor() { }

  getTourBooking(tour: Tour) {
    return this.toursBooking[tour.id] || 0;
  }

  bookTour(tour: Tour, seats: number) {
    this.toursBooking[tour.id] = this.getTourBooking(tour) + seats;
  }

  cancelTour(tour: Tour, seats: number) {
    this.toursBooking[tour.id] = this.getTourBooking(tour) - seats;
  }

}
