import { IStyle, IDragData } from '../builder-components';

export interface ISectionElement {
  translate?: {
    x?: number;
    y?: number;
  };
  height?: number;
  width?: number;
  type?: string;
  layer?: number;
  mobileSettings?: {
    index?: number;
    style?: IStyle;
  };
  data?: IDragData;
  elementId?: string;
  animation?: IAnimation;
  link?: ILink;
}

export interface IAnimation {
  entrance?: IAnimationSettings;
  default?: IAnimationSettings;
  hover?: IAnimationSettings;
  click?: IAnimationSettings;
}

export interface ILink {
  type: string;
  url?: string;
  page?: string;
  sectionId?: string;
  email?: {
    address: string;
    subject?: string;
  };
  phone?: string | number;
  newTab: boolean;
}

export interface IAnimationSettings {
  class: string;
  styles?: IAnimationStyles;
}

export interface IAnimationStyles {
  'animation-duration'?: string;
  'animation-delay'?: string;
  'animation-iteration-count'?: string;
  'animation-direction'?: string;
  'animation-timing-function'?: string;
  'animation-fill-mode'?: string;
}

export interface IMinCord {
  val: number;
  valAbs: number;
  i: number;
  altAxisDiff: number;
  activeCordIndex: number;
}

export interface IFilteredElementCord {
  id: string;
  x: number;
  y: number;
  styles: {
    top: string;
    height: string;
    left: string;
    width: string;
    position?: string;
    border?: string;
    display?: string;
  }[];
}
