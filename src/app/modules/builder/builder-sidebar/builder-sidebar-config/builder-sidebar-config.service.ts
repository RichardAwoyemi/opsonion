import { Injectable } from '@angular/core';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { UtilService } from 'src/app/shared/services/util.service';
import {
  IElementData,
  IElementMenuOption,
  IElementOptionSettings,
  IElementSettings,
} from './builder-sidebar-config';
import { IComponent } from '../../builder-components/builder-components';
import { IWebsite } from '../../../../shared/models/website';
import { IElementArrayItem } from './builder-sidebar-config';

@Injectable()
export class BuilderSidebarConfigService {
  constructor(private builderComponentsService: BuilderComponentsService) {}

  getSidebarComponent(website: IWebsite, elementData: IElementData): IComponent {
    return website.pages[elementData.pageIndex].components[elementData.componentIndex];
  }

  getDisplayOption(
    component: IComponent,
    elementData: IElementData,
    settings: IElementSettings
  ): boolean {
    if (settings.getDisplayOption) {
      return elementData.componentService[settings.getDisplayOption](
        component,
        elementData,
        settings
      );
    }
    let displayOption = true;
    if (settings.displayOption) {
      for (let i = 0; i < settings.displayOption.length; i++) {
        const criteria = settings.displayOption[i];
        if (displayOption || settings.any) {
          if (criteria.exists || criteria.exists === false) {
            displayOption =
              !!((UtilService.getDeepProp(component, criteria.property) as unknown) as string) ===
              criteria.exists;
          }
          if ((criteria.value || criteria.value !== undefined) && displayOption !== false) {
            displayOption =
              ((UtilService.getDeepProp(component, criteria.property) as unknown) as string) ===
              criteria.value;
          }
          if (criteria.toggleCriterion) {
            displayOption = !displayOption;
          }
          if (displayOption && settings.any) {
            break;
          }
        }
      }
    }
    return displayOption;
  }

  getComponentDetail(
    component: IComponent,
    keys: IElementSettings
  ): { isStyle: boolean; value: unknown; isChild: boolean } {
    if (component) {
      let componentDetail;
      let child = false;
      let style = false;
      if (keys.name in component) {
        componentDetail = component[keys.name];
      } else {
        componentDetail = component.style[keys.name];
        style = true;
      }
      if (keys.childKey) {
        componentDetail = componentDetail[keys.childKey];
        child = true;
      }
      return { value: componentDetail, isStyle: style, isChild: child };
    }
    return null;
  }

  getInitialOption(component: IComponent, settings: IElementSettings): IElementOptionSettings {
    if (component) {
      optionLoop: for (let i = 0; i < settings.optionSettings.length; i++) {
        let activeOptionIndicator = true;
        const option = settings.optionSettings[i];
        for (let j = 0; j < option.update.length; j++) {
          const updateSet = option.update[j];
          activeOptionIndicator =
            this.getComponentDetail(component, updateSet).value === updateSet.value;
          if (!activeOptionIndicator) {
            activeOptionIndicator = true;
            continue optionLoop;
          }
          if (activeOptionIndicator && j === option.update.length - 1) {
            return option;
          }
        }
      }
      return null;
    }
  }

  getInitialElementsValue(
    component: IComponent,
    elementData: IElementData,
    settings: IElementSettings
  ): IElementArrayItem[] {
    if (component) {
      return settings.elements.map((element) => {
        const newElement = element;
        newElement['value'] = this.getInitialValue(component, elementData, element) as
          | number
          | string;
        return newElement;
      });
    }
  }

  getInitialValue(
    component: IComponent,
    elementData: IElementData,
    settings: IElementSettings
  ): unknown {
    if (component) {
      if (settings.optionSettings && !settings.getInitialValue) {
        return this.getInitialOption(component, settings);
      }
      const componentDetail = this.getComponentDetail(component, settings);
      if (settings.getInitialValue) {
        return elementData.componentService[settings.getInitialValue](
          componentDetail.value,
          settings
        );
      }
      return componentDetail.value;
    }
  }

  setNewValue(
    componentId: string,
    elementData: IElementData,
    settings: IElementSettings,
    value: IElementMenuOption | unknown | unknown[]
  ): void {
    if (settings.setNewValue) {
      elementData.componentService[settings.setNewValue](componentId, value, elementData, settings);
      return;
    }
    const isArrayType = Array.isArray(value);
    const arrayLength = value['length'] || 1;

    for (let i = 0; i < arrayLength; i++) {
      const activeValue = isArrayType ? value[i]['value'] : value;
      const parentKey = isArrayType ? value[i]['name'] : settings.name;
      const childKey = isArrayType ? value[i]['childKey'] || false : settings.childKey;

      if (childKey) {
        this.builderComponentsService.setPageComponentByIdAndKey(
          componentId,
          parentKey,
          childKey,
          activeValue
        );
      } else {
        this.builderComponentsService.setPageComponentById(componentId, settings.name, activeValue);
      }
    }
  }

  toggleValue(
    component: IComponent,
    componentId: string,
    elementData: IElementData,
    settings: IElementSettings
  ): void {
    let newValue;
    if (settings.name in component) {
      newValue = component[settings.name];
    } else {
      newValue = component['style'][settings.name];
    }
    if (settings.childKey) {
      newValue = !newValue[settings.childKey];
      this.builderComponentsService.setPageComponentByIdAndKey(
        componentId,
        settings.name,
        settings.childKey,
        newValue
      );
    } else {
      newValue = !newValue;
      this.builderComponentsService.setPageComponentById(componentId, settings.name, newValue);
    }
  }

  setDefaultValue(
    componentId: string,
    elementData: IElementData,
    settings: IElementSettings
  ): void {
    if (settings.defaultValue) {
      this.setNewValue(componentId, elementData, settings, settings.defaultValue);
      return;
    }
    if (settings.getDefaultValue) {
      elementData.componentService[settings.getDefaultValue](elementData, settings);
      return;
    }
    let defaultTemplate = UtilService.shallowClone(
      this.builderComponentsService.activeTemplate.getValue()[elementData.componentName]
    );
    if (settings.name in defaultTemplate['style']) {
      defaultTemplate = defaultTemplate['style'];
    } else {
      defaultTemplate = defaultTemplate['details'];
    }
    if (settings.childKey) {
      const defaultValue = defaultTemplate[settings.name][settings.childKey];
      this.builderComponentsService.setPageComponentByIdAndKey(
        componentId,
        settings.name,
        settings.childKey,
        defaultValue
      );
      return;
    } else {
      const defaultValue = defaultTemplate[settings.name];
      this.builderComponentsService.setPageComponentById(componentId, settings.name, defaultValue);
      return;
    }
  }
}
