import { EventEmitter, Injectable } from '@angular/core';
import { Opinion } from '../interfaces/opinion';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../interfaces/tour';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class OpinionsService {

  opinions: Opinion[] = [];
  eventReady: EventEmitter<boolean> = new EventEmitter();

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) {

    this.db.object('opinions').valueChanges().subscribe(data => {

      this.opinions = [];

      Object.keys(data).forEach((key: any) => {

        const opinion = {
          id: parseInt(key),
          ...data[key]
        };

        if(opinion.date == '')
        {
          opinion.date = null;
        }

        this.opinions.push(opinion);
      });

      this.eventReady.emit(false);
    });
  }

  getReadyEvent(): EventEmitter<boolean> {
    return this.eventReady;
  }

  getOpinions(tour: Tour): Opinion[] {

    return this.opinions.filter((opinion: Opinion) => opinion.tourId == tour.id);

  }

  getMaxId(): number {

    if(this.opinions.length == 0) {
      return 0;
    }

    return Math.max(...this.opinions.map((opinion: Opinion) => opinion.id));
  }

  addOpinion(opinion: Opinion) {
    this.db.object(`opinions/${opinion.id}`).set(opinion);
  }

}
