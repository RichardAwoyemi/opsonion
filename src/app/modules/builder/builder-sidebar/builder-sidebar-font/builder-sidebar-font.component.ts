import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FontsService } from 'src/app/shared/services/fonts.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { IWebsite } from '../../../../shared/models/website';
import { ActiveElements, ActiveSettings } from '../../builder';
import { IComponentMetadata, IStyle } from '../../builder-components/builder-components';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderToolbarElementService } from '../../builder-toolbar/builder-toolbar-elements/builder-toolbar-element.service';

export interface IFontFunctions {
  header?: string;
  response?: string;
}

export interface IFont extends IFontFunctions {
  name?: string;
  url?: string;
}

@Component({
  selector: 'app-builder-sidebar-font',
  templateUrl: './builder-sidebar-font.component.html',
  styleUrls: ['./builder-sidebar-font.component.css'],
})
export class BuilderSidebarFontComponent implements OnChanges {
  @Input() tabName: string;
  @Input() activeComponentMetadata: IComponentMetadata;
  @Input() activeSetting: string;
  @Input() website: IWebsite;
  @Input() activePageIndex: number;
  @Input() activeFontName: string;
  @Input() activeToolbarElement: string;

  settingsName = ActiveSettings.Font;
  searchText: string;
  filteredFontNames: IFont[];
  fontNames: IFont[];
  fontName: string;
  componentMetadata: IComponentMetadata;
  style: IStyle;

  constructor(
    private fontsService: FontsService,
    private builderComponentsService: BuilderComponentsService,
    private builderToolbarElementService: BuilderToolbarElementService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        if (prop === 'activeComponentMetadata') {
          if (
            change.currentValue &&
            change.currentValue.activeElementId &&
            change.currentValue.activeElementId !== ActiveElements.Default
          ) {
            if (
              !this.componentMetadata ||
              this.componentMetadata.activeElementId !== change.currentValue.activeElementId
            ) {
              this.fontName = null;
              this.componentMetadata = change.currentValue;
              if (this.website) {
                this.setInitialFont();
              }
            }
          } else if (
            !change.currentValue ||
            (change.currentValue &&
              (!change.currentValue.activeElementId ||
                change.currentValue.activeElementId === ActiveElements.Default))
          ) {
            this.clearSettings();
          }
        }
        if (prop === 'website') {
          if (change.currentValue) {
            this.setInitialFont(change.currentValue);
          }
        }
      }
    }
  }

  setInitialFont(website = this.website): void {
    if (website && this.componentMetadata) {
      this.website = website;
      const elementMetadata = this.componentMetadata.component.elements.find(
        (element) => element.elementId === this.componentMetadata.activeElementId
      );
      if (elementMetadata) {
        this.style = elementMetadata.data[elementMetadata.type]['style'];
        if (this.style && !this.fontName) {
          this.fontName = this.style['font-family'] || 'Nunito';
          this.fontNames = this.setFontList();
          this.filteredFontNames = null;
          this.searchText = null;
          this.activeFontName = UtilService.shallowClone(this.fontName);
        }
      }
    }
  }

  getFontUrl(font: string): string {
    return font ? FontsService.getFontUrl(font.split(' ').join('-').toLowerCase()) : '';
  }

  setFontList(): IFont[] {
    const fontNames = [];
    const currentFont = [this.getFont(this.fontName)];
    const activeFonts = UtilService.findAllByKey(this.website, 'font-family').map((font) =>
      this.getFont(font)
    );
    const availableFonts = this.fontsService.availableFonts
      .getValue()
      .map((font) => this.getFont(font));
    return currentFont.concat(
      this.getUniqueValues(
        Array.from(fontNames.concat(this.setHeader('Recently Used'), activeFonts))
      )
        .filter((font) => font.name !== this.fontName)
        .concat(this.setHeader('Popular Fonts'), availableFonts)
    );
  }

  setHeader(headerText: string): IFont[] {
    return [{ header: headerText }];
  }

  getUniqueValues(fonts: IFont[]): IFont[] {
    return fonts.filter(
      (thing, index, self) => index === self.findIndex((t) => t.name === thing.name)
    );
  }

  getFont(fontName: string): IFont {
    const selectedFontName = fontName.split(' ').join('-').toLowerCase();
    return { name: fontName, url: FontsService.getFontUrl(selectedFontName) };
  }

  onFontNameChange(event: Event, fontName: string): void {
    this.fontsService.addFont(fontName);
    this.builderToolbarElementService.activeToolbarElement.next('fontName');
    this.fontName = fontName;
    this.builderToolbarElementService.activeFontName.next(this.fontName);
    const website = UtilService.shallowClone(this.website);
    const activeComponent =
      website.pages[this.activePageIndex].components[
        this.componentMetadata.component.componentIndex
      ];
    const activeElement = activeComponent.elements.find(
      (element) => element.elementId === this.activeComponentMetadata.activeElementId
    );
    activeElement.data[activeElement.type].style['font-family'] = fontName;
    this.builderComponentsService.website.next(UtilService.shallowClone(website));
    event.stopPropagation();
  }

  search(): void {
    if (!UtilService.isNullOrWhitespace(this.searchText)) {
      const cleanSearchText = this.searchText.trim().toLowerCase();
      const searchResults = this.fontNames.filter(
        (font) => font.name && font.name.toLowerCase().includes(cleanSearchText)
      );
      if (searchResults.length) {
        this.filteredFontNames = this.setHeader('Recently Used').concat(searchResults);
      } else {
        this.filteredFontNames = [
          {
            response: `We couldn't find any results for "${this.searchText}". Try searching for something else.`,
          },
        ];
      }
    } else {
      this.filteredFontNames = null;
    }
  }

  setActiveClass(fontName: string): string {
    return (
      'container-padding-horizontal option-container' +
      (this.fontName === fontName ? ' active-menu-option' : '')
    );
  }

  clearSettings(): void {
    this.fontName = null;
    this.style = null;
    this.componentMetadata = null;
    this.filteredFontNames = null;
    this.searchText = '';
  }
}
