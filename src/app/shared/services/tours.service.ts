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

  reload() {
    this.tours = this.tours.filter((tour: any) => { return true });
  }
}
