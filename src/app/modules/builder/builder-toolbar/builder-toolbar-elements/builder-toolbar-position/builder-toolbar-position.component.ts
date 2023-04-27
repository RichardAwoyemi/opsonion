import { Component, Input } from '@angular/core';
import { IframeService } from '../../../../../shared/services/iframe.service';
import { IComponentMetadata, IComponent } from '../../../builder-components/builder-components';
import { IElementSettings } from '../../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';
import { BuilderToolbarElementService } from '../builder-toolbar-element.service';
import { ISectionElement } from '../../../builder-components/builder-section/builder-section';
import { IWebsite } from 'src/app/shared/models/website';
import { UtilService } from 'src/app/shared/services/util.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';

@Component({
  selector: 'app-builder-toolbar-position',
  templateUrl: './builder-toolbar-position.component.html',
  styleUrls: ['../../builder-toolbar.component.css', './builder-toolbar-position.component.css'],
})
export class BuilderToolbarPositionComponent {
  @Input() settings: IElementSettings;

  get activeComponentMetadata(): IComponentMetadata {
    return this._activeComponentMetadata;
  }

  @Input() set activeComponentMetadata(newVal: IComponentMetadata) {
    if (this._activeComponentMetadata === newVal) {
      return;
    }
    this._activeComponentMetadata = newVal;
    this.onActiveComponentMetadataChange(this._activeComponentMetadata);
  }

  get activeToolbarElement(): string {
    return this._activeToolbarElement;
  }

  @Input() set activeToolbarElement(newVal: string) {
    if (this._activeToolbarElement === newVal) {
      return;
    }
    this._activeToolbarElement = newVal;
    this.onActiveToolbarElementChange(this._activeToolbarElement);
  }

  get website(): IWebsite {
    return this._website;
  }

  @Input() set website(newVal: IWebsite) {
    if (this._website === newVal) {
      return;
    }
    this._website = newVal;
    this.onWebsiteChange(this._website);
  }

  showMenu: boolean;
  activeComponent: IComponent;
  activeElement: ISectionElement;
  activeComponentId: string;
  BUTTON_CLASS = 'toolbar-button';
  ACTIVE_BUTTON_CLASS = 'toolbar-button toolbar-button-active';
  document = IframeService.getIframeElement('builder-showcase');
  buttonSettings = [
    {
      x: { text: 'Left', active: false, source: 'assets/img/position-left.svg' },
      y: { text: 'Top', active: false, source: 'assets/img/position-top.svg' },
    },
    {
      x: { text: 'Centre', active: false, source: 'assets/img/position-centre.svg' },
      y: { text: 'Middle', active: false, source: 'assets/img/position-middle.svg' },
    },
    {
      x: { text: 'Right', active: false, source: 'assets/img/position-right.svg' },
      y: { text: 'Bottom', active: false, source: 'assets/img/position-bottom.svg' },
    },
  ];
  private _website: IWebsite;
  private _activeToolbarElement: string;
  private _activeComponentMetadata: IComponentMetadata;

  constructor(
    private builderToolbarElementService: BuilderToolbarElementService,
    private builderComponentsService: BuilderComponentsService
  ) {}

  onActiveToolbarElementChange(activeToolbarElement: string): void {
    if (activeToolbarElement !== 'toolbarPosition') {
      this.showMenu = false;
      this.BUTTON_CLASS = 'toolbar-button';
    } else {
      if (this.website && this.activeComponentMetadata) {
        this.setVariables(this.website);
      }
    }
  }

  setVariables(website: IWebsite, data = this.activeComponentMetadata): void {
    this.activeComponent = this.builderToolbarElementService.getComponent(website, data);
    for (let i = 0; i < this.activeComponent.elements.length; i++) {
      if (this.activeComponent.elements[i].elementId === data.activeElementId) {
        this.activeElement = this.activeComponent.elements[i];
        break;
      }
    }
    this.setButtonStatusXAxis();
    this.setButtonStatusYAxis(data);
  }

