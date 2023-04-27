import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../../shared/services/router.service';

@Component({
  templateUrl: './home.page.html',
})
export class HomeComponent implements OnInit {
  constructor(private routerService: RouterService) {}

  ngOnInit(): void {
    this.routerService.currentRoute.next(window.location.pathname);
  }
}
