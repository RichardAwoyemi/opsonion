import { Component, Input } from '@angular/core';
import { ActiveSettings } from '../../../builder';
import { IComponentMetadata } from '../../../builder-components/builder-components';
import { IElementSettings } from '../../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';
import { BuilderService } from '../../../builder.service';
import { BuilderToolbarElementService } from '../builder-toolbar-element.service';

@Component({
  selector: 'app-builder-toolbar-animate',
  templateUrl: './builder-toolbar-animate.component.html',
  styleUrls: ['../../builder-toolbar.component.css'],
})
export class BuilderToolbarAnimateComponent {
  @Input() settings: IElementSettings;

  get activeSetting(): ActiveSettings {
    return this._activeSetting;
  }

  @Input()
  set activeSetting(newVal: ActiveSettings) {
    this._activeSetting = newVal;
    this.onActiveSettingChange(this._activeSetting);
  }

  get activeComponentMetadata(): IComponentMetadata {
    return this._activeComponentMetadata;
  }

  @Input()
  set activeComponentMetadata(newVal: IComponentMetadata) {
    if (this._activeComponentMetadata === newVal) {
      return;
    }
    this._activeComponentMetadata = newVal;
  }

  animate: string;
  previousActiveSetting: ActiveSettings;
  buttonClass = 'inactive-animate-button';
  selectorName: string;

  private _activeComponentMetadata: IComponentMetadata;
  private _activeSetting: ActiveSettings;

  constructor(
    private builderToolbarElementService: BuilderToolbarElementService,
    private builderService: BuilderService
  ) {}

  onActiveSettingChange(setting: ActiveSettings): void {
    if (setting !== ActiveSettings.Font) {
      this.previousActiveSetting = setting;
      this.buttonClass = 'inactive-animate-button';
    } else {
      this.buttonClass = 'active-animate-button';
    }
  }

  toggleAnimateSidebar(): void {
    if (this.activeSetting === ActiveSettings.Animate) {
      this.builderToolbarElementService.activeToolbarElement.next(null);
      this.builderService.activeSetting.next(this.previousActiveSetting);
    } else {
      this.builderToolbarElementService.activeToolbarElement.next('animate');
      this.builderService.activeSetting.next(ActiveSettings.Animate);
    }
  }
}
