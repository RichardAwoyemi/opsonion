import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../../shared/services/util.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-dashboard-tabs-heading',
  templateUrl: './dashboard-tabs-heading.component.html',
})
export class DashboardTabsHeadingComponent implements OnInit {
  greetingMessage: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.greetingMessage = UtilService.generateGreeting();
  }

  signOut(): void {
    this.authService.signOut();
  }
}
