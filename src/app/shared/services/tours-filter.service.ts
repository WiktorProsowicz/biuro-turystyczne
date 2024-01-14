import { Injectable } from '@angular/core';
import { ToursFilter } from '../interfaces/tours-filter';
import { ToursService } from './tours.service';
import { Tour } from '../interfaces/tour';
import { ToursRatingService } from './tours-rating.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ToursFilterService {

  public toursFilter: ToursFilter = this.getDefaultFilter();

  constructor(private toursService: ToursService, private ratingService: ToursRatingService, private db: AngularFireDatabase) {

    db.object('tours').valueChanges().subscribe(data => {
      this.toursFilter = this.getDefaultFilter();
    });

    db.object('ratings').valueChanges().subscribe(data => {
      this.toursFilter = this.getDefaultFilter();
    });
  }

  getDefaultFilter(): ToursFilter {
    return {
      minPrice: this.getMinPrice(),
      maxPrice: this.getMaxPrice(),
      minRating: this.getMinRating(),
      maxRating: this.getMaxRating(),
      startDate: this.getMinDate(),
      endDate: this.getMaxDate(),
    };
  }

  getMinPrice() {
    return Math.min(...this.toursService.getTours().map((tour: any) => tour.price));
  }

  getMaxPrice() {
    return Math.max(...this.toursService.getTours().map((tour: any) => tour.price))
  }

  getMinRating() {
    return Math.min(...this.toursService.getTours().map((tour: any) => this.ratingService.getAverageTourRating(tour)));
  }

  getMaxRating() {
    return Math.max(...this.toursService.getTours().map((tour: any) => this.ratingService.getAverageTourRating(tour)))
  }

  getStartDates(): Date[] {
    return this.toursService.getTours().map((tour: any) => new Date(tour.startDate));
  }

  getEndDates(): Date[] {
    return this.toursService.getTours().map((tour: any) => new Date(tour.endDate));
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
