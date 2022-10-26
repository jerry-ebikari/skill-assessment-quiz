import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  email!: string | null;

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.email = localStorage.getItem("userEmail");
    if (!this.email) {
      this.router.navigate(["/login"]);
    }
    console.log(this.userService.getUser(this.email as string));
    
  }

  resendVerificationEmail() {
    this.userService.getUser(this.email as string)
  }

}
