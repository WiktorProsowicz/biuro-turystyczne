import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) {
    this.db.object('users').valueChanges().subscribe(data => {

      Object.keys(data).forEach((key: any) => {
        this.users.push(
          {
            id: parseInt(key),
            ...data[key]
          }
        );
      });
    });
  }


  getUser(id: number): User {
    return this.users.find((user: User) => user.id == id);
  }
}
