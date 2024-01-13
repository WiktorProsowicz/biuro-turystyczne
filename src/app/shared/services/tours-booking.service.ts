import { Injectable } from '@angular/core';
import { Tour } from '../interfaces/tour';
import { ToursService } from './tours.service';
@Injectable({
  providedIn: 'root'
})
export class ToursBookingService {

  private localToursBooking: { [key: number]: number } = {};

  constructor(private toursService: ToursService) { }

  getTourBooking(tour: Tour) {
    return this.localToursBooking[tour.id] || 0;
  }

  bookTour(tour: Tour, seats: number) {
    this.localToursBooking[tour.id] = this.getTourBooking(tour) + seats;
  }

  cancelTour(tour: Tour, seats: number) {
    this.localToursBooking[tour.id] = this.getTourBooking(tour) - seats;

    if (this.getTourBooking(tour) <= 0) {
      delete this.localToursBooking[tour.id];
    }
  }

  hasAnyBooking() {
    return Object.keys(this.localToursBooking).length > 0;
  }

  deleteBooking(tours: Tour[]) {
    tours.forEach((tour: Tour) => {
      delete this.localToursBooking[tour.id];
    });
  }

  getNumberOfBookedTours() {
    return Object.keys(this.localToursBooking).length;
  }

  getNumberOfBookedSeats() {
    return Object.keys(this.localToursBooking).reduce((cum: any, tourId: any) => cum + this.localToursBooking[tourId], 0);
  }

  getTotalPrice() {
    return Object.keys(this.localToursBooking).reduce((cum: any, tourId: any) => cum + this.localToursBooking[tourId] * this.toursService.getTour(tourId).price, 0);
  }

  getBookedSeats(tour: Tour) {
    return this.localToursBooking[tour.id];
  }

}
