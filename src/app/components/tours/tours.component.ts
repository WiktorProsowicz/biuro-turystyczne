import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe, NgClass, NgFor, NgIf, NgStyle, UpperCasePipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { FilteredToursPipe } from '../shared/filtered-tours.pipe';
import { TourComponent } from '../tour/tour.component';
import { BasketComponent } from '../basket/basket.component';
import { HistoryComponent } from '../history/history.component';


const TOURS_PATH = "../../assets/tours.json";

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [NgFor, BasketComponent, TourComponent, NgIf, NgClass, NgStyle, FilteredToursPipe, UpperCasePipe, CurrencyPipe, FormsModule, ReactiveFormsModule, HistoryComponent],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css'
})
export class ToursComponent {

  tours: any;
  currencyCode: string = 'EUR';
  tourForm: any;
  toursBooking: { [key: string]: number } = {};

  minPriceFilter: any = null;
  maxPriceFilter: any = null;
  startDateFilter: any = null;
  endDateFilter: any = null;
  ratingsFilter: any = {};
  destinationFilter: any = {};
  history: any = [];

  constructor(private http: HttpClient) {
    this.http.get('assets/tours.json').subscribe(data => {

      this.tours = data;

      this.tours = this.tours.map((tour: any) => {
        return tour;
      });

      this.tours.forEach((tour: any) => {
        this.toursBooking[tour.id] = 0;
      });
    });

    this.tourForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      targetCountry: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.max(10000)]),
      maxPeople: new FormControl('', [Validators.required, Validators.max(30)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      image: new FormControl('', [Validators.required])
    });
  }

  reload() { this.tours = this.tours?.map((tour: any) => { return tour }); }

  getAvailableDestinations() {

    let available = this.tours?.map((tour: any) => tour.targetCountry) || [];

    available = available.filter((country: any, index: any) => {
      return available.indexOf(country) === index;
    })

    for (let destination of available) {
      if (!Object.keys(this.destinationFilter).includes(destination)) {
        this.destinationFilter[destination] = true;
      }
    }

    for (let destination of Object.keys(this.destinationFilter)) {
      if (!available.includes(destination)) {
        this.destinationFilter[destination] = true;
      }
    }

    return available;
  }

  getAvailableRatings() {

    let available = this.tours?.map((tour: any) => String(tour.rating)) || [];

    available = available.filter((rating: any, index: any) => {
      return available.indexOf(rating) === index;
    })

    for (let rating of available) {
      if (!Object.keys(this.ratingsFilter).includes(rating.toString())) {
        this.ratingsFilter[rating] = true;
      }
    }

    return available;
  }

  getMinDate() {
    const dates = this.tours?.map((tour: any) => new Date(tour.startDate)) || [];

    if (dates.length === 0) return '';

    const minDate = new Date(Math.min(...dates));

    return minDate.toISOString().split('T')[0];
  }

  getMaxDate() {
    const dates = this.tours?.map((tour: any) => new Date(tour.endDate)) || [];

    if (dates.length === 0) return '';

    const maxDate = new Date(Math.max(...dates));

    return maxDate.toISOString().split('T')[0];
  }


  getTourPriceIndication(tour: any) {
    const mostExpensive = Math.max(...this.tours.map((t: any) => t.price));
    const cheapest = Math.min(...this.tours.map((t: any) => t.price));

    if (tour.price === mostExpensive) {
      return { 'border': '2px solid red' }; // Style for most expensive
    } else if (tour.price === cheapest) {
      return { 'border': '2px solid green' }; // Style for cheapest
    } else {
      return {}; // Default style
    }
  }

  onCurrencyChange(newCurrencyCode: any) {
    this.currencyCode = newCurrencyCode;
  }

  deleteTour(tour: any) {
    this.tours = this.tours.filter((t: any) => t !== tour);
  }

  bookTour(tour: any) {
    this.toursBooking[tour.id]++;
  }

  cancelTour(tour: any) {
    this.toursBooking[tour.id]--;
  }

  getNewId() {
    const ids = this.tours.map((tour: any) => tour.id);

    return Math.max(...ids) + 1;
  }

  addTour() {
    const tour = this.tourForm.value;

    tour['rating'] = 0;
    tour['id'] = this.getNewId();
    this.toursBooking[tour.id] = 0;

    this.tours.push(tour);
    this.tourForm.reset();
  }

  pushToHistory(bookingInfos: any) {

    bookingInfos.forEach((bookingInfo: any) => {
      bookingInfo['dateBought'] = new Date().toISOString().split('T')[0];
      this.history.push(bookingInfo);
    });

    bookingInfos.forEach((bookingInfo: any) => {
      this.toursBooking[bookingInfo.tour.id] = 0;
      bookingInfo.tour.bookedSeats += bookingInfo.bookedSeats;
    });
  }
}
