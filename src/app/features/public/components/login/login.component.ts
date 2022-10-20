import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required]),
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
}
