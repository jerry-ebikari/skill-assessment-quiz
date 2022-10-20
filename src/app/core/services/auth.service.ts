import { Injectable } from '@angular/core';
import { FacebookAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  // EMAIL AND PASSWORD LOGIN
  emailLogin(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  // REGISTER WITH EMAIL AND PASSWORD
  register(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // LOGOUT
  logout() {
    return this.angularFireAuth.signOut();
  }

  // FORGOT PASSWORD
  forgotPassword(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }

  // SEND VERIFICATION EMAIL
  sendVerificationEmail(user: any) {
    return user.sendEmailVerification();
  }

  // SIGN IN WITH GOOGLE
  signInWithGoogle() {
    return this.angularFireAuth.signInWithPopup(new GoogleAuthProvider);
  }

  // SIGN IN WITH FACEBOOK
  signInWithFacebook() {
    return this.angularFireAuth.signInWithPopup(new FacebookAuthProvider);
  }

  // CHECK IF USER IS LOGGED IN
  isLoggedIn() {
    return typeof localStorage.getItem("isLoggedIn") == "string";
  }
}
