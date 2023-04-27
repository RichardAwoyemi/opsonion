import { Component, HostListener, OnInit } from '@angular/core';
import { ActiveSidebarSettings } from '../../dashboard';
import { DashboardService } from '../../dashboard.service';
import { IUser } from '../../../../shared/models/user';
import * as fromUser from '../../../core/store/shared/user.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { debounce } from '../../../../shared/decorators/debounce.decorator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardCreateWebsiteModalComponent } from '../../dashboard-actions/dashboard-create-website-modal/dashboard-create-website-modal.component';

@Component({
  selector: 'app-dashboard-sidebar-profile',
  templateUrl: './dashboard-sidebar-profile.component.html',
  styleUrls: ['./dashboard-sidebar-profile.component.css'],
})
export class DashboardSidebarProfileComponent implements OnInit {
  ACTIVE_SIDEBAR_SETTINGS: string = ActiveSidebarSettings.AccountSettings;
  photoURL = '/assets/img/anonymous.jpg';
  user: IUser;
  dashboardSidebarWidth: number;
  hideImageProfilePicture = false;

  constructor(
    private dashboardService: DashboardService,
    private userStore: Store<fromUser.State>,
    public router: Router,
    private modalService: NgbModal
  ) {}

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize(): void {
    this.dashboardSidebarWidth = document.getElementById('dashboard-sidebar').offsetWidth - 30;
  }

  ngOnInit(): void {
    this.dashboardSidebarWidth = document.getElementById('dashboard-sidebar').offsetWidth - 30;

    this.userStore
      .select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });
  }

  setActiveSidebar(selectedOption: string): void {
    this.dashboardService.activeSidebarSetting.next(selectedOption);
  }

  openCreateWebsiteModal(): void {
    this.modalService.open(DashboardCreateWebsiteModalComponent, {
      windowClass: 'modal-holder',
      centered: true,
    });
  }

  handleImageError(): void {
    this.hideImageProfilePicture = true;
  }
}
