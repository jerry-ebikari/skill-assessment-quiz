import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  loggingIn: boolean = false;
  userNotFound: boolean = false;
  passwordIncorrect: boolean = false;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  sendingVerificationEmail: boolean = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
    localStorage.removeItem("userEmail");
  }

  togglePasswordVisibility(passwordField?: any) {
    if (passwordField!.name == "password") {
      this.passwordVisible =  !this.passwordVisible;
    } else {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  onFormInput() {
    this.userNotFound = false;
    this.passwordIncorrect = false;
  }

  login() {
    if (this.form.valid && !this.userNotFound && !this.passwordIncorrect) {
      this.loggingIn = true;
      this.authService.emailLogin(this.form.get("email")?.value, this.form.get("password")?.value)
      .then(
        (res) => {
          console.log(res);
          localStorage.setItem("userEmail", this.form.get("email")?.value);
          // IF USER EMAIL IS VERIFIED
          if (res.user?.emailVerified) {
            this.loggingIn = false;
            localStorage.setItem("isLoggedIn", "true");
            this.router.navigate(['/user']);
            this.userService.saveUserToLocalStorage(res.user);
            res.user.updateProfile({})
          }

          // IF USER EMAIL IS NOT VERIFIED
          else {
            let user = res.user;
            this.sendingVerificationEmail = true;
            this.toastService.showInfo("Email is not verified", "Sending verification email...");
            this.authService.getCurrentUser().then((res) => {
              res?.sendEmailVerification()
              .then(
                (res: any) => {
                  localStorage.setItem("user", JSON.stringify(user))
                  this.toastService.showSuccess("Verification email sent");
                  setTimeout(() => {
                    this.loggingIn = false;
                    this.router.navigate(["/email-verification"]);
                    this.sendingVerificationEmail = false;
                  }, 2000)
                },
                (err: any) => {
                  this.loggingIn = false;
                  this.sendingVerificationEmail = false;
                  this.toastService.showError("Failed to send email", "Try logging in again");
                }
              )
            })
          }
        },
      
        (err) => {
          console.log(err.message);
          if (err.message.includes("no user")) {
            this.userNotFound = true;
          }
          else if (err.message.includes("password")) {
            this.passwordIncorrect = true;
          }
          else {
            this.toastService.showError("Login failed", "Check your internet connection");
          }
          this.loggingIn = false;
        }
      )
    }
  }

  loginWithGoogle() {
    this.authService.signInWithGoogle()
    .then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  loginWithFacebook() {
    this.authService.signInWithFacebook()
    .then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }
}
