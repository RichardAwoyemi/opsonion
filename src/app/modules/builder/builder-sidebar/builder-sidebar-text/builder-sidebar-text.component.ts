import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ActiveSettings } from '../../builder';
import { UtilService } from '../../../../shared/services/util.service';
import { BuilderSidebarTextService } from './builder-sidebar-text.service';
import { IComponentMetadata } from '../../builder-components/builder-components';
import { ISidebarSearchInputMessage } from '../builder-sidebar-search-input/builder-sidebar-search-input';
@Component({
  selector: 'app-builder-sidebar-text',
  templateUrl: './builder-sidebar-text.component.html',
})
export class BuilderSidebarTextComponent implements OnChanges {
  @Input() tabClass;
  @Input() activeSetting;
  @Input() innerHeight;
  @Input() textItems;
  @Input() activeComponentMetadata: IComponentMetadata;
  @Output() onSearchTextChange = new EventEmitter();

  TEXT_ITEM_LISTING_INNER_HEIGHT_OFFSET = 132;
  TAB_NAME = ActiveSettings.Text;
  textItemListingInnerHeight: number;
  searchText: string;
  isActiveSearchTermPresent = false;
  textItemsLoaded = true;
  previousTextItems = [];

  constructor(private builderSidebarTextService: BuilderSidebarTextService) {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        switch (prop) {
          case 'innerHeight': {
            this.textItemListingInnerHeight =
              change.currentValue - this.TEXT_ITEM_LISTING_INNER_HEIGHT_OFFSET;
            break;
          }
        }
      }
    }
  }

  trim(): void {
    if (!UtilService.isNullOrWhitespace(this.searchText)) {
      this.searchText.trim();
    } else {
      this.textItems = this.previousTextItems;
      this.isActiveSearchTermPresent = false;
    }
  }

  async onEnterKeyPressed(event: KeyboardEvent): Promise<void> {
    if (event.key === 'Enter') {
      if (!UtilService.isNullOrWhitespace(this.searchText)) {
        this.textItemsLoaded = false;
        this.isActiveSearchTermPresent = true;
        this.textItems = this.previousTextItems;
        this.textItems = await this.builderSidebarTextService.generateRandomTextItems(20, [
          this.searchText,
        ]);
        this.textItemsLoaded = true;
      } else {
        this.textItems = this.previousTextItems;
        this.isActiveSearchTermPresent = false;
      }
    }
  }

  setSearchText(searchInputMessage: ISidebarSearchInputMessage): void {
    if (searchInputMessage.recipient === ActiveSettings.Text) {
      if (!UtilService.isNullOrWhitespace(searchInputMessage.message)) {
        this.searchText = (<ISidebarSearchInputMessage>searchInputMessage).message.toLowerCase();
      } else {
        this.textItems = this.previousTextItems;
        this.isActiveSearchTermPresent = false;
      }
    }
  }
}
