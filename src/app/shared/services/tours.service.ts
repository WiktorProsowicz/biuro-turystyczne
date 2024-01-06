import { Injectable } from '@angular/core';
import { Tour } from '../interfaces/tour';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToursService {

  tours: Tour[] = [];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<Tour[]>('assets/tours.json').subscribe(data => {
      this.tours = data;
    });
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
    return this.tours.find((tour: any) => tour.id === id);
  }

  getNextId(): number {
    return Math.max(...this.tours.map((tour: any) => tour.id)) + 1;
  }
}
