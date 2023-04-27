import { Component, Input } from '@angular/core';
import { IframeService } from '../../../../../shared/services/iframe.service';
import { IComponentMetadata, IComponent } from '../../../builder-components/builder-components';
import { IElementSettings } from '../../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';
import { BuilderToolbarElementService } from '../builder-toolbar-element.service';
import { ISectionElement } from '../../../builder-components/builder-section/builder-section';
import { IWebsite } from 'src/app/shared/models/website';
import { UtilService } from 'src/app/shared/services/util.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';
import { BuilderElementsService } from '../../../builder-elements/builder-elements.service';

@Component({
  selector: 'app-builder-toolbar-delete',
  templateUrl: './builder-toolbar-delete.component.html',
  styleUrls: ['../../builder-toolbar.component.css', './builder-toolbar-delete.component.css'],
})
export class BuilderToolbarDeleteComponent {
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
      x: { text: 'Left', active: false, source: 'assets/img/delete-left.svg' },
      y: { text: 'Top', active: false, source: 'assets/img/delete-top.svg' },
    },
    {
      x: { text: 'Centre', active: false, source: 'assets/img/delete-centre.svg' },
      y: { text: 'Middle', active: false, source: 'assets/img/delete-middle.svg' },
    },
    {
      x: { text: 'Right', active: false, source: 'assets/img/delete-right.svg' },
      y: { text: 'Bottom', active: false, source: 'assets/img/delete-bottom.svg' },
    },
  ];
  private _website: IWebsite;
  private _activeToolbarElement: string;
  private _activeComponentMetadata: IComponentMetadata;

  constructor(
    private builderToolbarElementService: BuilderToolbarElementService,
    private builderElementsService: BuilderElementsService,
    private builderComponentsService: BuilderComponentsService,
    private builderService: BuilderService
  ) {}

  onActiveToolbarElementChange(activeToolbarElement: string): void {
    if (activeToolbarElement !== 'toolbarDelete') {
      this.showMenu = false;
      this.BUTTON_CLASS = 'toolbar-button';
    }
  }

  onWebsiteChange(website: IWebsite): void {
    if (this.activeComponentMetadata && this.activeComponentMetadata.activeElement) {
      this.activeComponent = this.builderToolbarElementService.getComponent(
        website,
        this.activeComponentMetadata
      );
      this.activeElement = this.activeComponent.elements.find(
        (element) => element.elementId === this.activeComponentMetadata.activeElementId
      );
    }
  }

  onActiveComponentMetadataChange(activeComponentMetadata: IComponentMetadata): void {
    if (this.activeComponentMetadata && this.activeComponentMetadata.activeElement) {
      this.activeComponent = activeComponentMetadata.component;
      this.activeElement = activeComponentMetadata.activeElement;
    }
  }

  deleteElement(): void {
    const website = UtilService.shallowClone(this.website);
    this.activeComponent =
      website.pages[this.activeComponentMetadata.component.pageIndex].components[
        this.activeComponentMetadata.component.componentIndex
      ];
    const elements = this.activeComponent.elements;
    const elementIndex = elements.findIndex(
      (element) => element.elementId === this.activeElement.elementId
    );
    elements.splice(elementIndex, 1);
    this.builderComponentsService.website.next(website);

    this.builderElementsService.clearActiveElement(this.activeComponentMetadata);
    const activeComponentMetadata = UtilService.shallowClone(this.activeComponentMetadata);

    this.builderService.activeComponentMetadata.next(activeComponentMetadata);
    this.builderToolbarElementService.activeToolbarElement.next('toolbarDelete');
  }
}
