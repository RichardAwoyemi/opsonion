import { Injectable } from '@angular/core';
import { IElement } from '../../../../shared/models/element';
import { IButton, IComponentMetadata } from '../../builder-components/builder-components';
import { ActiveDragType } from '../../builder';
import { BuilderElementsService } from '../../builder-elements/builder-elements.service';
import { ISectionElement } from '../../builder-components/builder-section/builder-section';
import { UtilService } from '../../../../shared/services/util.service';

@Injectable({
  providedIn: 'root',
})
export class BuilderSidebarElementsService {
  constructor(private builderElementsService: BuilderElementsService) {}

  static getElementsSearchResults(
    elementImageLibrary: IElement[],
    elementButtonLibrary: IElement[],
    searchText: string
  ): IElement[] {
    const elementLibrary = [...elementImageLibrary, ...elementButtonLibrary];
    return elementLibrary.filter((obj) =>
      Object.keys(obj).some(
        (key) =>
          typeof obj[key] === 'string' &&
          obj[key].toLowerCase().trim().includes(searchText.toLowerCase().trim())
      )
    );
  }

  addButtonElement(
    activeComponentMetadata: IComponentMetadata,
    buttonElement: IElement
  ): ISectionElement {
    return this.createButtonElement(this.setButtonElement(buttonElement), activeComponentMetadata);
  }

  createButtonElement(
    elementButton: IButton,
    activeComponentMetadata: IComponentMetadata
  ): ISectionElement {
    const elementHeight = 5;
    const elementWidth = 15;
    const translateX = 40;
    const translateY = activeComponentMetadata.component.height / 2 - elementHeight / 2;
    return this.builderElementsService.createElement(
      { type: ActiveDragType.Button, [ActiveDragType.Button]: elementButton },
      elementHeight,
      elementWidth,
      translateX,
      translateY
    );
  }

  setButtonElement(elementItem: IElement): IButton {
    return {
      innerHtml: UtilService.generateRandomWord(),
      style: elementItem.style,
    };
  }
}
