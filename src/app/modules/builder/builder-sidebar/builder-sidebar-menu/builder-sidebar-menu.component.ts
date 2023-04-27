import { Component, Input } from '@angular/core';
import { BuilderSidebarMenuService } from './builder-sidebar-menu.service';

@Component({
  selector: 'app-builder-sidebar-menu',
  templateUrl: './builder-sidebar-menu.component.html',
  styleUrls: ['./builder-sidebar-menu.component.css'],
})
export class BuilderSidebarMenuComponent {
  @Input() activeSetting;
  @Input() innerHeight;

  INNER_HEIGHT_OFFSET = 56;
  SIDEBAR_MENU_ITEMS = BuilderSidebarMenuService.sidebarMenuItems;
}
