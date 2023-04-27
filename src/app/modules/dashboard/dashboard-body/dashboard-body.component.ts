import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { debounce } from '../../../shared/decorators/debounce.decorator';
import { ActiveSidebarSettings } from '../dashboard';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-body',
  templateUrl: './dashboard-body.component.html',
})
export class DashboardBodyComponent implements OnInit, OnDestroy {
  innerHeight: number;
  activeSidebar: string = ActiveSidebarSettings.Websites;
  ACTIVE_SIDEBAR_WEBSITES: string = ActiveSidebarSettings.Websites;
  ACTIVE_SIDEBAR_TEMPLATES: string = ActiveSidebarSettings.Templates;
  ACTIVE_SIDEBAR_SETTINGS: string = ActiveSidebarSettings.AccountSettings;
  ACTIVE_SIDEBAR_REWARDS: string = ActiveSidebarSettings.Rewards;

  ngUnsubscribe = new Subject<void>();

  constructor(private dashboardService: DashboardService) {}

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize(): void {
    this.innerHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.innerHeight = window.innerHeight;
    this.dashboardService.activeSidebarSetting
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response) {
          this.activeSidebar = response;
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
