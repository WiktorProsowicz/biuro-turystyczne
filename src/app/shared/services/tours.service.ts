import { Injectable } from '@angular/core';
import { Tour } from '../interfaces/tour';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class ToursService {

  tours: Tour[] = [];

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) {

    this.db.object('tours').valueChanges().subscribe(data => {

      Object.keys(data).forEach((key: any) => {
        this.tours.push(
          {
            id: parseInt(key),
            ...data[key]
          }
        );
      });

    });

    // db.object('tours').valueChanges().subscribe((data: any) => {
    //   this.tours = Object.values(data);
    // });
  }

  getTours(): Tour[] {
    return this.tours;
  }

  addTour(tour: Tour) {
    this.tours.push(tour);
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
