import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "src/app/core/services/auth.service";
import { Navlink } from '../../models/navlink';
import { NavlinksService } from '../../services/navlinks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  loggingOut: boolean = false;
  navlinks: Navlink[] = this.navlinkService.navlinks;
  constructor(
    private authService: AuthService,
    private router: Router,
    private navlinkService: NavlinksService
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
