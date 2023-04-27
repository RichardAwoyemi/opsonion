import { Injectable } from '@angular/core';
import { IComponent } from '../builder-components';
import { IFilteredElementCord, IMinCord, ISectionElement } from './builder-section';
import { IHandleSettings } from './builder-section-element-resize/builder-section-element-resize';

@Injectable()
export class BuilderAlignmentService {
  private minX: IMinCord;
  private minY: IMinCord;
  private xSettings = ['x', 'vw', 'width', 'left'];
  private ySettings = ['y', 'vw', 'height', 'top'];
  private lockInSize = 0.2;

  constructor() {}

  setAlignment(
    component: IComponent,
    activeElement: ISectionElement,
    previousElement: ISectionElement,
    filteredElementCords: IFilteredElementCord[],
    activeHandleSettings: { x: IHandleSettings; y: IHandleSettings },
    storedMinCords: { x?: IMinCord[]; y?: IMinCord[] },
    activeElementCordKeys: number[],
    isResize: boolean
  ): void {
    const deltaX =
      activeElement.translate.x - previousElement.translate.x ||
      activeElement.width - previousElement.width;
    const deltaY =
      activeElement.translate.y - previousElement.translate.y ||
      activeElement.height - previousElement.height;
    if (deltaX !== 0 || deltaY !== 0) {
      let activeElementCords = this.getElementCords(activeElement);
      storedMinCords.x = deltaX !== 0 ? [] : storedMinCords.x;
      storedMinCords.y = deltaY !== 0 ? [] : storedMinCords.y;
      for (let j = 0; j < activeElementCordKeys.length; j++) {
        this.minX = { val: 999, valAbs: 999, i: -1, altAxisDiff: 999, activeCordIndex: -1 };
        this.minY = { val: 999, valAbs: 999, i: -1, altAxisDiff: 999, activeCordIndex: -1 };
        const index = activeElementCordKeys[j];
        const activeElementCord = activeElementCords[index];
        const minCords = this.setClosestAliignment(
          index,
          activeElementCord,
          deltaX,
          deltaY,
          this.minX,
          this.minY,
          filteredElementCords
        );
        this.stashMinimumCords(minCords, storedMinCords);
      }
      this.filterStashedCords('x', isResize, storedMinCords);
      this.filterStashedCords('y', isResize, storedMinCords);
      if (isResize) {
        this.resizeToAlignment(this.xSettings, storedMinCords, activeElement, activeHandleSettings);
        this.resizeToAlignment(this.ySettings, storedMinCords, activeElement, activeHandleSettings);
      } else {
        this.moveToAlignment(this.xSettings, storedMinCords, filteredElementCords, activeElement);
        this.moveToAlignment(this.ySettings, storedMinCords, filteredElementCords, activeElement);
      }
      activeElementCords = this.getElementCords(activeElement);
      this.setActiveAlignmentStyles(
        this.xSettings,
        this.ySettings,
        activeElementCords,
        storedMinCords,
        component,
        filteredElementCords
      );
      this.setActiveAlignmentStyles(
        this.ySettings,
        this.xSettings,
        activeElementCords,
        storedMinCords,
        component,
        filteredElementCords
      );
    }
  }

  getElementCords(element: ISectionElement): { x: number; y: number }[] {
    return [
      { x: element.translate.x, y: element.translate.y },
      {
        x: element.translate.x + element.width / 2,
        y: element.translate.y + element.height / 2,
      },
      {
        x: element.translate.x + element.width,
        y: element.translate.y + element.height,
      },
    ];
  }

  compareAlignments(
    diff: number,
    absDiff: number,
    minDiff: IMinCord,
    i: number,
    altAxisDiff: number,
    activeCordIndex: number
  ): IMinCord {
    if (minDiff.i === -1) {
      return {
        val: diff,
        valAbs: absDiff,
        i: i,
        altAxisDiff: altAxisDiff,
        activeCordIndex: activeCordIndex,
      };
    } else {
      return minDiff.valAbs <= absDiff
        ? minDiff
        : {
            val: diff,
            valAbs: absDiff,
            i: i,
            altAxisDiff: altAxisDiff,
            activeCordIndex: activeCordIndex,
          };
    }
  }

