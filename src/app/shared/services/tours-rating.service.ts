import { Injectable } from '@angular/core';
import { Tour } from '../interfaces/tour';
import { Rating } from '../interfaces/rating';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ToursRatingService {

  toursRatings: Rating[] = [];

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) {
    this.db.object('ratings').valueChanges().subscribe(data => {

      Object.keys(data).forEach((key: any) => {
        this.toursRatings.push(
          {
            id: parseInt(key),
            ...data[key]
          }
        );
      });
    });
  }

  getAverageTourRating(tour: Tour) {
    const ratings = this.getRatingsForTour(tour);
    const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
    return sum / (ratings.length == 0 ? 1 : ratings.length);
  }

  getLocalTourRating(tour: Tour) {
    return this.getRatingsForTour(tour).find((rating: Rating) => rating.userId == 0)?.rating || 0;
  }

  getNumberOfRatings(tour: Tour) {
    return this.getRatingsForTour(tour).length;
  }

  getRatingsForTour(tour: Tour) {
    return this.toursRatings.filter((rating: Rating) => rating.tourId == tour.id);
  }

  rateTour(tour: Tour, rating: number) {

    const localRating = this.getRatingsForTour(tour).find((rating: Rating) => rating.userId == 0);

    if (localRating) {
      localRating.rating = rating;
      return;
    }

    this.toursRatings.push({
      id: 100,
      userId: 0,
      tourId: tour.id,
      rating: rating,
    });
  }
}
