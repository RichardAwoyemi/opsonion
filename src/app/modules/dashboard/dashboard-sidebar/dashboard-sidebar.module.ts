import { NgModule } from '@angular/core';
import { DashboardSidebarComponent } from './dashboard-sidebar.component';
import { DashboardSidebarMenuComponent } from './dashboard-sidebar-menu/dashboard-sidebar-menu.component';
import { DashboardSidebarProfileComponent } from './dashboard-sidebar-profile/dashboard-sidebar-profile.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DashboardSidebarComponent,
    DashboardSidebarMenuComponent,
    DashboardSidebarProfileComponent,
  ],
  imports: [CommonModule],
  exports: [
    DashboardSidebarComponent,
    DashboardSidebarMenuComponent,
    DashboardSidebarProfileComponent,
  ],
})
export class DashboardSidebarModule {}
