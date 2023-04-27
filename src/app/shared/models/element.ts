import { IStyle } from '../../modules/builder/builder-components/builder-components';

export interface IElement {
  src?: string;
  alt?: string;
  group?: string;
  author?: string;
  authorUrl?: string;
  innerHtml?: string;
  style?: IStyle;
  type?: string;
}

export const ELEMENT_CATEGORIES = ['Black Illustrations', 'Shapes', 'Icon8', 'Buttons'];
