import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  emailAlreadyInUse: boolean = false;
  creatingUser: boolean = false;
  userCreated: boolean = false;
  failedToCreateUser: boolean = false;
  form!: FormGroup;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern(/^(\s*[a-zA-Z]\s*)+$/)]),
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl("", [Validators.required]),
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
      let userInfo = res.additionalUserInfo?.profile
      // USER INFO - email, family_name, given_name, name, picture
      console.log(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo))
    }, (err) => {
      console.log(err);
    })
  }

  register() {
    if (this.form.valid) {
      this.createUser();
    }
  }

  createUser() {
    this.failedToCreateUser = false;
    this.creatingUser = true;
    this.authService.register(this.form.get("email")?.value?.toLowerCase(), this.form.get("password")?.value)
      .then((res) => {
        console.log(res)
        let name = this.utilsService.processInputFieldValue(this.form.get('name')?.value)
        name = this.utilsService.toTitleCase(name);
        res.user?.updateProfile({
          displayName: name
        })
        this.creatingUser = false;
        this.userCreated = true;
        this.authService.sendVerificationEmail(res.user);
        localStorage.setItem("userEmail", this.form.get("email")?.value);
        this.router.navigate(['/email-verification'])
      }, (err) => {
        console.log(err.message)
        this.failedToCreateUser = true;
        if (err.message.includes("already in use")) {
          this.emailAlreadyInUse = true;
        }
        this.creatingUser = false;
      })
  }

}
