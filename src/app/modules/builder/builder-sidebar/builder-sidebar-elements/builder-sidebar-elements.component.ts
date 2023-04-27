import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActiveSettings } from '../../builder';
import { IElement } from '../../../../shared/models/element';
import { ISidebarSearchInputMessage } from '../builder-sidebar-search-input/builder-sidebar-search-input';
import { IComponentMetadata } from '../../builder-components/builder-components';
import { BuilderSidebarElementsFacade } from './builder-sidebar-elements.facade';

@Component({
  selector: 'app-builder-sidebar-elements',
  templateUrl: './builder-sidebar-elements.component.html',
  styleUrls: ['./builder-sidebar-elements.component.css'],
})
export class BuilderSidebarElementsComponent implements OnChanges {
  @Input() tabClass;
  @Input() activeSetting;
  @Input() innerHeight;
  @Input() elementImageLibrary: IElement[];
  @Input() elementButtonLibrary: IElement[];
  @Input() activeComponentMetadata: IComponentMetadata;

  TAB_NAME = ActiveSettings.Elements;
  ELEMENTS_LISTING_INNER_HEIGHT_OFFSET = 125;

  searchText: string;
  elementsSearchResult: IElement[];
  elementListingInnerHeight: number;

  constructor(private builderSidebarElementsFacade: BuilderSidebarElementsFacade) {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        switch (prop) {
          case 'innerHeight': {
            this.elementListingInnerHeight =
              change.currentValue - this.ELEMENTS_LISTING_INNER_HEIGHT_OFFSET;
            break;
          }
          case 'activeSetting': {
            if (change.currentValue === ActiveSettings.Elements) {
              this.searchText = '';
            }
            break;
          }
        }
      }
    }
  }

  onSearchTextChange(searchInputMessage: ISidebarSearchInputMessage): void {
    this.setSidebarSearchInputText(searchInputMessage);
    this.getElementsSearchResults();
  }

  setSidebarSearchInputText(searchInputMessage: ISidebarSearchInputMessage): void {
    this.searchText = this.builderSidebarElementsFacade.setSidebarSearchInputText(
      searchInputMessage,
      this.activeSetting
    );
  }

  getElementsSearchResults(): void {
    this.elementsSearchResult = this.builderSidebarElementsFacade.getElementsSearchResult(
      this.elementImageLibrary,
      this.elementButtonLibrary,
      this.searchText
    );
  }
}
