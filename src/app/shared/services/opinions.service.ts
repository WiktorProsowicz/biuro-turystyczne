import { Injectable } from '@angular/core';
import { Opinion } from '../interfaces/opinion';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../interfaces/tour';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class OpinionsService {

  opinions: Opinion[] = [];

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) {

    this.db.list<any>('opinions').valueChanges().subscribe(data => {

      data.forEach((opinion: any) => {
        this.opinions.push(opinion);
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
