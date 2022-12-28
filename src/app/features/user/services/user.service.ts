import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {User} from "../models/user"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userPath = "/user";
  usersRef: AngularFirestoreCollection<User> | null = null;

  constructor(private angularFireStore: AngularFirestore) {
    this.usersRef = angularFireStore.collection(this.userPath);
  }

  getAllUsers() {
    return this.usersRef;
  }

  createUser(user: User) {
    return this.usersRef?.add({...user});
  }

  updateUser(userId: string, data: any) {
    return this.usersRef?.doc(userId).update(data);
  }

  saveUserEmailLocally(email: string) {
    localStorage.setItem("userEmail", email);
  }
}
