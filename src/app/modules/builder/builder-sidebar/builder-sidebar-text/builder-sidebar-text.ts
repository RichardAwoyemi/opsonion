import { IStyle } from '../../builder-components/builder-components';

export interface ISidebarTextItem {
  svg?: string;
  metadata: ISidebarTextItemMetadata;
}

export interface ISidebarTextItemMetadata {
  font?: googleFonts.WebfontFamily;
  url?: string;
  text?: string;
  size?: number;
  fill?: string;
  stroke?: string;
  style?: ISidebarTextItemStyle;
}

export interface ISidebarDefaultTextItemMetadata extends ISidebarTextItemMetadata {
  svgProperties: {
    width: string;
    height: string;
    viewBox: string;
    id: string;
    strokeLinecap: string;
    fillRule: string;
    fontSize: string;
    stroke: string;
    strokeWidth: string;
    fill: string;
    style: string;
    path: string;
  };
}

export interface ISidebarTextItemStyle {
  inlineStyle: IStyle;
  displayStyle?: string;
}
