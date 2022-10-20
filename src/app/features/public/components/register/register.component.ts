import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  checkingUsernameAvailability: boolean = false;
  usernameAvailabilityChecked: boolean = false;
  usernameExists: boolean = true;
  usernameCheckFailed: boolean = false;
  form!: FormGroup;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required, Validators.pattern(/^\w+$/)]),
    })
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

  register() {
    if (this.usernameExists) {
      this.checkUsername();
    }
    else if (this.form.valid) {
      this.authService.register(this.form.get("email")?.value?.toLowerCase(), this.form.get("password")?.value)
      .then((res) => {
        console.log(res)
        this.userService.createUser({
          username: this.form.get("username")?.value.toLowerCase(),
          email: this.form.get("email")?.value.toLowerCase(),
          totalNumberOfGamesCompleted: 0,
          bestScore: 0
        })
        .then((res1: any) => {
          console.log(res1);
        })
      })
    }
  }

  usernameInput() {
    this.usernameExists = true;
    this.usernameAvailabilityChecked = false;
    this.usernameCheckFailed = false;
  }

  checkUsername() {
    if (this.form.get("username")!.valid) {
      this.checkingUsernameAvailability = true;
      this.usernameCheckFailed = false;
      this.usernameExists = true;
      this.userService.getUser(this.form.get("username")?.value?.toLowerCase()).get()
      .subscribe((res) => {
        this.usernameAvailabilityChecked = true;
        this.checkingUsernameAvailability = false;
        if (res.exists) {
          this.usernameExists = true;
        } else {
          this.usernameExists = false;
        }
      }, (err) => {
        this.usernameAvailabilityChecked = true;
        this.checkingUsernameAvailability = false;
        this.usernameCheckFailed = true;
      })
    }
  }

}
