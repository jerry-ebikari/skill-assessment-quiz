import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/features/user/services/user.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-auth-management',
  templateUrl: './auth-management.component.html',
  styleUrls: ['./auth-management.component.scss']
})
export class AuthManagementComponent implements OnInit {
  passwordResetForm!: FormGroup;
  resettingPassword: boolean = false;
  mode: string | null = null;
  actionCode: string | null = null;
  actionCodeVerified: boolean = false;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.mode = this.activatedRoute.snapshot.queryParamMap.get("mode");
    this.actionCode = this.activatedRoute.snapshot.queryParamMap.get("oobCode");
    this.passwordResetForm = new FormGroup({
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl("", [Validators.required])
    })
    if (this.mode && this.actionCode) {
      switch (this.mode) {
        case "resetPassword":
          this.confirmPasswordResetCode(this.actionCode);
          break;
        case "verifyEmail":
          this.verifyEmail(this.actionCode);
          break;
        default:
          this.router.navigate(["/login"]);
      }
    } else {
      this.router.navigate(['/login'])
    }
  }

  ngAfterViewInit() {
  }

  // CONFIRM PASSWORD RESET CODE
  confirmPasswordResetCode(actionCode: string) {
    this.loading = true;
    this.authService.verifyPasswordResetCode(actionCode)
    .then(
      (res) => {
        console.log(res);
        this.actionCodeVerified = true;
      },
      (err) => {
        console.log(err);
        this.toastService.showError("Link invalid or expired");
        setTimeout(() => {
          this.router.navigate(['/forgot-password']);
        }, 2000)
      }
    )
  }

  // VERIFY EMAIL
  verifyEmail(actionCode: string) {
    this.loading = true;
    this.authService.verifyUserEmail(actionCode)
    .then((res: any) => {
      console.log(res);
      // this.userService.saveUserEmailLocally(res.email)
      this.toastService.showSuccess("Email verified", "Redirecting to login page...");
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/login']);
      }, 2000)
    }, (err) => {
      console.log(err);
      this.toastService.showError("Email verification failed", "Redirecting to login page...");
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/login']);
      }, 2000)
    })
  }

  // RESET PASSWORD
  resetPassword() {
    if (this.actionCode && this.passwordResetForm.valid) {
      this.resettingPassword = true;
      this.authService.confirmPasswordReset(
        this.actionCode,
        this.passwordResetForm.get("password")?.value
      ).then((res) => {
        this.passwordResetForm.reset();
        this.resettingPassword = false;
        this.toastService.showSuccess("Password Saved");
        console.log(res)
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000)
      }, () => {
        this.toastService.showError("Failed", "Please try again");
        this.resettingPassword = false;
      })
    }
  }

  
  togglePasswordVisibility(passwordField?: any) {
    if (passwordField!.name == "password") {
      this.passwordVisible =  !this.passwordVisible;
    } else {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }
}
