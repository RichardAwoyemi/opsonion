import { Component, Input } from '@angular/core';
import { ActiveSettings } from '../../../builder';
import { IComponentMetadata } from '../../../builder-components/builder-components';
import { IElementSettings } from '../../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';
import { BuilderService } from '../../../builder.service';
import { BuilderToolbarElementService } from '../builder-toolbar-element.service';

@Component({
  selector: 'app-builder-toolbar-font-name',
  templateUrl: './builder-toolbar-font-name.component.html',
  styleUrls: ['../../builder-toolbar.component.css', './builder-toolbar-font-name.component.css'],
})
export class BuilderToolbarFontNameComponent {
  @Input() settings: IElementSettings;

  get activeSetting(): ActiveSettings {
    return this._activeSetting;
  }

  @Input()
  set activeSetting(newVal: ActiveSettings) {
    this._activeSetting = newVal;
    this.onActiveSettingChange(this._activeSetting);
  }

  @Input()
  set activeFontName(val: string) {
    this.setFont(this._activeComponentMetadata);
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
    this.setFont(this._activeComponentMetadata);
  }

  fontName: string;
  previousActiveSetting: ActiveSettings;
  buttonClass = '';
  selectorName: string;

  private _activeComponentMetadata: IComponentMetadata;
  private _activeSetting: ActiveSettings;

  constructor(
    private builderToolbarElementService: BuilderToolbarElementService,
    private builderService: BuilderService
  ) {}

  setFont(activeComponent: IComponentMetadata): void {
    const activeElement = this.builderToolbarElementService.getElement(activeComponent);
    this.fontName = activeElement.data[activeElement.type].style['font-family'];
  }

  onActiveSettingChange(setting: ActiveSettings): void {
    if (setting !== ActiveSettings.Font) {
      this.previousActiveSetting = setting;
      this.buttonClass = 'inactive-font-name-button';
    } else {
      this.buttonClass = 'active-font-name-button';
    }
  }

  toggleFontNameSidebar(): void {
    if (this.activeSetting === ActiveSettings.Font) {
      this.builderToolbarElementService.activeToolbarElement.next(null);
      this.builderService.activeSetting.next(this.previousActiveSetting);
    } else {
      this.builderToolbarElementService.activeToolbarElement.next('fontName');
      this.builderService.activeSetting.next(ActiveSettings.Font);
    }
  }
}
