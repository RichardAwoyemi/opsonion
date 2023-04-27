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
  selector: 'app-builder-toolbar-copy',
  templateUrl: './builder-toolbar-copy.component.html',
  styleUrls: ['../../builder-toolbar.component.css', './builder-toolbar-copy.component.css'],
})
export class BuilderToolbarCopyComponent {
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
      x: { text: 'Left', active: false, source: 'assets/img/copy-left.svg' },
      y: { text: 'Top', active: false, source: 'assets/img/copy-top.svg' },
    },
    {
      x: { text: 'Centre', active: false, source: 'assets/img/copy-centre.svg' },
      y: { text: 'Middle', active: false, source: 'assets/img/copy-middle.svg' },
    },
    {
      x: { text: 'Right', active: false, source: 'assets/img/copy-right.svg' },
      y: { text: 'Bottom', active: false, source: 'assets/img/copy-bottom.svg' },
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
    if (activeToolbarElement !== 'toolbarCopy') {
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

  copyElement(): void {
    const newElement = UtilService.shallowClone(this.activeElement);
    newElement.translate.x += 1;
    newElement.translate.y += 1;
    newElement.elementId = `${newElement.type}-${UtilService.generateRandomString(8)}`;
    const website = UtilService.shallowClone(this.website);
    this.activeComponent =
      website.pages[this.activeComponentMetadata.component.pageIndex].components[
        this.activeComponentMetadata.component.componentIndex
      ];
    const elements = this.activeComponent.elements;
    elements.push(newElement);
    for (let i = 0; i < elements.length; i++) {
      elements[i].layer = i;
    }
    this.builderComponentsService.website.next(website);
    this.builderToolbarElementService.activeToolbarElement.next('toolbarCopy');
  }
}
