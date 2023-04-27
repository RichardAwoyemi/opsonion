import { ActiveComponents, ActiveToolbar, ActiveDragType } from '../builder';
import { IUploadFile } from '../../../shared/models/website';
import { ISectionElement } from './builder-section/builder-section';

export interface IComponentMetadata {
  activeElement?: ISectionElement;
  activeElementType?: string;
  activeElementId?: string;
  activeElementIndex?: number;
  component?: IComponent;
  componentName: ActiveComponents;
  componentId?: string;
  componentIndex?: number;
  pageIndex?: number;
  name?: IElementMetadata;
  componentMenu: IElementMetadata;
  button?: IElementMetadata;
  copyright?: IElementMetadata;
  heading?: IElementMetadata;
  image?: IElementMetadata;
  jobTitle?: IElementMetadata;
  link?: IElementMetadata;
  logo?: IElementMetadata;
  page?: IElementMetadata;
  social?: IElementMetadata;
  subheading?: IElementMetadata;
  subtitle?: IElementMetadata;
  title?: IElementMetadata;
}

export interface IElementMetadata {
  toolbarConfig?: ActiveToolbar;
  style?: string;
  text?: string;
  name?: string;
}

export interface IComponentDetail {
  componentIndex: number;
  componentId: string;
  componentName: string;
  componentType?: string;
  timestamp: number;
  elements?: ISectionElement[];
  height?: number;
}

export interface IStyle {
  alt?: string;
  'background-color'?: string;
  'background-attachment'?: string;
  'background-size'?: string;
  'background-image'?: string;
  'border-color'?: string;
  'border-radius'?: string;
  'box-shadow'?: string;
  color?: string;
  display?: string;
  'font-family'?: string;
  'font-size'?: string;
  'font-weight'?: string;
  height?: string;
  'line-height'?: string;
  'margin-right'?: string;
  'margin-left'?: string;
  'margin-bottom'?: string;
  'margin-top'?: string;
  'min-width'?: string;
  'padding-left'?: string;
  'padding-bottom'?: string;
  'padding-top'?: string;
  'padding-right'?: string;
  src?: string;
  'text-align'?: string;
  'text-shadow'?: string;
  width?: string;
}

export interface IComponent extends IComponentDetail {
  nearestComponentId?: string;
  pageIndex?: number;
  style?: IStyle;
}

export interface IComponentTarget {
  activePageIndex: number;
  activeComponentIndex: number;
}

export enum IComponentEventMessage {
  ComponentAdded = 'component-added',
  ComponentSelected = 'component-selected',
  ComponentExists = 'component-exists',
  RecycleShowcase = 'recycle-showcase',
  DeleteComponent = 'delete-component',
  NonComponentSelected = 'non-component-selected',
  ComponentError = 'component-error',
}

export interface IToolbarColours {
  type: ColourTypes;
  key?: string;
}

export enum ColourTypes {
  Style = 'style',
  ComponentStyle = 'componentStyle',
}

export interface IDragData {
  type?: ActiveDragType;
  component?: IComponent;
  image?: IUploadFile;
  button?: IButton;
  text?: {
    innerHtml?: string;
    style?: IStyle;
    colours?: IToolbarColours[];
  };
  index?: number;
  sectionElement?: ISectionElement;
}

export interface IButton {
  innerHtml?: string;
  link?: string;
  style?: IStyle;
  colours?: IToolbarColours[];
}
