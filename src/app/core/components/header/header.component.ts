import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  loggingOut: boolean = false;
  // @Input() navlinks: any = [
  //   {
  //     title: "Demo"
  //   },
  //   {
  //     title: "About"
  //   },
  //   {
  //     title: "Contact"
  //   },
  // ]
  constructor(
    private authService: AuthService, private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") ? true : false;
  }

  ngDoCheck() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") ? true : false;
  }

  logout() {
    this.loggingOut = true;
    this.authService.logout()
    .then(() => {
      localStorage.clear();
      this.loggingOut = false;
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }, err => {
      this.loggingOut = false;
      console.log(err.message)
    })
  }

}
