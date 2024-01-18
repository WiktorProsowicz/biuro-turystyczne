import { Injectable } from '@angular/core';
import { Tour } from '../interfaces/tour';
import { Rating } from '../interfaces/rating';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ToursRatingService {

  toursRatings: Rating[] = [];

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase, private usersService: UsersService) {
    this.db.object('ratings').valueChanges().subscribe(data => {

      this.toursRatings = [];

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
    if(this.usersService.getCurrentUser() == null) {
      return 0;
    }

    return this.getRatingsForTour(tour).find((rating: Rating) => rating.userId == this.usersService.getCurrentUser().id)?.rating || 0;
  }

  getNumberOfRatings(tour: Tour) {
    return this.getRatingsForTour(tour).length;
  }

  getRatingsForTour(tour: Tour) {
    return this.toursRatings.filter((rating: Rating) => rating.tourId == tour.id);
  }

  getNextId() {

    if(this.toursRatings.length == 0) {
      return 1;
    }

    return Math.max(...this.toursRatings.map((rating: Rating) => rating.id)) + 1;
  }

  rateTour(tour: Tour, rating: number) {

    if(this.usersService.getCurrentUser() == null) {
      return;
    }

    const localRating = this.getRatingsForTour(tour).find((rating: Rating) => rating.userId == this.usersService.getCurrentUser().id);

    if (localRating) {
      this.db.object('ratings/' + localRating.id).set({
        id: localRating.id,
        userId: this.usersService.getCurrentUser().id,
        tourId: tour.id,
        rating: rating,
      });
      return;
    }

    const nextId = this.getNextId();

    this.db.object('ratings/' + nextId).set({
      id: nextId,
      userId: this.usersService.getCurrentUser().id,
      tourId: tour.id,
      rating: rating,
    });
  }
}
