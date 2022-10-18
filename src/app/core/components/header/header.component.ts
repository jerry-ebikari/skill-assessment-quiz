import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}
