import { Component, Input } from '@angular/core';
import { ActiveSettings } from '../../../builder';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-builder-sidebar-menu-item',
  templateUrl: './builder-sidebar-menu-item.component.html',
  styleUrls: ['../builder-sidebar-menu.component.css'],
})
export class BuilderSidebarMenuItemComponent {
  @Input() activeSetting;
  @Input() menuText;
  @Input() innerHeight;
  @Input() svgIconPath;
  @Input() svgIconHeight;
  @Input() svgIconWidth;

  ACTIVE_BUTTON_CLASS = 'nav-link active';
  INACTIVE_BUTTON_CLASS = 'nav-link';

  constructor(private builderService: BuilderService) {}

  setActiveEditSetting(settingName: ActiveSettings): void {
    this.builderService.activeSetting.next(settingName);
  }

  setMenuClass(menuItem: string): string {
    return this.builderService.activeSetting.getValue() === menuItem
      ? this.ACTIVE_BUTTON_CLASS
      : this.INACTIVE_BUTTON_CLASS;
  }
}
