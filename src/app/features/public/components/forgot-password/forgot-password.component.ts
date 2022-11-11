import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  userExists: boolean = true;
  @ViewChild("successModal") successModal: any;
  @ViewChild("failureModal") failureModal: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }

  onEmailInput() {
    this.userExists = true;
  }

  sendPasswordResetEmail() {
    if (this.form.valid) {
      this.loading = true;
      this.authService.sendPasswordResetEmail(this.form.get('email')?.value)
      .then(() => {
        this.loading = false;
        this.successModal.open({
          title: 'Password Reset Email Sent',
          message: 'Follow the link in your email reset your password'
        })
      }, (err) => {
        console.log(err);
        this.loading = false;
        if (/user-not-found|invalid-email/.test(err)) {
          this.userExists = false;
        } else {
          this.failureModal.open({
            title: 'Failed to send password reset email',
            message: 'Please check your network connection and retry'
          })
        }
      })
    }
  }

}
