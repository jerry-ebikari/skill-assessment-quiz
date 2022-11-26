import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  emailAlreadyInUse: boolean = false;
  creatingUser: boolean = false;
  creatingUserRecord: boolean = false;
  userCreated: boolean = false;
  failedToCreateUser: boolean = false;
  failedToCreateUserRecord: boolean = false;
  form!: FormGroup;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required, Validators.pattern(/^[a-z\s]*$/i)]),
    })
    localStorage.removeItem("userEmail");
  }

  togglePasswordVisibility(passwordField?: any) {
    if (passwordField!.name == "password") {
      this.passwordVisible =  !this.passwordVisible;
    } else {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
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

  createUser() {
    this.failedToCreateUser = false;
    this.creatingUser = true;
    this.authService.register(this.form.get("email")?.value?.toLowerCase(), this.form.get("password")?.value)
      .then((res) => {
        console.log(res)
        this.creatingUser = false;
        this.userCreated = true;
        this.authService.sendVerificationEmail(res.user);
        localStorage.setItem("userEmail", this.form.get("email")?.value);
        this.router.navigate(['/email-verification'])
        this.createUserRecord();
      }, (err) => {
        console.log(err.message)
        if (this.creatingUser) {
          this.failedToCreateUser = true;
          if (err.message.includes("already in use")) {
            this.emailAlreadyInUse = true;
          }
        } else {
          this.failedToCreateUserRecord = true;
          this.router.navigate(['/email-verification'])
        }
        this.creatingUser = false;
        this.creatingUserRecord = false;
      })
  }

  createUserRecord() {
    this.creatingUserRecord = true;
    this.failedToCreateUserRecord = false;
    this.userService.createUser({
      email: this.form.get("email")?.value.trim().toLowerCase(),
      name: this.form.get("name")?.value
              .trim()
              .replace(/\s+/g, " ")
              .toLowerCase()
              .replace(/(?<!.)(.)|(?<=\s)(.)/g, (char: any) => char.toUpperCase()) // Title case
    })
    .then((res: any) => {
      console.log(res);
      this.creatingUserRecord = false;
    })
  }

  register() {
    if (this.form.valid) {
      this.failedToCreateUserRecord = false;
      this.createUser();
    }
  }

}
