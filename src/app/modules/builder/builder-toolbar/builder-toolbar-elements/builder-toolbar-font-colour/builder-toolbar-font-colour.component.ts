import { Component, Input } from '@angular/core';
import { ActiveSettings } from '../../../builder';
import { IComponentMetadata } from '../../../builder-components/builder-components';
import { BuilderService } from '../../../builder.service';
import { BuilderToolbarElementService } from '../builder-toolbar-element.service';
import { IElementSettings } from '../../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';

@Component({
  selector: 'app-builder-toolbar-font-colour',
  templateUrl: './builder-toolbar-font-colour.component.html',
  styleUrls: ['../../builder-toolbar.component.css', './builder-toolbar-font-colour.component.css'],
})
export class BuilderToolbarFontColourComponent {
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

  previousActiveSetting: ActiveSettings;
  buttonClass = '';

  private _activeComponentMetadata: IComponentMetadata;
  private _activeSetting: ActiveSettings;

  constructor(
    private builderToolbarElementService: BuilderToolbarElementService,
    private builderService: BuilderService
  ) {}

  onActiveSettingChange(setting: ActiveSettings): void {
    if (
      this.builderToolbarElementService.activeToolbarElement.getValue() !== 'fontColour' ||
      setting !== ActiveSettings.Colour
    ) {
      this.previousActiveSetting = setting;
      this.buttonClass = 'inactive-font-colour-button';
    } else {
      this.buttonClass = 'active-font-colour-button';
    }
  }

  toggleFontColourSidebar(): void {
    if (this.activeSetting === ActiveSettings.Colour) {
      this.builderToolbarElementService.activeToolbarElement.next(null);
      this.builderToolbarElementService.activeToolbarColourSetting.next(undefined);
      this.builderService.activeSetting.next(this.previousActiveSetting);
    } else {
      this.builderToolbarElementService.activeToolbarColourSetting.next(undefined);
      this.builderToolbarElementService.activeToolbarElement.next('fontColour');
      this.builderService.activeSetting.next(ActiveSettings.Colour);
    }
  }
}
