import { Injectable } from '@angular/core';
import { FacebookAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  // Get angular fire auth
  getAngularFireAuth() {
    return this.angularFireAuth
  }

  // SEND PASSWORD RESET EMAIL
  sendPasswordResetEmail(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email)
  }

  // VERIFY PASSWORD RESET CODE
  verifyPasswordResetCode(code: string) {
    return this.angularFireAuth.verifyPasswordResetCode(code)
  }

  // CONFIRM PASSWORD RESET
  confirmPasswordReset(actionCode: string, newPassword: string) {
    return this.angularFireAuth.confirmPasswordReset(actionCode, newPassword)
  }

  // EMAIL AND PASSWORD LOGIN
  emailLogin(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  // REGISTER WITH EMAIL AND PASSWORD
  register(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // SEND VERIFICATION EMAIL
  sendVerificationEmail(user: any) {
    return user.sendEmailVerification();
  }

  // VERIFY USER EMAIL
  verifyUserEmail(actionCode: string) {
    return this.angularFireAuth.applyActionCode(actionCode)
  }


  // LOGOUT
  logout() {
    return this.angularFireAuth.signOut();
  }

  // FORGOT PASSWORD
  forgotPassword(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }



  // GET CURRENT USER
  getCurrentUser() {
    return this.angularFireAuth.currentUser;
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
