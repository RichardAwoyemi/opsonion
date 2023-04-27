import { Component, Input } from '@angular/core';
import { IWebsite } from '../../../../../shared/models/website';
import { ActiveSettings } from '../../../builder';
import {
  ColourTypes,
  IComponent,
  IComponentMetadata,
  IToolbarColours,
} from '../../../builder-components/builder-components';
import { ISectionElement } from '../../../builder-components/builder-section/builder-section';
import { BuilderService } from '../../../builder.service';
import { BuilderToolbarElementService } from '../builder-toolbar-element.service';
import { IElementSettings } from '../../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';

@Component({
  selector: 'app-builder-toolbar-colour',
  templateUrl: './builder-toolbar-colour.component.html',
  styleUrls: ['../../builder-toolbar.component.css', './builder-toolbar-colour.component.css'],
})
export class BuilderToolbarColourComponent {
  @Input() settings: IElementSettings;

  get activeSetting(): ActiveSettings {
    return this._activeSetting;
  }

  @Input()
  set activeSetting(activeSettings: ActiveSettings) {
    this._activeSetting = activeSettings;
    this.onActiveSettingChange(this._activeSetting);
  }

  get activeComponentMetadata(): IComponentMetadata {
    return this._activeComponentMetadata;
  }

  @Input()
  set activeComponentMetadata(activeComponentMetadata: IComponentMetadata) {
    if (this._activeComponentMetadata === activeComponentMetadata) {
      return;
    }
    this._activeComponentMetadata = activeComponentMetadata;
    this.setVariables(undefined, this._activeComponentMetadata);
  }

  @Input()
  set website(website: IWebsite) {
    if (this._website === website) {
      return;
    }
    this._website = website;
    this.setVariables(this._website);
  }

  activeComponent: IComponent;
  activeElement: ISectionElement;
  colourSettings: IToolbarColours[];
  previousActiveSetting: ActiveSettings = ActiveSettings.Templates;
  inactiveClass = 'inactive-colour-button';
  activeClass = 'active-colour-button';
  activeColourIndex: number;
  activeColours = [];

  private _website: IWebsite;
  private _activeComponentMetadata: IComponentMetadata;
  private _activeSetting: ActiveSettings;

  constructor(
    private builderToolbarElementService: BuilderToolbarElementService,
    private builderService: BuilderService
  ) {}

  setVariables(website = this._website, data = this._activeComponentMetadata): void {
    if (
      website &&
      data &&
      data.activeElement &&
      (!this.activeElement || this.activeElement.elementId !== data.activeElementId)
    ) {
      this.activeColourIndex = undefined;
      this.setComponent(website, data);
      this.setElement(data);
      const elementData = this.activeElement.data[this.activeElement.type];
      this.setColourSettings(elementData);
      this.setColourArray(elementData);
    } else if (website && data.activeElement) {
      this.setComponent(website, data);
      this.setElement(data);
      if (this.activeColours[this.activeColourIndex]) {
        this.activeColours[this.activeColourIndex].colour = this.activeElement.data[
          this.activeElement.type
        ].style[this.activeColours[this.activeColourIndex].setting.key];
      }
    } else if (website && data) {
      this.activeElement = null;
      this.activeColourIndex = 0;
      this.setComponent(website, data);
      this.colourSettings = this.setDefaultSettings('component');
      this.activeColours = [
        {
          index: 0,
          colour: this.activeComponent.style['background-color'],
          setting: this.colourSettings[0],
        },
      ];
    }
  }

  onActiveSettingChange(setting: ActiveSettings): void {
    const toolbarElement = this.builderToolbarElementService.activeToolbarElement.getValue();
    if (toolbarElement !== 'colour') {
      this.previousActiveSetting =
        toolbarElement !== 'fontColour' ? setting : this.previousActiveSetting;
      this.activeColourIndex = null;
    }
  }

  setComponent(website: IWebsite, data = this.activeComponentMetadata): void {
    this.activeComponent =
      website.pages[data.component.pageIndex].components[data.component.componentIndex];
  }

  setElement(data = this.activeComponentMetadata): void {
    this.activeElement = this.activeComponent.elements.find(
      (element) => element.elementId === data.activeElementId
    );
  }

  setColourSettings(elementData: unknown = null): void {
    if (this.activeComponentMetadata && this.activeComponentMetadata.activeElement) {
      this.colourSettings =
        elementData['colours'] && elementData !== null
          ? elementData['colours']
          : this.setDefaultSettings(this.activeElement.type);
    }
  }

  setColourArray(elementData: unknown): void {
    const activeColours = [];
    this.colourSettings.forEach((setting, index) => {
      if (setting.type === ColourTypes.Style) {
        activeColours.push({
          index: index,
          colour: elementData['style'][setting.key],
          setting: setting,
        });
      }
    });
    this.activeColours = activeColours;
  }

  toggleColourSidebar(
    activeColour: { index: number; colour: string; setting: IToolbarColours },
    i: number
  ): void {
    if (this.activeSetting === ActiveSettings.Colour && i === this.activeColourIndex) {
      this.clearActiveSettings();
    } else {
      this.setActiveSettings(i, 'colour', activeColour, ActiveSettings.Colour);
    }
  }

  setDefaultSettings(type: string): IToolbarColours[] {
    switch (type) {
      case 'button':
        return [
          { type: ColourTypes.Style, key: 'background-color' },
          { type: ColourTypes.Style, key: 'border-color' },
        ];
      case 'text':
        return [
          { type: ColourTypes.Style, key: 'background-color' },
          { type: ColourTypes.Style, key: 'border-color' },
        ];
      case 'component':
        return [{ type: ColourTypes.ComponentStyle, key: 'background-color' }];
    }
  }

  clearActiveSettings(): void {
    this.setActiveSettings(undefined, null, null, this.previousActiveSetting);
  }

  setActiveSettings(
    colourIndex: number,
    toolbarElement: string,
    toolbarColourSetting: {
      index: number;
      colour: string;
      setting: IToolbarColours;
    },
    activeSetting: ActiveSettings
  ): void {
    this.activeColourIndex = colourIndex;
    this.builderToolbarElementService.activeToolbarElement.next(toolbarElement);
    this.builderToolbarElementService.activeToolbarColourSetting.next(toolbarColourSetting);
    this.builderService.activeSetting.next(activeSetting);
  }
}
