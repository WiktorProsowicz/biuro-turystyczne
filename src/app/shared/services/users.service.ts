import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
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

  getCurrentUser(): User | null {
    let user = null;

    // this.afAuth.currentUser.then(data => {
    //   if (data) {
    //     user = this.users.find((user: User) => user.email == data.email);
    //   }
    // }).catch(error => { });

    return user;
  }

  logout() {
    this.afAuth.signOut();
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  createUser(email: string) {
    const user:
  }

  getUser(id: number): User {
    return this.users.find((user: User) => user.id == id);
  }
}
