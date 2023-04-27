import { Injectable } from '@angular/core';
import { BuilderService } from '../../../builder.service';
import { BuilderSidebarService } from '../../builder-sidebar.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { IUploadFile } from '../../../../../shared/models/website';
import { ActiveDragType } from '../../../builder';
import { IElement } from '../../../../../shared/models/element';
import { IComponentMetadata } from '../../../builder-components/builder-components';
import { BuilderSidebarElementsService } from '../builder-sidebar-elements.service';

@Injectable()
export class BuilderSidebarElementsListFacade {
  constructor(
    private builderService: BuilderService,
    private builderSidebarService: BuilderSidebarService,
    private builderComponentsService: BuilderComponentsService,
    private builderSidebarElementsService: BuilderSidebarElementsService
  ) {}

  onDrag(dragEvent: DragEvent, elementItem: IElement): void {
    if ((elementItem.type as ActiveDragType) === ActiveDragType.Image) {
      this.builderSidebarService.onImageElementDrag(dragEvent);
    }
  }

  onDragEnd(dragEvent: DragEvent, elementItem: IElement): void {
    if ((elementItem.type as ActiveDragType) === ActiveDragType.Image) {
      this.builderSidebarService.onImageElementDragEnd(dragEvent);
    }
  }

  onDragStart(dragEvent: DragEvent, elementItem: IElement): void {
    if ((elementItem.type as ActiveDragType) === ActiveDragType.Image) {
      this.onImageElementDragStart(dragEvent, elementItem);
    }
  }

  onImageElementDragStart(dragEvent: DragEvent, elementItem: IElement): void {
    const image: IUploadFile = BuilderSidebarService.setImageElement(elementItem);
    this.builderService.activeDragData.next({
      type: ActiveDragType.Image,
      [ActiveDragType.Image]: image,
    });
    this.builderSidebarService.onImageElementDragStart(dragEvent, image);
  }

  addElement(elementItem: IElement, activeComponentMetadata: IComponentMetadata): void {
    if (activeComponentMetadata && activeComponentMetadata.component) {
      switch (elementItem.type as ActiveDragType) {
        case ActiveDragType.Image:
          this.builderComponentsService.setWebsiteElementByIndices(
            this.builderSidebarService.addImageElement(activeComponentMetadata, elementItem),
            activeComponentMetadata.component.pageIndex,
            activeComponentMetadata.component.componentIndex
          );
          break;
        case ActiveDragType.Button:
          this.builderComponentsService.setWebsiteElementByIndices(
            this.builderSidebarElementsService.addButtonElement(
              activeComponentMetadata,
              elementItem
            ),
            activeComponentMetadata.component.pageIndex,
            activeComponentMetadata.component.componentIndex
          );
          break;
      }
    }
  }
}
