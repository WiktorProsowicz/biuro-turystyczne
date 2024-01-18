import { Component, Input } from '@angular/core';
import { Tour } from '../../shared/interfaces/tour';
import { ToursBookingService } from '../../shared/services/tours-booking.service';
import { PurchasingService } from '../../shared/services/purchasing.service';
import { UsersService } from '../../shared/services/users.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  @Input() tour: Tour;

  constructor(private bookingService: ToursBookingService, private purchasingService: PurchasingService, private usersService: UsersService, private router: Router) { }

  bookTour(tour: any) {

    if (this.usersService.getCurrentUser() == null) {
      this.router.navigate(['/sign-in']);
      return;
    }

    this.bookingService.bookTour(tour, 1);
  }

  cancelTour(tour: any) {
    if (this.usersService.getCurrentUser() == null) {
      this.router.navigate(['/sign-in']);
      return;
    }

    this.bookingService.cancelTour(tour, 1);
  }

  hasBooking(tour: Tour) {
    return this.bookingService.getTourBooking(tour) > 0;
  }

  getTotalBookedSeats(tour: Tour) {
    return this.bookingService.getTourBooking(tour) + this.purchasingService.getPurchasedSeats(tour);
  }
}
