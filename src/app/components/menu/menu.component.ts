import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CurrencyService } from '../../shared/services/currency.service';
import { NgbCollapse, NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { NgClass, NgIf } from '@angular/common';
import { ToursBookingService } from '../../shared/services/tours-booking.service';
import { ToursService } from '../../shared/services/tours.service';
import { SummaryComponent } from '../summary/summary.component';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgbCollapse, RouterLink, NgIf, SummaryComponent, RouterLinkActive, NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  isCollapsed;

  constructor(private currency: CurrencyService, private bookingService: ToursBookingService) {

  }

  isCurrencyActive(currencyCode: string) {
    return this.currency.getCurrencyCode() === currencyCode;
  }

  getCurrencyCode() {
    return this.currency.getCurrencyCode();
  }

  setCurrencyCode(currencyCode: string) {
    this.currency.setCurrencyCode(currencyCode);
  }

  hasAnyBooking() {
    return this.bookingService.hasAnyBooking();
  }

  getNumberOfBookedTours() {
    return this.bookingService.getNumberOfBookedTours();
  }



}
