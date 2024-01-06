import { Injectable } from '@angular/core';
import { Tour } from '../interfaces/tour';

@Injectable({
  providedIn: 'root'
})
export class ToursRatingService {

  toursRating: { [key: number]: number } = {};

  constructor() { }

  getTourRating(tour: Tour) {
    return this.toursRating[tour.id] || 0;
  }

  rateTour(tour: Tour, rating: number) {
    this.toursRating[tour.id] = rating;
  }
}
