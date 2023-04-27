import { NgModule } from '@angular/core';
import { BuilderSidebarMenuComponent } from './builder-sidebar-menu.component';
import { BuilderSidebarMenuItemComponent } from './builder-sidebar-menu-item/builder-sidebar-menu-item.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BuilderSidebarMenuComponent, BuilderSidebarMenuItemComponent],
  exports: [BuilderSidebarMenuComponent, BuilderSidebarMenuItemComponent],
  imports: [CommonModule],
})
export class BuilderSidebarMenuModule {}
