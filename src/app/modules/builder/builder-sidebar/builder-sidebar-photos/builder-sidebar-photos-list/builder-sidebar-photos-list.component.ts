import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUnsplashResponse } from '../../../../../shared/models/unsplash';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderElementsService } from '../../../builder-elements/builder-elements.service';
import { BuilderSidebarService } from '../../builder-sidebar.service';
import { IUploadFile } from '../../../../../shared/models/website';
import { ActiveDragType } from '../../../builder';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-builder-sidebar-photos-list',
  templateUrl: './builder-sidebar-photos-list.component.html',
  styleUrls: ['../builder-sidebar-photos.component.css'],
})
export class BuilderSidebarPhotosListComponent {
  @Input() photos: IUnsplashResponse[];
  @Input() activeComponentMetadata;
  @Input() photosLoaded;
  @Input() photosListingInnerHeight;
  @Output() onScrollDown = new EventEmitter();

  constructor(
    private builderComponentsService: BuilderComponentsService,
    private builderElementsService: BuilderElementsService,
    private builderService: BuilderService,
    private builderSidebarService: BuilderSidebarService
  ) {}

  trackByIdx(i: number): number {
    return i;
  }

  onDrag(e: DragEvent): void {
    this.builderSidebarService.onImageElementDrag(e);
  }

  onDragStart(e: DragEvent, elementItem: IUnsplashResponse): void {
    const image: IUploadFile = BuilderSidebarService.setImageElement(elementItem);
    this.builderService.activeDragData.next({
      type: ActiveDragType.Image,
      [ActiveDragType.Image]: image,
    });
    this.builderSidebarService.onImageElementDragStart(e, image);
  }

  onDragEnd(e: DragEvent): void {
    this.builderSidebarService.onImageElementDragEnd(e);
  }

  addElement(elementItem: IUnsplashResponse): void {
    if (this.activeComponentMetadata && this.activeComponentMetadata.component) {
      this.builderComponentsService.setWebsiteElementByIndices(
        this.builderSidebarService.addImageElement(this.activeComponentMetadata, elementItem),
        this.activeComponentMetadata.component.pageIndex,
        this.activeComponentMetadata.component.componentIndex
      );
    }
  }

  emitScrollDownEvent(): void {
    this.onScrollDown.emit();
  }
}
