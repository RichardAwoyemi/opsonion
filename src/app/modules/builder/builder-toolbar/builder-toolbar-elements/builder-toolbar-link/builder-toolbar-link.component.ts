import { Component, Input } from '@angular/core';
import { IWebsite } from 'src/app/shared/models/website';
import { UtilService } from '../../../../../shared/services/util.service';
import { ActiveLinkTypes } from '../../../builder';
import { IComponentMetadata } from '../../../builder-components/builder-components';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import {
  ILink,
  ISectionElement
} from '../../../builder-components/builder-section/builder-section';
import { IElementSettings } from '../../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';
import { BuilderToolbarElementService } from '../builder-toolbar-element.service';

@Component({
  selector: 'app-builder-toolbar-link',
  templateUrl: './builder-toolbar-link.component.html',
  styleUrls: ['../../builder-toolbar.component.css', './builder-toolbar-link.component.css'],
})
export class BuilderToolbarLinkComponent {
  @Input() settings: IElementSettings;

  get activeComponentMetadata(): IComponentMetadata {
    return this._activeComponentMetadata;
  }

  @Input() set activeComponentMetadata(newVal: IComponentMetadata) {
    if (this._activeComponentMetadata === newVal) {
      return;
    }
    this._activeComponentMetadata = newVal;
  }

  get activeToolbarElement(): string {
    return this._activeToolbarElement;
  }

  @Input() set activeToolbarElement(newVal: string) {
    if (this._activeToolbarElement === newVal) {
      return;
    }
    this._activeToolbarElement = newVal;
    if (this._activeToolbarElement !== 'toolbarLink') {
      this.hideMenu();
    }
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

  activeTab = { name: 'Url', icon: 'assets/img/toolbar-link-icon.svg' };
  showMenu: boolean;
  pages: string[];
  activeElement: ISectionElement;
  BUTTON_CLASS = 'toolbar-button';
  ACTIVE_BUTTON_CLASS = 'toolbar-button toolbar-button-active';
  tabSettings = [
    { name: 'Url', icon: 'assets/img/toolbar-link-icon.svg' },
    { name: 'Page', icon: 'assets/img/toolbar-page-icon.svg' },
    { name: 'Page Section', icon: 'assets/img/toolbar-page-text-icon.svg' },
    { name: 'Email', icon: 'assets/img/toolbar-mail-icon.svg' },
    { name: 'Phone', icon: 'assets/img/toolbar-phone-icon.svg' },
  ];
  linkSettings: ILink;
  private _website: IWebsite;
  private _activeToolbarElement: string;
  private _activeComponentMetadata: IComponentMetadata;

  constructor(
    private builderToolbarElementService: BuilderToolbarElementService,
    private builderComponentsService: BuilderComponentsService
  ) {}

  onWebsiteChange(website: IWebsite): void {
    this.pages = website.pages.map((page) => page.name);
    this.setLinkSettings();
  }

  setLinkSettings(website = this.website, data = this.activeComponentMetadata): void {
    const pageIndex = data.component.pageIndex;
    const componentIndex = data.component.componentIndex;
    const elementIndex = data.activeElementIndex;
    this.activeElement = website.pages[pageIndex].components[componentIndex].elements[elementIndex];
    this.linkSettings = this.activeElement.link || {
      type: ActiveLinkTypes.Placeholder,
      url: '',
      newTab: false,
    };
  }

  selectDropdownOption(): void {
    // TO DO
  }

  selectTab(setting: { name: string; icon: string }): void {
    this.activeTab = setting;
    this.resetLinkSettings();
  }

  resetLinkSettings(): void {
    this.activeElement.link = null;
    // TO PERSIST
  }

  setUrl(url: string): void {
    this.linkSettings = {
      type: ActiveLinkTypes.Url,
      url: url,
      newTab: this.openNewPage(),
    };
    this.persistNewLinkSettings();
  }

  toggleNewPage(): void {
    this.linkSettings.newTab = this.openNewPage();
    this.persistNewLinkSettings();
  }

  persistNewLinkSettings(): void {
    const website = UtilService.shallowClone(this.website);
    const pageIndex = this.activeComponentMetadata.component.pageIndex;
    const componentIndex = this.activeComponentMetadata.component.componentIndex;
    const elementIndex = this.activeComponentMetadata.activeElementIndex;
    website.pages[pageIndex].components[componentIndex].elements[
      elementIndex
    ].link = this.linkSettings;
    this.builderComponentsService.website.next(website);
  }

  openNewPage(): boolean {
    return document.querySelector('#toolbar-link-new-page-checkbox:checked') !== null;
  }

  toggleLinkMenu(): void {
    if (this.BUTTON_CLASS === 'toolbar-button') {
      this.builderToolbarElementService.activeToolbarElement.next('toolbarLink');
      this.revealMenu();
    } else {
      this.builderToolbarElementService.activeToolbarElement.next(null);
      this.hideMenu();
    }
  }

  private revealMenu(): void {
    this.showMenu = true;
    this.BUTTON_CLASS = 'toolbar-button toolbar-button-active';
  }

  private hideMenu(): void {
    this.showMenu = false;
    this.BUTTON_CLASS = 'toolbar-button';
  }
}
