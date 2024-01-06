import { HttpClient } from "@angular/common/http";
import { Tour } from "../app/shared/interfaces/tour";
import { Observable } from "rxjs";

export class MockData {

  getData(): Observable<Tour[]> {
    const httpClient = new HttpClient();
    return httpClient.get<Tour[]>('assets/tours.json');

  }

};
