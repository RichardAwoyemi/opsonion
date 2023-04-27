import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.page';
import { NgModule } from '@angular/core';
import { DashboardBodyModule } from './dashboard-body/dashboard-body.module';
import { DashboardSidebarModule } from './dashboard-sidebar/dashboard-sidebar.module';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { DashboardActionsModule } from './dashboard-actions/dashboard-actions.module';
import { WebsiteService } from '../../shared/services/website.service';
import { DashboardTabsModule } from './dashboard-tabs/dashboard-tabs.module';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild(routes),
    DashboardBodyModule,
    DashboardActionsModule,
    DashboardSidebarModule,
    DashboardTabsModule,
    CommonModule,
  ],
  exports: [DashboardComponent],
  providers: [DashboardService, WebsiteService],
})
export class DashboardModule {}
