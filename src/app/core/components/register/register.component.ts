import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  constructor(private authService: AuthService) { }

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

}
