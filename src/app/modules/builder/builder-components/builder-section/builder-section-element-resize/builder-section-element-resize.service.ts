import { Injectable } from '@angular/core';
import { ISectionElement } from '../builder-section';
import { UtilService } from 'src/app/shared/services/util.service';
import { IHandleSettings } from './builder-section-element-resize';

@Injectable()
export class BuilderResizeElementService {
  constructor() {}

  resizeElement(
    e: MouseEvent,
    activeElement: ISectionElement,
    initialElement: ISectionElement,
    initialResizeHandleCords: { x: number; y: number },
    initialResizeItemCords: DOMRect,
    handleSettings: IHandleSettings[],
    showcaseDimension: number
  ): ISectionElement {
    const element = UtilService.shallowClone(activeElement);
    const settings = handleSettings;
    settings.forEach((setting) => {
      const delta =
        (e[setting.eventProperty] - initialResizeHandleCords[setting.axis]) *
        setting.deltaMultiplier;
      element[setting.dimension] =
        (100 * (initialResizeItemCords[setting.dimension] + delta)) / showcaseDimension;
      if (setting.translate) {
        element.translate[setting.axis] =
          initialElement.translate[setting.axis] - (100 * delta) / showcaseDimension;
      }
    });
    return element;
  }
}
