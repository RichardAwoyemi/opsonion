import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { HTMLInputEvent } from '../../../shared/models/html-input-event';
import { ITemplate } from '../../../shared/models/template';
import { IWebsite } from '../../../shared/models/website';
import { UtilService } from '../../../shared/services/util.service';
import { ActiveComponents, ActiveComponentsPartialSelector } from '../builder';
import { BuilderService } from '../builder.service';
import { IComponent, IComponentMetadata, IComponentTarget, IStyle } from './builder-components';
import { ISectionElement } from './builder-section/builder-section';

@Injectable()
export class BuilderComponentsService {
  activeComponentIndex = new BehaviorSubject<number>(0);
  website = new BehaviorSubject<IWebsite>(null);
  activeTemplate = new BehaviorSubject<ITemplate>(null);

  constructor(private builderService: BuilderService, private toastrService: ToastrService) {}

  static removePlaceholders(components: IComponent[]): IComponent[] {
    const componentsArrayWithoutPlaceholders = [];
    for (let i = 0; i < components.length; i++) {
      if (components[i].componentName !== ActiveComponentsPartialSelector.Placeholder) {
        componentsArrayWithoutPlaceholders.push(components[i]);
      }
    }
    return componentsArrayWithoutPlaceholders;
  }

  static getUnorderedComponentsArrayWithoutPlaceholders(e: Event): IComponent[] {
    const tempUnorderedComponentsArrayWithoutPlaceholders = [];
    for (let i = 0; i < (e as HTMLInputEvent).target.children.length; i++) {
      if ((e as HTMLInputEvent).target.children[i].children[0]) {
        const componentName = (e as HTMLInputEvent).target.children[i].children[0].localName;
        const componentId = (e as HTMLInputEvent).target.children[i].children[0].id;
        const component = {
          componentName: componentName,
          componentId: componentId,
          componentIndex: null,
        };
        if (component.componentName !== ActiveComponentsPartialSelector.Placeholder) {
          tempUnorderedComponentsArrayWithoutPlaceholders.push(component);
        }
      }
    }
    return tempUnorderedComponentsArrayWithoutPlaceholders;
  }

  static getOrderedComponentsArrayWithPlaceholders(
    tempUnorderedComponentsArrayWithoutPlaceholders: IComponent[]
  ): IComponent[] {
    const tempUnorderedComponentsArrayWithPlaceholders = tempUnorderedComponentsArrayWithoutPlaceholders.reduce(
      (r, a) =>
        r.concat(a, {
          componentName: <string>ActiveComponentsPartialSelector.Placeholder,
          componentId: `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
          componentIndex: null,
          timestamp: new Date().getTime(),
        }),
      [
        {
          componentName: <string>ActiveComponentsPartialSelector.Placeholder,
          componentId: `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
          componentIndex: null,
          timestamp: new Date().getTime(),
        },
      ]
    );
    const tempOrderedComponentsArrayWithPlaceholders = [];
    for (let i = 0; i < tempUnorderedComponentsArrayWithPlaceholders.length; i++) {
      const component = {
        componentName: tempUnorderedComponentsArrayWithPlaceholders[i].componentName,
        componentId: tempUnorderedComponentsArrayWithPlaceholders[i].componentId,
        componentIndex: i,
        timestamp: new Date().getTime(),
      };
      tempOrderedComponentsArrayWithPlaceholders.push(component);
    }
    return tempOrderedComponentsArrayWithPlaceholders;
  }

  static getActivePageComponentIndex(
    website: IWebsite,
    component: IComponent
  ): { [key: string]: number } {
    const result = {
      activePageIndex: null,
      activeComponentIndex: null,
    };
    for (let i = 0; i < website.pages.length; i++) {
      for (let j = 0; j < website.pages[i].components.length; j++) {
        if (website.pages[i].components[j].componentId === component.nearestComponentId) {
          result.activePageIndex = i;
          result.activeComponentIndex = j;
        }
      }
    }
    return result;
  }

  static getActivePageIndex(website: IWebsite, component: IComponent): number {
    const result = BuilderComponentsService.getActivePageComponentIndex(website, component);
    return result.activePageIndex;
  }

  static deleteComponentById(components: IComponent[], componentId: string): IComponent[] {
    return components.filter(function (a) {
      return a.componentId !== componentId;
    });
  }

