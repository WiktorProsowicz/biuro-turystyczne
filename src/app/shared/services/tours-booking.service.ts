import { Injectable } from '@angular/core';
import { Tour } from '../interfaces/tour';
import { ToursService } from './tours.service';

@Injectable({
  providedIn: 'root'
})
export class ToursBookingService {

  private toursBooking: { [key: number]: number } = {};

  constructor(private toursService: ToursService) { }

  getTourBooking(tour: Tour) {
    return this.toursBooking[tour.id] || 0;
  }

  bookTour(tour: Tour, seats: number) {
    this.toursBooking[tour.id] = this.getTourBooking(tour) + seats;
  }

  cancelTour(tour: Tour, seats: number) {
    this.toursBooking[tour.id] = this.getTourBooking(tour) - seats;

    if (this.getTourBooking(tour) <= 0) {
      delete this.toursBooking[tour.id];
    }
  }

  hasAnyBooking() {
    return Object.keys(this.toursBooking).length > 0;
  }

  deleteBooking(tours: Tour[]) {
    tours.forEach((tour: Tour) => {
      delete this.toursBooking[tour.id];
    });
  }

  getNumberOfBookedTours() {
    return Object.keys(this.toursBooking).length;
  }

  getNumberOfBookedSeats() {
    return Object.keys(this.toursBooking).reduce((cum: any, tourId: any) => cum + this.toursBooking[tourId], 0);
  }

  getTotalPrice() {
    return Object.keys(this.toursBooking).reduce((cum: any, tourId: any) => cum + this.toursBooking[tourId] * (this.toursService.getTour(tourId)?.price || 0), 0);
  }

}
