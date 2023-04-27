import { Injectable } from '@angular/core';
import { ActiveSettings, ActiveElements, ActiveDragType } from '../builder';
import { IComponentMetadata, IDragData } from '../builder-components/builder-components';
import { BuilderService } from '../builder.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { ISectionElement } from '../builder-components/builder-section/builder-section';

@Injectable()
export class BuilderElementsService {
  constructor(private builderService: BuilderService) {}

  clearActiveElement(
    componentMetadata: IComponentMetadata = this.builderService.activeComponentMetadata.getValue()
  ): void {
    componentMetadata.activeElementId = ActiveElements.Default;
    componentMetadata.activeElementType = ActiveElements.Default;
    componentMetadata.activeElement = null;
    componentMetadata.activeElementIndex = null;
    this.builderService.activeComponentMetadata.next(UtilService.shallowClone(componentMetadata));
  }

  selectElement(
    event: Event = null,
    element: ISectionElement,
    index: number,
    componentMetadata: IComponentMetadata,
    settings: ActiveSettings = null
  ): void {
    const previewMode = this.builderService.previewMode.getValue();
    if (!previewMode) {
      componentMetadata.activeElementType = element.type;
      componentMetadata.activeElementId = element.elementId;
      componentMetadata.activeElement = element;
      componentMetadata.activeElementIndex = index;
      this.builderService.activeComponentMetadata.next(UtilService.shallowClone(componentMetadata));
      if (settings) {
        this.builderService.activeSetting.next(settings);
      }
      if (event) {
        event.stopPropagation();
      }
    }
  }

  createElement(
    elementData: IDragData,
    elementHeight = 20,
    elementWidth = 20,
    translateX = 0,
    translateY = 0,
    mobilePosition = 0,
    mobileStyle = {}
  ): ISectionElement {
    return {
      translate: {
        x: translateX,
        y: translateY,
      },
      type: elementData.type,
      layer: 0,
      mobileSettings: {
        index: mobilePosition,
        style: mobileStyle,
      },
      data: { type: elementData.type, [elementData.type]: elementData[elementData.type] },
      elementId: `${ActiveDragType.Image}-${UtilService.generateRandomString(8)}`,
      height: elementHeight,
      width: elementWidth,
    };
  }
}
