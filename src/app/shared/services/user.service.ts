import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private angularFirestore: AngularFirestore
  ) { }

  createUser(payload: {email: string, name: string}) {
    return this.angularFirestore.collection("/users").doc(payload.email).set({
      bestScore: 0,
      email: payload.email,
      name: payload.name,
      totalNumberOfGamesCompleted: 0
    })
  }

  updateUserRecord(id: string, data: any) {
    return this.angularFirestore.doc("users/" + id).update(data);
  }

  getUserRecord(id: string) {
    return this.angularFirestore.doc("users/" + id)
  }

  getAllUsers() {
    return this.angularFirestore.collection("/users").snapshotChanges();
  }

  deleteUser(id: string) {
    return this.angularFirestore.doc("user/" + id).delete();
  }

  updateUserProfile(user: any, data: {displayName: string}): Promise<void> {
    return user?.updateProfile(data)
  }

  saveUserToLocalStorage(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  retrieveUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem("user") || '');
  }
}
