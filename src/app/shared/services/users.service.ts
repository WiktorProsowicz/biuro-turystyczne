import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<any>('assets/tours.json').subscribe(data => {

      Object.keys(data.users).forEach((key: any) => {
        this.users.push(
          {
            id: parseInt(key),
            ...data.users[key]
          }
        );
      });
    });
  }


  getUser(id: number): User {
    return this.users.find((user: User) => user.id == id);
  }
}
