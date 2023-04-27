import { ActiveSettings } from '../../builder';

export interface ISidebarMenuItem {
  activeSettingName: ActiveSettings;
  menuItemName: string;
  svgIconPath: string;
  svgIconHeight: number;
  svgIconWidth: number;
}
