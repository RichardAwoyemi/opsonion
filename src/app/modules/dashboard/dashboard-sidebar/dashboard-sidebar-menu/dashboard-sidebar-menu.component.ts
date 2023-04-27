import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSidebarSettings } from '../../dashboard';
import { DashboardService } from '../../dashboard.service';
import { AuthService } from '../../../auth/auth.service';
import { IUser } from '../../../../shared/models/user';
import * as fromUser from '../../../core/store/shared/user.reducer';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-sidebar-links',
  templateUrl: './dashboard-sidebar-menu.component.html',
})
export class DashboardSidebarMenuComponent implements OnInit {
  ACTIVE_SIDEBAR_WEBSITES: string = ActiveSidebarSettings.Websites;
  ACTIVE_SIDEBAR_TEMPLATES: string = ActiveSidebarSettings.Templates;
  ACTIVE_SIDEBAR_SETTINGS: string = ActiveSidebarSettings.AccountSettings;
  ACTIVE_SIDEBAR_REWARDS: string = ActiveSidebarSettings.Rewards;
  user: IUser;
  messageDisplayed = false;

  constructor(
    public router: Router,
    private dashboardService: DashboardService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private userStore: Store<fromUser.State>
  ) {}

  ngOnInit(): void {
    this.userStore
      .select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
          if (!this.user.firstName && !this.user.lastName && this.user.uid) {
            this.dashboardService.activeSidebarSetting.next(ActiveSidebarSettings.AccountSettings);
            if (!this.messageDisplayed) {
              this.toastrService.warning('Please set up your account before continuing.');
              this.messageDisplayed = true;
            }
          }
        }
      });
  }

  signOut(): void {
    this.authService.signOut();
  }

  setActiveSidebar(selectedOption: string): void {
    this.dashboardService.activeSidebarSetting.next(selectedOption);
    this.dashboardService.triggerScrollTo(selectedOption);
  }

  setActiveSidebarClass(option: string): string {
    if (option === this.dashboardService.activeSidebarSetting.getValue()) {
      return 'nav-link active';
    } else {
      return 'nav-link';
    }
  }
}
