import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];
  currentUser: User | null = null;
  eventReady: EventEmitter<boolean> = new EventEmitter();

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.db.object('users').valueChanges().subscribe(data => {

      this.users = [];

      Object.keys(data).forEach((key: any) => {
        this.users.push(
          {
            id: parseInt(key),
            ...data[key]
          }
        );
      });

      this.eventReady.emit(true);

      this.afAuth.authState.subscribe(user => {

        if (user == null) {
          this.currentUser = null;
          return;
        }

          this.currentUser = this.users.find((u: User) => {
            return u.email == user.email;});
      });
    });


  }

  getReadyEvent(): EventEmitter<boolean> {
    return this.eventReady;
  }

  getCurrentUser(): User | null {

    return this.currentUser;
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.currentUser = null;
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  getNextId(): number {

    if (this.users.length == 0) {
      return 1;
    }

    return Math.max(...this.users.map((user: User) => user.id)) + 1;
  }

  createUser(email: string, nick: string) {



    const nextId = this.getNextId();

    this.db.object('users/' + nextId).set({
      email: email,
      nick: nick,
      isAdmin: false
    });
  }

  getUser(id: number): User {
    return this.users.find((user: User) => user.id == id);
  }
}
