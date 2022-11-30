import { Injectable } from '@angular/core';
import { Navlink } from '../models/navlink';

@Injectable({
  providedIn: 'root'
})
export class NavlinksService {

  navlinks: Navlink[] = [
    {
      displayText: "Home",
      routerLink: "/user",
      exact: true
    },
    {
      displayText: "Topics",
      routerLink: "/user/topics"
    },
    {
      displayText: "Favorites",
      routerLink: "/user/favorites"
    },
  ]
  constructor() { }
}