  static addPlaceholders(components: IComponent[]): IComponent[] {
    for (let j = components.length; j >= 0; j--) {
      const placeholder: IComponent = {
        componentIndex: j * 2,
        componentType: ActiveComponents.Placeholder,
        componentName: ActiveComponentsPartialSelector.Placeholder,
        timestamp: new Date().getTime(),
        componentId: `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
      };
      components.splice(j, 0, placeholder);
    }
    return components;
  }

  getPages(website = this.website.getValue()): Array<string> {
    const menuOptions = [];
    for (let i = 0; i < website.pages.length; i++) {
      menuOptions.push(website.pages[i]['name']);
    }
    return menuOptions;
  }

  getComponent(activePageIndex: number, activeComponentIndex: number): IComponent {
    return this.website.getValue().pages[activePageIndex].components[activeComponentIndex];
  }

  getTargetComponentByProperty(
    property: 'componentName' | 'componentId',
    value: string,
    activeWebsite = null
  ): IComponentTarget[] {
    const website: IWebsite = activeWebsite ? activeWebsite : this.website.getValue();
    const targetComponents = [];
    for (let i = 0; i < website.pages.length; i++) {
      for (let j = 0; j < website.pages[i].components.length; j++) {
        if (website.pages[i].components[j][property] === value) {
          targetComponents.push({
            activePageIndex: i,
            activeComponentIndex: j,
          });
        }
      }
    }
    return targetComponents;
  }

  getTargetComponentById(componentId: string): IComponentTarget[] {
    return this.getTargetComponentByProperty('componentId', componentId);
  }

  getTargetComponentByName(componentName: string, activeWebsite = null): IComponentTarget[] {
    let website: IWebsite;
    if (activeWebsite === null) {
      website = this.website.getValue();
    } else {
      website = activeWebsite;
    }
    return this.getTargetComponentByProperty('componentName', componentName, website);
  }

  setPageComponentByIdAndKey(
    componentId: string,
    parentKey: string,
    childKey: string,
    value: unknown
  ): void {
    const website = this.setPageComponents(
      componentId,
      parentKey,
      value,
      this.website.getValue(),
      childKey
    );
    this.website.next(website);
  }

  setPageComponentById(componentId: string, key: string, value: unknown): void {
    this.website.next(this.setPageComponents(componentId, key, value));
  }

  setPageComponents(
    componentId: string,
    key: string,
    value: unknown,
    initialWebsite?: IWebsite,
    childKey?: string
  ): IWebsite {
    const targetComponentLocation = this.getTargetComponentById(componentId);
    const website = initialWebsite || this.website.getValue();
    const timestamp = new Date().getTime();
    const isChild = childKey !== undefined;
    for (let i = 0; i < targetComponentLocation.length; i++) {
      const activePageIndex = targetComponentLocation[i].activePageIndex;
      const activeComponentIndex = targetComponentLocation[i].activeComponentIndex;
      const isStyle = Object.prototype.hasOwnProperty.call(
        website.pages[activePageIndex].components[activeComponentIndex].style,
        key
      );
      if (isStyle && isChild) {
        website.pages[activePageIndex].components[activeComponentIndex].style[key][
          childKey
        ] = value;
      } else if (isStyle && !isChild) {
        website.pages[activePageIndex].components[activeComponentIndex].style[key] = value;
      } else if (!isStyle && isChild) {
        website.pages[activePageIndex].components[activeComponentIndex][key][childKey] = value;
      } else {
        website.pages[activePageIndex].components[activeComponentIndex][key] = value;
      }
      website.pages[activePageIndex].components[activeComponentIndex]['timestamp'] = timestamp;
    }
    return website;
  }

  checkIfComponentExists(componentName: string, activeWebsite = null): boolean {
    let website: IWebsite;
    if (activeWebsite === null) {
      website = this.website.getValue();
    } else {
      website = activeWebsite;
    }
    for (let i = 0; i < website.pages.length; i++) {
      for (let j = 0; j < website.pages[i].components.length; j++) {
        if (website.pages[i].components[j].componentName === componentName) {
          return true;
        }
      }
    }
    return false;
  }

  checkIfPageExists(pageName: string, activeWebsite = null): boolean {
    let website: IWebsite;
    if (activeWebsite === null) {
      website = this.website.getValue();
    } else {
      website = activeWebsite;
    }
    for (let i = 0; i < website.pages.length; i++) {
      if (website.pages[i].name.toLowerCase() === pageName.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  addComponent(component: IComponent): void {
    const website = this.website.getValue();
    if (!component.pageIndex && component.pageIndex !== 0) {
      component.pageIndex = BuilderComponentsService.getActivePageIndex(website, component);
    }
    this.insertComponent(component);
    this.toastrService.success('Your component has been added.', 'Great!');
    this.builderService.activeComponentMetadata.next(null);
  }

  insertComponent(component: IComponent): void {
    const website = this.website.getValue();
    let components = website.pages[component.pageIndex].components;
    components.splice(component.componentIndex || 999, 0, component);
    components = BuilderComponentsService.removePlaceholders(components);
    components = BuilderComponentsService.addPlaceholders(components);
    website.pages[component.pageIndex].components = components;
    this.website.next(UtilService.shallowClone(website));
  }

  renamePage(newPageName: string, oldPageName: string): void {
    const website = this.website.getValue();
    for (let i = 0; i < website.pages.length; i++) {
      if (website.pages[i].name === oldPageName) {
        website.pages[i].name = newPageName;
      }
    }
    this.website.next(UtilService.shallowClone(website));
  }

  deletePage(pageName: string): void {
    const website = this.website.getValue();
    for (let i = 0; i < website.pages.length; i++) {
      if (website.pages[i].name === pageName) {
        website.pages.splice(i, 1);
      }
    }
    this.website.next(UtilService.shallowClone(website));
  }

  getPageIndex(pageName: string): number {
    const website = this.website.getValue();
    if (website) {
      for (let i = 0; i < website.pages.length; i++) {
        if (website.pages[i].name === pageName) {
          return i;
        }
      }
    }
    return null;
  }

  setComponent(component: IComponent): void {
    const website = UtilService.shallowClone(this.website.getValue());
    website.pages[component.pageIndex].components[component.componentIndex] = component;
    this.website.next(website);
  }

  setElementStyle(activeComponentMetadata: IComponentMetadata, style: IStyle): void {
    const website = this.website.getValue();
    const activeElement = website.pages[activeComponentMetadata.component.pageIndex].components[
      activeComponentMetadata.component.componentIndex
    ].elements.find((element) => element.elementId === activeComponentMetadata.activeElementId);
    activeElement.data[activeElement.type].style = style;
    this.website.next(UtilService.shallowClone(website));
  }

  setWebsiteElementByIndices(
    newElement: ISectionElement,
    pageIndex: number,
    componentIndex: number
  ): void {
    const website = UtilService.shallowClone(this.website.getValue());
    const elements = website.pages[pageIndex].components[componentIndex].elements;
    newElement.layer = elements.length;
    elements.push(newElement);
    this.website.next(website);
  }
}
