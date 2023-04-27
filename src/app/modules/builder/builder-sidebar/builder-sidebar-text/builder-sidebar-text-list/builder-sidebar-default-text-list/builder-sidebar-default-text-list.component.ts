import { Component, Input, OnInit } from '@angular/core';
import {
  ISidebarDefaultTextItemMetadata,
  ISidebarTextItemMetadata,
} from '../../builder-sidebar-text';
import { BuilderSidebarTextListService } from '../builder-sidebar-text-list.service';
import { IComponentMetadata } from '../../../../builder-components/builder-components';
import { BuilderComponentsService } from '../../../../builder-components/builder-components.service';
import { FontsService } from '../../../../../../shared/services/fonts.service';

@Component({
  selector: 'app-builder-sidebar-default-text-list',
  templateUrl: './builder-sidebar-default-text-list.component.html',
  styleUrls: ['../builder-sidebar-text-list.component.css'],
})
export class BuilderSidebarDefaultTextListComponent implements OnInit {
  @Input() activeComponentMetadata: IComponentMetadata;

  textItemMetadataList: ISidebarDefaultTextItemMetadata[];

  constructor(
    private builderSidebarTextListService: BuilderSidebarTextListService,
    private builderComponentsService: BuilderComponentsService,
    private fontsService: FontsService
  ) {}

  ngOnInit(): void {
    this.textItemMetadataList = this.builderSidebarTextListService.textItemMetadataList;
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
}
