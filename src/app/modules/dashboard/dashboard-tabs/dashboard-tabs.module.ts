import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTabsComponent } from './dashboard-tabs.component';
import { DashboardBodyModule } from '../dashboard-body/dashboard-body.module';
import { DashboardTabsHeadingComponent } from './dashboard-tabs-heading/dashboard-tabs-heading.component';

@NgModule({
  declarations: [DashboardTabsComponent, DashboardTabsHeadingComponent],
  imports: [CommonModule, DashboardBodyModule],
  exports: [DashboardTabsComponent],
})
export class DashboardTabsModule {}
