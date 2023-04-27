import { ActiveSettings } from '../../builder';
import { ISidebarMenuItem } from './builder-sidebar-menu';
import { UtilService } from '../../../../shared/services/util.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BuilderSidebarMenuService {
  static sidebarMenuItems: ISidebarMenuItem[] = [
    {
      activeSettingName: ActiveSettings.Templates,
      menuItemName: UtilService.toTitleCase(ActiveSettings.Templates),
      svgIconPath:
        'M13.557.736a1 1 0 0 0-1.23-.701L.749 3.137A1 1 0 0 0 .034 4.36l2.332 8.701a1 1 0 0 0 1.23.701L4 13.654V6.003A2 ' +
        '2 0 0 1 5.994 4h8.437L13.557.736zM7.007 6h11.986A1 1 0 0 1 20 6.996v10.008a1 1 0 0 1-1.007.996H7.007A1 1 0 0 1 ' +
        '6 17.004V6.996A1 1 0 0 1 7.007 6zM18 9.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zM8 12l3.5-3 7 7H8v-4z',
      svgIconHeight: 24,
      svgIconWidth: 24,
    },
    {
      activeSettingName: ActiveSettings.Photos,
      menuItemName: UtilService.toTitleCase(ActiveSettings.Photos),
      svgIconPath:
        'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm0 1.5a.5.5 0 0 0-.5.5v14c0 .28.22.5.5.' +
        '5h14a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5zm5.75 10.1l3.05-4.15a2 2 0 0 1 3.22-.01L21 15.78V19a2 2 0 0 1-2 2H5a2 ' +
        '2 0 0 1-2-2v-.09l3.82-5.25a2 2 0 0 1 3.22 0l.7.95zm3.6 4.9H19a.5.5 0 0 0 .5-.5v-2.72l-3.69-4.94a.5.5 0 0 0-.8 0l-' +
        '3.33 4.53 2.68 3.63zm-5.51-4.96a.5.5 0 0 0-.81 0l-3.44 4.74a.5.5 0 0 0 .41.22h7.5l-3.66-4.96zM8.5 10a1.5 1.5 0 1 1 ' +
        '0-3 1.5 1.5 0 0 1 0 3z',
      svgIconHeight: 24,
      svgIconWidth: 24,
    },
    {
      activeSettingName: ActiveSettings.Text,
      menuItemName: UtilService.toTitleCase(ActiveSettings.Text),
      svgIconPath:
        'M18 5.5h-5.25V18c0 .28.22.5.5.5h2a.75.75 0 1 1 0 1.5h-6.5a.75.75 0 1 1 0-1.5h2a.5.5 0 0 0 .5-.5V5.5H6a.5.5 ' +
        '0 0 0-.5.5v1.25a.75.75 0 0 1-1.5 0V5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v1.75a.75.75 0 1 1-1.5 0V6a.5.5 0 0 0-.5-.5z',
      svgIconHeight: 24,
      svgIconWidth: 24,
    },
    {
      activeSettingName: ActiveSettings.Elements,
      menuItemName: UtilService.toTitleCase(ActiveSettings.Elements),
      svgIconPath:
        'M 3.5 20.61 h 6 v -6 h -6 v 6 Z m -0.5 -7.5 h 7 a 1 1 0 0 1 1 1 v 7 a 1 1 0 0 1 -1 1 H 3 a 1 1 0 0 1 -1 -1 v -7 ' +
        'a 1 1 0 0 1 1 -1 Z m 11.54 -3.5 h 5.92 L 17.5 4.06 l -2.96 5.55 Z m 7.63 0.03 a 1 1 0 0 1 -0.88 1.47 H 13.7 a 1 1 0 ' +
        '0 1 -0.88 -1.47 l 3.79 -7.11 a 1 1 0 0 1 1.76 0 l 3.8 7.11 Z M 17.5 20.81 a 3.2 3.2 0 1 0 0 -6.4 a 3.2 3.2 0 0 0 0 6.4 ' +
        'Z M 4.68 7.4 l 2 2 l 3.38 -3.37 a 1.41 1.41 0 1 0 -2 -2 L 6.68 5.4 L 5.32 4.02 a 1.42 1.42 0 0 0 -2 2 L 4.68 7.4 Z m -2.12 ' +
        '0 l -0.3 -0.31 a 2.91 2.91 0 1 1 4.12 -4.13 l 0.3 0.31 l 0.31 -0.3 a 2.92 2.92 0 0 1 4.13 4.12 L 7.39 10.8 a 1 1 0 0 1 -1.41 ' +
        '0 L 2.56 7.4 Z M 17.5 22.3 a 4.7 4.7 0 1 1 0 -9.4 a 4.7 4.7 0 0 1 0 9.4 Z',
      svgIconHeight: 24,
      svgIconWidth: 24,
    },
    {
      activeSettingName: ActiveSettings.Uploads,
      menuItemName: UtilService.toTitleCase(ActiveSettings.Uploads),
      svgIconPath:
        'M12.75 13.81v7.44a.75.75 0 1 1-1.5 0v-7.4L9.49 15.6a.75.75 0 1 1-1.06-1.06l2.35-2.36c.68-.68 1.8-.68 2.48 0l2.35 ' +
        '2.36a.75.75 0 1 1-1.06 1.06l-1.8-1.8zM9 18v1.5H6.75v-.01A5.63 5.63 0 0 1 5.01 8.66a6 6 0 0 1 11.94-.4 5.63 5.63 0 0 ' +
        '1 .3 11.23v.01H15V18h1.88a4.12 4.12 0 1 0-1.5-7.97A4.51 4.51 0 0 0 11 4.5a4.5 4.5 0 0 0-4.43 5.29 4.13 4.13 0 0 0 .68 ' +
        '8.2V18H9z',
      svgIconHeight: 24,
      svgIconWidth: 24,
    },
  ];
}
