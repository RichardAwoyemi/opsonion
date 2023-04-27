import { Component, Input } from '@angular/core';
import { IframeService } from 'src/app/shared/services/iframe.service';
import { ActiveSettings } from '../../../builder';
import { BuilderService } from '../../../builder.service';
import { BuilderToolbarElementService } from '../builder-toolbar-element.service';
import { IElementSettings } from '../../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';

@Component({
  selector: 'app-builder-toolbar-sidebar-menu-item',
  templateUrl: './builder-toolbar-sidebar-menu-item.component.html',
  styleUrls: ['../../builder-toolbar.component.css'],
})
export class BuilderToolbarSidebarMenuItemComponent {
  @Input() settings: IElementSettings;

  document = IframeService.getIframeElement('builder-showcase');
  ACTIVE_COLOURS_SETTING = ActiveSettings.Colour;

  constructor(
    private builderToolbarElementService: BuilderToolbarElementService,
    private builderService: BuilderService
  ) {}

  setActiveEditSetting(): void {
    this.builderService.activeSetting.next(this.settings.menu);
  }

  setFormatButtonClass(): string {
    return this.builderToolbarElementService.setSidebarMenuButtonClass(this.settings.menu);
  }
}