  onWebsiteChange(website: IWebsite): void {
    if (
      this.activeToolbarElement === 'toolbarPosition' &&
      this.activeComponentMetadata &&
      this.activeComponentMetadata.activeElement
    ) {
      this.setVariables(website);
    }
  }

  onActiveComponentMetadataChange(activeComponentMetadata: IComponentMetadata): void {
    if (
      this.activeToolbarElement === 'toolbarPosition' &&
      this.activeComponentMetadata &&
      this.activeComponentMetadata.activeElement
    ) {
      this.setVariables(this.website, activeComponentMetadata);
    }
  }

  togglePositionMenu(): void {
    if (this.BUTTON_CLASS === 'toolbar-button') {
      this.builderToolbarElementService.activeToolbarElement.next('toolbarPosition');
      this.showMenu = true;
      this.BUTTON_CLASS = 'toolbar-button toolbar-button-active';
    } else {
      this.builderToolbarElementService.activeToolbarElement.next(null);
      this.showMenu = false;
      this.BUTTON_CLASS = 'toolbar-button';
    }
  }

  setPosition(position: string): void {
    switch (position) {
      case 'Top':
        this.activeElement.translate.y = 0;
        break;
      case 'Middle':
        this.activeElement.translate.y =
          this.activeComponentMetadata.component.height / 2 -
          this.activeComponentMetadata.activeElement.height / 2;
        break;
      case 'Bottom':
        this.activeElement.translate.y =
          this.activeComponentMetadata.component.height - this.activeElement.height;
        break;
      case 'Left':
        this.activeElement.translate.x = 0;
        break;
      case 'Centre':
        this.activeElement.translate.x = 50 - this.activeComponentMetadata.activeElement.width / 2;
        break;
      case 'Right':
        this.activeElement.translate.x = 100 - this.activeElement.width;
        break;
    }
    const website = UtilService.shallowClone(this.website);
    this.activeComponent =
      website.pages[this.activeComponentMetadata.component.pageIndex].components[
        this.activeComponentMetadata.component.componentIndex
      ];
    const elements = this.activeComponent.elements;
    const activeElemmentIndex = elements.findIndex(
      (element) => element.elementId === this.activeElement.elementId
    );
    elements[activeElemmentIndex] = this.activeElement;
    this.builderComponentsService.website.next(website);
  }

  setLayer(adjustment: number): void {
    const elementCount = this.activeComponent.elements.length;
    const oldLayer = this.activeElement.layer;
    const newLayer = Math.min(Math.max(oldLayer + adjustment, 0), elementCount - 1);
    const website = UtilService.shallowClone(this.website);
    const component =
      website.pages[this.activeComponent.pageIndex].components[this.activeComponent.componentIndex];
    const element = component.elements.splice(oldLayer, 1)[0];
    component.elements.splice(newLayer, 0, element);
    for (let i = 0; i < elementCount; i++) {
      component.elements[i].layer = i;
      if (component.elements[i].elementId === element.elementId) {
        this.activeElement = component.elements[i];
      }
    }
    website.pages[this.activeComponent.pageIndex].components[
      this.activeComponent.componentIndex
    ] = component;
    this.activeComponent = component;
    this.builderComponentsService.website.next(website);
  }

  setButtonStatusXAxis(): void {
    this.buttonSettings[0].x.active = this.activeElement.translate.x === 0;
    this.buttonSettings[1].x.active =
      this.activeElement.translate.x === 50 - this.activeElement.width / 2;
    this.buttonSettings[2].x.active =
      this.activeElement.translate.x === 100 - this.activeElement.width;
  }

  setButtonStatusYAxis(componentMetaData: IComponentMetadata): void {
    this.buttonSettings[0].y.active = this.activeElement.translate.y === 0;
    this.buttonSettings[1].y.active =
      this.activeElement.translate.y ===
      componentMetaData.component.height / 2 - this.activeElement.height / 2;
    this.buttonSettings[2].y.active =
      this.activeElement.translate.y ===
      componentMetaData.component.height - this.activeElement.height;
  }
}
