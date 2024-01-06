import { Component } from '@angular/core';
import { CurrencyPipe, NgClass, NgFor, NgIf, NgStyle, UpperCasePipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { FilteredToursPipe } from '../../shared/pipes/filtered-tours.pipe';
import { TourComponent } from '../tour/tour.component';
import { BasketComponent } from '../basket/basket.component';
import { HistoryComponent } from '../history/history.component';
import { MenuComponent } from '../menu/menu.component';
import { ToursService } from '../../shared/services/tours.service';
import { Tour } from '../../shared/interfaces/tour';
import { ToursFilterService } from '../../shared/services/tours-filter.service';
import { ToursFilterComponent } from '../tours-filter/tours-filter.component';


@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [NgFor, BasketComponent, TourComponent, NgIf, NgClass, NgStyle, FilteredToursPipe, UpperCasePipe, CurrencyPipe, FormsModule, ReactiveFormsModule, HistoryComponent, MenuComponent, ToursFilterComponent],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css'
})
export class ToursComponent {

  toursBooking: { [key: string]: number } = {};



  constructor(private toursService: ToursService, public toursFilterService: ToursFilterService) {

  }

  getTours() {
    return this.toursService.getTours();
  }

  // reload() { this.tours = this.tours?.map((tour: any) => { return tour }); }

  // getAvailableDestinations() {

  //   let available = this.tours?.map((tour: any) => tour.targetCountry) || [];

  //   available = available.filter((country: any, index: any) => {
  //     return available.indexOf(country) === index;
  //   })

  //   for (let destination of available) {
  //     if (!Object.keys(this.destinationFilter).includes(destination)) {
  //       this.destinationFilter[destination] = true;
  //     }
  //   }

  //   for (let destination of Object.keys(this.destinationFilter)) {
  //     if (!available.includes(destination)) {
  //       this.destinationFilter[destination] = true;
  //     }
  //   }

  //   return available;
  // }

  // getAvailableRatings() {

  //   let available = this.tours?.map((tour: any) => String(tour.rating)) || [];

  //   available = available.filter((rating: any, index: any) => {
  //     return available.indexOf(rating) === index;
  //   })

  //   for (let rating of available) {
  //     if (!Object.keys(this.ratingsFilter).includes(rating.toString())) {
  //       this.ratingsFilter[rating] = true;
  //     }
  //   }

  //   return available;
  // }

  // getMinDate() {
  //   const dates = this.tours?.map((tour: any) => new Date(tour.startDate)) || [];

  //   if (dates.length === 0) return '';

  //   const minDate = new Date(Math.min(...dates));

  //   return minDate.toISOString().split('T')[0];
  // }

  // getMaxDate() {
  //   const dates = this.tours?.map((tour: any) => new Date(tour.endDate)) || [];

  //   if (dates.length === 0) return '';

  //   const maxDate = new Date(Math.max(...dates));

  //   return maxDate.toISOString().split('T')[0];
  // }


  getTourPriceIndication(tour: Tour) {

    if (this.getTours().length < 2) return {};

    const mostExpensive = Math.max(...this.getTours().map((t: any) => t.price));
    const cheapest = Math.min(...this.getTours().map((t: any) => t.price));

    if (tour.price === mostExpensive) {
      return { 'border': '2px solid red' }; // Style for most expensive
    } else if (tour.price === cheapest) {
      return { 'border': '2px solid green' }; // Style for cheapest
    } else {
      return {}; // Default style
    }
  }

  // onCurrencyChange(newCurrencyCode: any) {
  //   this.currencyCode = newCurrencyCode;
  // }

  // deleteTour(tour: any) {
  //   this.tours = this.tours.filter((t: any) => t !== tour);
  // }

  // bookTour(tour: any) {
  //   this.toursBooking[tour.id]++;
  // }

  // cancelTour(tour: any) {
  //   this.toursBooking[tour.id]--;
  // }

  // getNewId() {
  //   const ids = this.tours.map((tour: any) => tour.id);

  //   return Math.max(...ids) + 1;
  // }

  // addTour() {
  //   const tour = this.tourForm.value;

  //   tour['rating'] = 0;
  //   tour['id'] = this.getNewId();
  //   this.toursBooking[tour.id] = 0;

  //   this.tours.push(tour);
  //   this.tourForm.reset();
  // }

  // pushToHistory(bookingInfos: any) {

  //   bookingInfos.forEach((bookingInfo: any) => {
  //     bookingInfo['dateBought'] = new Date().toISOString().split('T')[0];
  //     this.history.push(bookingInfo);
  //   });

  //   bookingInfos.forEach((bookingInfo: any) => {
  //     this.toursBooking[bookingInfo.tour.id] = 0;
  //     bookingInfo.tour.bookedSeats += bookingInfo.bookedSeats;
  //   });
  // }
}
