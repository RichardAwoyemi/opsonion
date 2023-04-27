import { Injectable } from '@angular/core';
import { IElement } from '../../../../../shared/models/element';

@Injectable()
export class BuilderSidebarElementsGroupsFacade {
  getElementGroupItems(
    elementImageLibrary: IElement[],
    elementButtonLibrary: IElement[],
    elementLibraryCategory: string
  ): IElement[] {
    const elementLibrary = [...elementImageLibrary, ...elementButtonLibrary];
    return elementLibrary.filter((item) => item.group.indexOf(elementLibraryCategory) !== -1);
  }

  getElementGroupItemsCount(
    elementImageLibrary: IElement[],
    elementButtonLibrary: IElement[],
    elementLibraryCategory: string
  ): number {
    const elementLibrary = [...elementImageLibrary, ...elementButtonLibrary];
    return elementLibrary.filter((item) => item.group.indexOf(elementLibraryCategory) !== -1)
      .length;
  }
}
