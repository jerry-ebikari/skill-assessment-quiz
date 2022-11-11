import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth-management',
  templateUrl: './auth-management.component.html',
  styleUrls: ['./auth-management.component.scss']
})
export class AuthManagementComponent implements OnInit {
  passwordResetForm!: FormGroup;
  mode: string | null = null;
  actionCode: string | null = null;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  @ViewChild("invalidActionCodeModal") invalidActionCodeModal: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mode = this.activatedRoute.snapshot.queryParamMap.get("mode");
    this.actionCode = this.activatedRoute.snapshot.queryParamMap.get("oobCode");
    this.passwordResetForm = new FormGroup({
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl("", [Validators.required])
    })
    // if (this.mode && this.actionCode) {
    //   switch (this.mode) {
    //     case "resetPassword":
    //       this.authService.verifyPasswordResetCode(this.actionCode)
    //       .then((res) => {
    //         console.log(res)
    //       }, (err) => {
    //         console.log(err);
    //         this.invalidActionCodeModal.open({
    //           title: "Link invalid or expired",
    //           message: "Close modal to request a new link"
    //         })
    //       })
    //   }
    // } else {
    //   this.router.navigate(['/login'])
    // }
  }

  ngAfterViewInit() {
  }

  
  togglePasswordVisibility(passwordField?: any) {
    if (passwordField!.name == "password") {
      this.passwordVisible =  !this.passwordVisible;
    } else {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
