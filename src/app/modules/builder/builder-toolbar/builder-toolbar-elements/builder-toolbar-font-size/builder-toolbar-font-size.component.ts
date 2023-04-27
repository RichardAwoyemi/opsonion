import { Component, Input } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { IframeService } from 'src/app/shared/services/iframe.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { IWebsite } from '../../../../../shared/models/website';
import { IComponentMetadata, IStyle } from '../../../builder-components/builder-components';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { ISectionElement } from '../../../builder-components/builder-section/builder-section';
import { IElementSettings } from '../../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';
import { BuilderToolbarElementService } from '../builder-toolbar-element.service';

@Component({
  selector: 'app-builder-toolbar-font-size',
  templateUrl: './builder-toolbar-font-size.component.html',
  styleUrls: ['../../builder-toolbar.component.css', './builder-toolbar-font-size.component.css'],
})
export class BuilderToolbarFontSizeComponent {
  @Input() settings: IElementSettings;
  get activeComponentMetadata(): IComponentMetadata {
    return this._activeComponentMetadata;
  }

  @Input() set activeComponentMetadata(newVal: IComponentMetadata) {
    if (this._activeComponentMetadata === newVal) {
      return;
    }
    this._activeComponentMetadata = newVal;
    this.onActiveComponentMetaDataChange(this._activeComponentMetadata);
  }

  get website(): IWebsite {
    return this._website;
  }

  @Input() set website(newVal: IWebsite) {
    if (this._website === newVal) {
      return;
    }
    this._website = newVal;
    this.setFontSize(this._website);
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

  faCaretDown = faCaretDown;
  document = IframeService.getIframeElement('builder-showcase');
  ngUnsubscribe = new Subject<void>();
  componentMetadata: IComponentMetadata;
  elementMetadata: ISectionElement;
  menuOptions = [
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    21,
    24,
    32,
    36,
    42,
    48,
    56,
    64,
    72,
    80,
    88,
    96,
    104,
    120,
    144,
  ];
  fontSize: number;
  conversionFactor = 16;
  websiteChangeCount: number;
  showDropdown = false;
  activeComponentId: string;
  style: IStyle;

  private _activeComponentMetadata: IComponentMetadata;
  private _website: IWebsite;
  private _activeToolbarElement: string;

  constructor(
    private builderToolbarElementService: BuilderToolbarElementService,
    private builderComponentsService: BuilderComponentsService
  ) {}

  onActiveToolbarElementChange(activeToolbarElement: string): void {
    if (activeToolbarElement !== 'fontSize') {
      this.showDropdown = false;
    }
  }

  onActiveComponentMetaDataChange(activeComponentMetadata: IComponentMetadata): void {
    this.activeComponentId = activeComponentMetadata.component.componentId || null;
    if (
      (activeComponentMetadata && !this.componentMetadata) ||
      (activeComponentMetadata &&
        this.componentMetadata &&
        (this.componentMetadata.activeElementId !== activeComponentMetadata.activeElementId ||
          this.componentMetadata.component.componentId !==
            activeComponentMetadata.component.componentId))
    ) {
      this.componentMetadata = UtilService.shallowClone(activeComponentMetadata);
      this.fontSize = null;
      this.showDropdown = false;
      this.elementMetadata = this.builderToolbarElementService.getElement(activeComponentMetadata);
      this.setFontSize();
    } else if (!activeComponentMetadata) {
      this.fontSize = null;
      this.showDropdown = false;
    }
  }

  setFontSize(website: IWebsite = this.website): void {
    if (website && this.componentMetadata) {
      this.elementMetadata = this.builderToolbarElementService.getElement(
        this.activeComponentMetadata
      );
      this.style = this.builderToolbarElementService.getElementStyle(this.elementMetadata);
      if (this.style && this.style['font-size'] && !this.fontSize) {
        this.fontSize = +this.style['font-size'].replace('vw', '') * this.conversionFactor;
      }
    }
  }

  setDropdownOption(option: number): void {
    const newValue = Math.min(option >= 100 ? Math.floor(option) : +option.toFixed(1), 300);
    this.fontSize = newValue;
    this.style['font-size'] = this.fontSize / this.conversionFactor + 'vw';
    this.builderComponentsService.setElementStyle(this.activeComponentMetadata, this.style);
    this.showDropdown = false;
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.builderToolbarElementService.activeToolbarElement.next('fontSize');
    }
  }

  setActiveClass(option: number): string {
    return option === this.fontSize ? 'dropdown-item active-menu-option' : 'dropdown-item';
  }

  setButtonClass(): string {
    return this.showDropdown ? 'active-font-size-button' : 'inactive-font-size-button';
  }
}
