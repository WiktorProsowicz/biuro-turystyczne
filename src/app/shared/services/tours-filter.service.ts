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
      maxRating: this.getMaxRating(),
      startDate: this.getMinDate(),
      endDate: this.getMaxDate(),
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

  getStartDates(): Date[] {
    return this.tours.map((tour: any) => new Date(tour.startDate));
  }

  getEndDates(): Date[] {
    return this.tours.map((tour: any) => new Date(tour.endDate));
  }

  getMinDate(): string {
    if (this.getStartDates().length === 0) return '';

    return this.getStartDates().reduce((min: any, date: any) => date < min ? date : min).toISOString().split('T')[0];
  }

  getMaxDate(): string {
    if (this.getEndDates().length === 0) return '';

    return this.getEndDates().reduce((max: any, date: any) => date > max ? date : max).toISOString().split('T')[0];
  }


}
