import { Injectable } from '@angular/core';
import { ToursFilter } from '../interfaces/tours-filter';
import { ToursService } from './tours.service';
import { Tour } from '../interfaces/tour';

@Injectable({
  providedIn: 'root'
})
export class ToursFilterService {

  public toursFilter: ToursFilter;

  tours: Tour[];

  constructor(toursService: ToursService) {

    this.tours = toursService.getTours();

    this.toursFilter = {
      minPrice: this.getMinPrice(),
      maxPrice: this.getMaxPrice(),
      minRating: this.getMinRating(),
      maxRating: this.getMaxRating()
    };
  }

  getMinPrice() {
    return Math.min(...this.tours.map((tour: any) => tour.price));
  }

  getMaxPrice() {
    return Math.max(...this.tours.map((tour: any) => tour.price))
  }

  getMinRating() {
    return Math.min(...this.tours.map((tour: any) => tour.rating));
  }

  getMaxRating() {
    return Math.max(...this.tours.map((tour: any) => tour.rating))
  }
}
