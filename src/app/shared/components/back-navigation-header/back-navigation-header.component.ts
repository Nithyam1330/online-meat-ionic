import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-back-navigation-header',
  templateUrl: './back-navigation-header.component.html',
  styleUrls: ['./back-navigation-header.component.scss'],
})
export class BackNavigationHeaderComponent implements OnInit {

  constructor(private location: Location, private router: Router) { }

  ngOnInit() { }

  public navigateToBack() {
    this.location.back();
  }

  public navigateToHome() {
    this.router.navigate(['tabs', 'tab3']);
  }

}