  setInitialElementCords(component: IComponent, activeElementId: string): IFilteredElementCord[] {
    const filteredElementCords: IFilteredElementCord[] = [
      {
        id: component.componentId,
        x: 50,
        y: component.height + 0.25,
        styles: [
          {
            height: component.height + 'vw',
            width: '0',
            top: '0',
            left: null,
            display: 'none',
            border: '1px solid #E95EFF',
          },
          {
            height: component.height + 'vw',
            width: '0',
            top: '0',
            left: null,
            display: 'none',
            border: '1px solid #E95EFF',
          },
          {
            height: component.height + 'vw',
            width: '0',
            top: '0',
            left: null,
            display: 'none',
            border: '1px solid #E95EFF',
          },
        ],
      },
      {
        id: component.componentId,
        x: 100,
        y: component.height / 2,
        styles: [
          {
            height: '0',
            width: '100vw',
            top: null,
            left: '0',
            display: 'none',
            border: '1px solid #E95EFF',
          },
          {
            height: '0',
            width: '100vw',
            top: null,
            left: '0',
            display: 'none',
            border: '1px solid #E95EFF',
          },
          {
            height: '0',
            width: '100vw',
            top: null,
            left: '0',
            display: 'none',
            border: '1px solid #E95EFF',
          },
        ],
      },
    ];
    const elements = component.elements;
    let index = 2;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].elementId !== activeElementId) {
        const selectedElement = elements[i];
        this.getElementCords(selectedElement).forEach((cord) => {
          filteredElementCords[index] = {
            id: selectedElement.elementId,
            x: cord.x,
            y: cord.y,
            styles: [
              { height: null, width: null, top: null, left: null, display: 'none' },
              { height: null, width: null, top: null, left: null, display: 'none' },
              { height: null, width: null, top: null, left: null, display: 'none' },
            ],
          };
          index++;
        });
      }
    }
    return filteredElementCords;
  }

  stashMinimumCords(
    minCords: IMinCord[],
    storedMinCords: { x?: IMinCord[]; y?: IMinCord[] }
  ): void {
    const minX = minCords[0];
    const minY = minCords[1];
    if (minX.i === -1 && minY.i === -1) {
      return;
    }
    if (minX.i !== -1 && minY.i !== -1) {
      storedMinCords.x.push(minX);
      storedMinCords.y.push(minY);
      return;
    }
    if (minX.i !== -1) {
      storedMinCords.x.push(minX);
      return;
    }
    if (minY.i !== -1) {
      storedMinCords.y.push(minY);
      return;
    }
  }

  setActiveAlignmentStyles(
    settings: string[],
    altSettings: string[],
    activeElementCords: { x: number; y: number }[],
    storedMinCords: { x?: IMinCord[]; y?: IMinCord[] },
    component: IComponent,
    filteredElementCords: IFilteredElementCord[]
  ): void {
    const size = storedMinCords[settings[0]].length;
    if (size) {
      for (let i = 0; i < size; i++) {
        const minCord = storedMinCords[settings[0]][i] as IMinCord;
        if (minCord.i !== -1) {
          const activeElementCord = activeElementCords[minCord.activeCordIndex];
          const cord = filteredElementCords[minCord.i];
          const style = cord.styles[minCord.activeCordIndex];
          let preserveAltDim = false;
          for (let j = 0; j < storedMinCords[altSettings[0]].length; j++) {
            if (storedMinCords[altSettings[0]][j].i === minCord.i) {
              preserveAltDim = true;
            }
          }
          style.display = 'block';
          if (cord.id !== component.componentId) {
            style[settings[2]] = preserveAltDim ? style[settings[2]] : 0;
            style[altSettings[2]] = Math.abs(minCord.altAxisDiff) + altSettings[1];
            style.left = Math.min(cord.x, activeElementCord.x) + 'vw';
            style.top = Math.min(cord.y, activeElementCord.y) + 'vw';
          } else if (
            !((minCord.i === 0 && settings[0] === 'y') || (minCord.i === 1 && settings[0] === 'x'))
          ) {
            style[settings[3]] = cord[settings[0]] + settings[1];
          } else {
            style.display = 'none';
          }
        }
      }
    }
  }

  setClosestAliignment(
    index: number,
    activeElementCord: { x: number; y: number },
    deltaX: number,
    deltaY: number,
    minX: IMinCord,
    minY: IMinCord,
    filteredElementCords: IFilteredElementCord[]
  ): IMinCord[] {
    for (let i = 0; i < filteredElementCords.length; i++) {
      const cord = filteredElementCords[i];
      const xDiff = cord.x - activeElementCord.x;
      const xDiffAbs = Math.abs(xDiff);
      const yDiff = cord.y - activeElementCord.y;
      const yDiffAbs = Math.abs(yDiff);
      if (xDiffAbs < this.lockInSize && deltaX !== 0) {
        minX = this.compareAlignments(xDiff, xDiffAbs, minX, i, yDiff, index);
      }
      if (yDiffAbs < this.lockInSize && deltaY !== 0) {
        minY = this.compareAlignments(yDiff, yDiffAbs, minY, i, xDiff, index);
      }
      if (deltaX !== 0 || deltaY !== 0) {
        cord.styles[index].display = 'none';
      }
    }
    return [minX, minY];
  }

  moveToAlignment(
    settings: string[],
    storedMinCords: { x?: IMinCord[]; y?: IMinCord[] },
    filteredElementCords: IFilteredElementCord[],
    activeElement: ISectionElement
  ): void {
    const minCord = storedMinCords[settings[0]][0] || false;
    if (minCord) {
      const position = filteredElementCords[minCord.i][settings[0]];
      const dimAdjustment =
        minCord.activeCordIndex === 2 ? 1 : minCord.activeCordIndex === 1 ? 0.5 : 0;
      activeElement.translate[settings[0]] = position - dimAdjustment * activeElement[settings[2]];
    }
  }

  filterStashedCords(
    axis: string,
    isResize: boolean,
    storedMinCords: { x?: IMinCord[]; y?: IMinCord[] }
  ): void {
    if (!(storedMinCords[axis] as IMinCord[]).length) {
      return;
    }
    if (storedMinCords[axis].length === 1) {
      return;
    }
    let activeValue = storedMinCords[axis][0] as IMinCord;
    let newArray = [activeValue];
    for (let j = 1; j < storedMinCords[axis].length; j++) {
      const selectedValue = storedMinCords[axis][j] as IMinCord;
      const diff =
        activeValue.val * (activeValue.activeCordIndex === 1 && isResize ? 2 : 1) -
        selectedValue.val * (selectedValue.activeCordIndex === 1 && isResize ? 2 : 1);
      if (diff < 0) {
        continue;
      }
      if (diff > 0) {
        activeValue = selectedValue;
        newArray = [selectedValue];
        continue;
      }
      if (diff === 0) {
        newArray.push(selectedValue);
        continue;
      }
    }
    storedMinCords[axis] = newArray;
  }

  resizeToAlignment(
    settings: string[],
    storedMinCords: { x?: IMinCord[]; y?: IMinCord[] },
    activeElement: ISectionElement,
    activeHandleSettings: { x: IHandleSettings; y: IHandleSettings }
  ): void {
    const minCord = storedMinCords[settings[0]][0] || false;
    if (minCord && activeHandleSettings[settings[0]]) {
      const setting = activeHandleSettings[settings[0]] as IHandleSettings;
      const dimAdjustment = minCord.activeCordIndex === 1 ? 2 : 1;
      activeElement[setting.dimension] += minCord.val * setting.deltaMultiplier * dimAdjustment;
      if (setting.translate) {
        activeElement.translate[setting.axis] += minCord.val * dimAdjustment;
      }
    }
  }
}
