import { Injectable } from '@angular/core';
import { IElement } from '../../../shared/models/element';
import { IUploadFile } from '../../../shared/models/website';
import { IComponentMetadata } from '../builder-components/builder-components';
import { ISectionElement } from '../builder-components/builder-section/builder-section';
import { ActiveDragType } from '../builder';
import { BuilderElementsService } from '../builder-elements/builder-elements.service';
import { BuilderService } from '../builder.service';
import { IUnsplashResponse } from '../../../shared/models/unsplash';

@Injectable({
  providedIn: 'root',
})
export class BuilderSidebarService {
  constructor(
    private builderElementsService: BuilderElementsService,
    private builderService: BuilderService
  ) {}

  static setImageElement(elementItem: IElement | IUnsplashResponse): IUploadFile {
    if ((<IUnsplashResponse>elementItem).urls) {
      return this.setUnsplashResponseElementItem(<IUnsplashResponse>elementItem);
    }
    if ((<IElement>elementItem).src) {
      return this.setImageLibraryElementItem(<IElement>elementItem);
    }
  }

  static setUnsplashResponseElementItem(elementItem: IUnsplashResponse): IUploadFile {
    return {
      src: elementItem.urls.regular,
      alt: elementItem.alt_description,
      style: {
        width: elementItem.width.toString(),
        height: elementItem.height.toString(),
      },
    };
  }

  static setImageLibraryElementItem(elementItem: IElement): IUploadFile {
    const img = new Image();
    img.src = elementItem.src;
    img.alt = elementItem.alt;
    return {
      src: img.src,
      alt: img.alt,
      style: {
        width: img.width.toString(),
        height: img.height.toString(),
      },
    };
  }

  createImageElement(
    elementImage: IUploadFile,
    activeComponentMetadata: IComponentMetadata
  ): ISectionElement {
    const imageHeight = +(elementImage.style.height as string).match(/\d/g).join('');
    const imageWidth = +(elementImage.style.width as string).match(/\d/g).join('');
    const elementWidth = 20;
    const elementHeight = elementWidth * (imageHeight / imageWidth);
    const translateX = 40;
    const translateY = activeComponentMetadata.component.height / 2 - elementHeight / 2;
    return this.builderElementsService.createElement(
      { type: ActiveDragType.Image, [ActiveDragType.Image]: elementImage },
      elementHeight,
      elementWidth,
      translateX,
      translateY
    );
  }

  addImageElement(
    activeComponentMetadata: IComponentMetadata,
    imageElement: IElement | IUnsplashResponse
  ): ISectionElement {
    return this.createImageElement(
      BuilderSidebarService.setImageElement(imageElement),
      activeComponentMetadata
    );
  }

  onImageElementDragStart(e: DragEvent, imageElement: IUploadFile): void {
    const targetNode = e['path'][0];
    e.dataTransfer.setDragImage(targetNode, 0, 0);
    targetNode['src'] = imageElement.src;
  }

  onImageElementDrag(e: DragEvent): void {
    e.currentTarget['style'].setProperty('opacity', 0);
  }

  onImageElementDragEnd(e: DragEvent): void {
    this.builderService.activeDragData.next(null);
    e.currentTarget['style'].setProperty('opacity', 100);
  }
}
