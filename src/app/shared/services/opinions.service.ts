import { Injectable } from '@angular/core';
import { Opinion } from '../interfaces/opinion';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../interfaces/tour';

@Injectable({
  providedIn: 'root'
})
export class OpinionsService {

  opinions: Opinion[] = [];

  constructor(private httpClient: HttpClient) {

    this.httpClient.get<any>('assets/tours.json').subscribe(data => {

      Object.keys(data.opinions).forEach((key: any) => {
        this.opinions.push(
          {
            id: parseInt(key),
            ...data.opinions[key]
          }
        );
      });
    });
  }

  getOpinions(tour: Tour): Opinion[] {

    return this.opinions.filter((opinion: Opinion) => opinion.tourId == tour.id);

  }

  getMaxId(): number {
    return Math.max(...this.opinions.map((opinion: Opinion) => opinion.id));
  }

}
