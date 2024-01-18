import { Injectable } from '@angular/core';
import { Tour } from '../interfaces/tour';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';

const DEFAULT_IMAGE = 'https://www.chemar.com.pl/wp-content/uploads/2020/12/placeholder-1-300x200.png';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  tours: Tour[] = [];

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) {

    this.db.object('tours').valueChanges().subscribe(data => {

      this.tours = [];

      Object.keys(data).forEach((key: any) => {

        const image = ((data[key].image == '') ? DEFAULT_IMAGE : data[key].image);

        const tour: Tour = {
          id: parseInt(key),
          ...data[key]
        };

        tour.image = image;

        this.tours.push(tour);
      });

    });
  }

  getTours(): Tour[] {
    return this.tours;
  }

  addTour(tour: Tour) {
    this.db.object('tours/' + tour.id).set({
      name: tour.name,
      description: tour.description,
      price: tour.price,
      image: tour.image,
      maxPeople: tour.maxPeople,
      startDate: tour.startDate,
      endDate: tour.endDate,
      targetCountry: tour.targetCountry
    });

  }

  reload() {
    this.tours = this.tours.filter((tour: any) => { return true });
  }

  getTour(id: number): Tour | undefined {
    return this.tours.find((tour: any) => tour.id == id);

  }

  getNextId(): number {
    return Math.max(...this.tours.map((tour: any) => tour.id)) + 1;
  }

  deleteTour(tour: Tour) {
    this.tours = this.tours.filter((t: any) => t.id !== tour.id);
  }
}
