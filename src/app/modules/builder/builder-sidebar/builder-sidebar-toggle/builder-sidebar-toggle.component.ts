import { Component, Input } from '@angular/core';
import { BuilderService } from 'src/app/modules/builder/builder.service';
import { ActiveSettings } from '../../builder';

@Component({
  selector: 'app-builder-sidebar-toggle',
  templateUrl: './builder-sidebar-toggle.component.html',
  styleUrls: ['./builder-sidebar-toggle.component.css'],
})
export class BuilderSidebarToggleComponent {
  get activeSetting(): ActiveSettings {
    return this._activeSetting;
  }

  @Input() set activeSetting(newVal: ActiveSettings) {
    this._activeSetting = newVal;
    this.setToggleStyle(this._activeSetting);
  }

  toggleStyle: { opacity: string; left?: string };
  private toolbarTabs = [
    ActiveSettings.Colour,
    ActiveSettings.Font,
    ActiveSettings.Adjust,
    ActiveSettings.Animate,
  ];
  private _activeSetting: ActiveSettings;

  constructor(private builderService: BuilderService) {}

  setToggleStyle(activeSetting: ActiveSettings): void {
    if (this.toolbarTabs.includes(activeSetting) || !activeSetting) {
      this.toggleStyle = { opacity: '0', left: '-10%' };
    } else {
      setTimeout(() => {
        this.toggleStyle = { opacity: '100%' };
      }, 350);
    }
  }

  toggleSidebar(): void {
    this.builderService.activeSetting.next(null);
  }
}
