import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BuilderSidebarTextService } from '../builder-sidebar-text.service';
import { trigger } from '@angular/animations';
import { ActiveSettings } from '../../../builder';
import { ISidebarTextItem, ISidebarTextItemMetadata } from '../builder-sidebar-text';
import { fadeIn } from '../../../../../shared/models/animations';
import { IComponentMetadata } from '../../../builder-components/builder-components';
import { BuilderElementsService } from '../../../builder-elements/builder-elements.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { FontsService } from '../../../../../shared/services/fonts.service';
import { BuilderSidebarTextListService } from './builder-sidebar-text-list.service';

@Component({
  selector: 'app-builder-sidebar-text-list',
  templateUrl: './builder-sidebar-text-list.component.html',
  styleUrls: ['./builder-sidebar-text-list.component.css'],
  animations: [trigger('fadeIn', fadeIn())],
})
export class BuilderSidebarTextListComponent implements OnChanges {
  @Input() activeComponentMetadata: IComponentMetadata;
  @Input() textItemListingInnerHeight;
  @Input() textItems;
  @Input() activeSetting;
  @Input() searchText;
  @Input() isActiveSearchTermPresent;
  @Input() textItemsLoaded = true;

  randomTextItems: ISidebarTextItem[];

  constructor(
    private builderSidebarTextService: BuilderSidebarTextService,
    private builderSidebarTextListService: BuilderSidebarTextListService,
    private builderElementsService: BuilderElementsService,
    private builderComponentsService: BuilderComponentsService,
    private fontsService: FontsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        switch (prop) {
          case 'activeSetting': {
            if (change.currentValue === ActiveSettings.Text && this.textItemsLoaded) {
              this.setInitialLoader(1000);
            }
            break;
          }
        }
      }
    }
  }

  async generateRandomTextItems(count: number): Promise<void> {
    this.randomTextItems = await this.builderSidebarTextService.generateRandomTextItems(count, [
      this.searchText,
    ]);
    for (let i = 0; i < this.randomTextItems.length; i++) {
      this.textItems.push(this.randomTextItems[i]);
    }
    if (this.textItems.length > 1) {
      this.textItemsLoaded = true;
    }
  }

  async onScrollDown(): Promise<void> {
    await this.generateRandomTextItems(5);
  }

  setInitialLoader(timer: number): void {
    this.textItemsLoaded = false;
    setTimeout(() => {
      this.textItemsLoaded = true;
    }, timer);
  }

  addElement(textItemMetadata: ISidebarTextItemMetadata): void {
    if (this.activeComponentMetadata && this.activeComponentMetadata.component) {
      this.builderComponentsService.setWebsiteElementByIndices(
        this.builderSidebarTextListService.createTextElement(
          textItemMetadata,
          this.activeComponentMetadata.component.height
        ),
        this.activeComponentMetadata.component.pageIndex,
        this.activeComponentMetadata.component.componentIndex
      );
      this.fontsService.addFont(textItemMetadata.font.family);
    }
  }

  onClick(metadata: ISidebarTextItemMetadata): void {
    this.addElement(metadata);
  }
}
