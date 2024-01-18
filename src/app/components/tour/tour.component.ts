import { CurrencyPipe, DecimalPipe, NgClass, NgIf, NgStyle, UpperCasePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyService } from '../../shared/services/currency.service';
import { ToursBookingService } from '../../shared/services/tours-booking.service';
import { ToursRatingService } from '../../shared/services/tours-rating.service';
import { RatingComponent } from '../rating/rating.component';
import { Purchase } from '../../shared/interfaces/purchase';
import { PurchasingService } from '../../shared/services/purchasing.service';
import { BookingComponent } from '../booking/booking.component';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [DecimalPipe, NgStyle, NgClass, UpperCasePipe, CurrencyPipe, NgIf, RatingComponent, BookingComponent, RouterLink],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css'
})
export class TourComponent {
  @Input() tour: any;

  @Output() tourDeleted = new EventEmitter<boolean>();

  constructor(private currencyService: CurrencyService, private bookingService: ToursBookingService, private ratingService: ToursRatingService, private purchasingService: PurchasingService, private usersService: UsersService) { }


  deleteTour() {
    this.tourDeleted.emit(true);
  }

  getUser() {
    return this.usersService.getCurrentUser();
  }

  currentRating() {
    return this.ratingService.getLocalTourRating(this.tour);
  }

  averageRating() {
    return this.ratingService.getAverageTourRating(this.tour);
  }

  numberOfRatings() {
    return this.ratingService.getNumberOfRatings(this.tour);
  }

  getCurrencyCode() {
    return this.currencyService.getCurrencyCode();
  }

  convertPrice(price: number) {
    return this.currencyService.convertPrice(price);
  }

  getTourSeatsIndication() {
    const availableSeats = this.tour.maxPeople - this.cumulativeBookedSeats();

    if (availableSeats <= 3) {
      return "tour-almost-sold-out"; // Style for almost sold out
    }

    return '';
  }

  additionalBookedSeats() {
    return this.bookingService.getTourBooking(this.tour);
  }

  cumulativeBookedSeats() {
    return this.purchasingService.getPurchasedSeats(this.tour) + this.bookingService.getTourBooking(this.tour);
  }
}
