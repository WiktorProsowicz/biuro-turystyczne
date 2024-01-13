import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourDetail } from '../interfaces/tour-detail';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../interfaces/tour';

@Injectable({
  providedIn: 'root'
})
export class TourDetailService {

  details: TourDetail[] = [];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<any>('assets/tours.json').subscribe(data => {

      Object.keys(data.details).forEach((key: any) => {
        this.details.push(
          {
            tourId: parseInt(key),
            ...data.details[key]
          }
        );
      });
    });

    // db.object('tours').valueChanges().subscribe((data: any) => {
    //   this.tours = Object.values(data);
    // });
  }

  getDetail(tour: Tour): TourDetail {
    return this.details.find((detail: any) => detail.tourId == tour.id);
  }
}
