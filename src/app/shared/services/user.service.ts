import { Injectable } from '@angular/core';
import { deleteUser } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFirestore: AngularFirestore) { }

  createUser(payload: {
    username: string,
    email: string,
    totalNumberOfGamesCompleted: number,
    bestScore: number
  }) {
    return this.angularFirestore.collection("/users").doc(payload.username).set({
      email: payload.email
    })
  }

  updateUserRecord(id: string, data: any) {
    return this.angularFirestore.doc("users/" + id).update(data);
  }

  getUser(id: string) {
    return this.angularFirestore.doc("users/" + id)
  }

  getAllUsers() {
    return this.angularFirestore.collection("/users").snapshotChanges();
  }

  deleteUser(id: string) {
    return this.angularFirestore.doc("user/" + id).delete();
  }
}
