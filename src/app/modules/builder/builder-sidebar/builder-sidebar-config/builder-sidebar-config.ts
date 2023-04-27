import { Type } from '@angular/core';
import { Options } from '@m0t0r/ngx-slider';
import { ActiveThemeSettings } from 'src/app/shared/services/theme.service';
import { ActiveSettings } from '../../builder';
import { IToolbarColours } from '../../builder-components/builder-components';

export class BuilderSidebarConfig {
  constructor(public component: Type<unknown>, public elementSettings: IElementSettings) {}
}

export interface ISidebarElementItem {
  component?: Type<unknown>;
  elementSettings?: IElementSettings;
}

export interface IElementButtonProperties {
  center?: {
    value?: unknown;
    visible?: boolean;
  };
  justify?: {
    value?: unknown;
    visible?: boolean;
  };
  left?: {
    value?: unknown;
    visible?: boolean;
  };
  right?: {
    value?: unknown;
    visible?: boolean;
  };
}

export interface IElementOptionSettings {
  alt?: string;
  src?: string;
  displayName?: string;
  update: {
    childKey?: string;
    name: string;
    value: unknown;
  }[];
}

export interface IElementFieldSettings {
  childKey?: string;
  name?: string;
  placeholder?: string | number;
  prependClass?: string;
}

export interface IElementData {
  componentName?: string;
  pageIndex?: number;
  componentIndex?: number;
  componentService?: unknown;
}

export interface IElementSettings {
  any?: boolean;
  buttonClass?: string;
  buttonProperties?: IElementButtonProperties;
  colourSettings?: IToolbarColours[];
  ceil?: number;
  childKey?: string;
  containerStyle?: unknown;
  defaultValue?: unknown[];
  displayText?: string;
  displayOption?: {
    exists?: boolean;
    property: string;
    value?: string;
    toggleCriterion?: boolean;
  }[];
  dropdownOptions?: IElementMenuOption[];
  elements?: IElementArrayItem[];
  fieldSettings?: IElementFieldSettings[];
  floor?: number;
  getDisplayOption?: string;
  getDefaultValue?: string;
  getInitialValue?: string;
  imageSizeUnit?: string;
  includeLineBreak?: boolean;
  label?: string;
  library?: boolean;
  name?: string;
  menu?: ActiveSettings;
  maxValue?: number;
  minValue?: number;
  optionSettings?: IElementOptionSettings[];
  pageKey?: string;
  photos?: boolean;
  sectionHeader?: string;
  setNewValue?: string;
  serviceFunction?: string;
  sliderOptions?: Options;
  toggle?: boolean;
  upload?: boolean;
  valueKey?: string;
}

export interface IElementArrayItem {
  childKey?: string;
  displayName?: string;
  name?: string;
  getInitialValue?: string;
  setNewValue?: string;
  themeKey?: ActiveThemeSettings;
  value?: string | number;
}

export interface IElementMenuOption {
  displayName?: string;
  value?: string;
}
