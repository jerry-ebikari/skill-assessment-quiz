import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Navlink } from '../../models/navlink';
import { AuthService } from '../../services/auth.service';
import { NavlinksService } from '../../services/navlinks.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isLoggedIn: boolean = false;
  loggingOut: boolean = false;
  isVisible = false;
  navlinks: Navlink[] = this.navlinkService.navlinks;
  constructor(
    private navlinkService: NavlinksService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
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

  toggle() {
    this.isVisible = !this.isVisible;
  }

}
