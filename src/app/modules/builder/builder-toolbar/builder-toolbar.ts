import { ActiveSettings, toolbarButton } from '../builder';
import { BuilderToolbarBoldComponent } from './builder-toolbar-elements/builder-toolbar-bold/builder-toolbar-bold.component';
import { BuilderToolbarItalicComponent } from './builder-toolbar-elements/builder-toolbar-italic-element/builder-toolbar-italic.component';
import { BuilderToolbarListComponent } from './builder-toolbar-elements/builder-toolbar-list-element/builder-toolbar-list.component';
import { BuilderToolbarUnderlineComponent } from './builder-toolbar-elements/builder-toolbar-underline-element/builder-toolbar-underline.component';
import { BuilderToolbarColourComponent } from './builder-toolbar-elements/builder-toolbar-colour/builder-toolbar-colour.component';
import { BuilderToolbarSidebarMenuItemComponent } from './builder-toolbar-elements/builder-toolbar-sidebar-menu-item/builder-toolbar-sidebar-menu-item.component';
import { BuilderToolbarFontSizeComponent } from './builder-toolbar-elements/builder-toolbar-font-size/builder-toolbar-font-size.component';
import { BuilderToolbarFontNameComponent } from './builder-toolbar-elements/builder-toolbar-font-name/builder-toolbar-font-name.component';
import { BuilderToolbarOrientationComponent } from './builder-toolbar-elements/builder-toolbar-orientation/builder-toolbar-orientation.component';
import { BuilderToolbarPositionComponent } from './builder-toolbar-elements/builder-toolbar-position/builder-toolbar-position.component';
import { BuilderToolbarCopyComponent } from './builder-toolbar-elements/builder-toolbar-copy/builder-toolbar-copy.component';
import { BuilderToolbarDeleteComponent } from './builder-toolbar-elements/builder-toolbar-delete/builder-toolbar-delete.component';
import { BuilderToolbarFontColourComponent } from './builder-toolbar-elements/builder-toolbar-font-colour/builder-toolbar-font-colour.component';
import { BuilderToolbarAlignComponent } from './builder-toolbar-elements/builder-toolbar-align/builder-toolbar-align.component';
import { BuilderToolbarAnimateComponent } from './builder-toolbar-elements/builder-toolbar-animate/builder-toolbar-animate.component';
import { BuilderToolbarLinkComponent } from './builder-toolbar-elements/builder-toolbar-link/builder-toolbar-link.component';

export const TOOLBAR_ELEMENTS = [
  { component: BuilderToolbarColourComponent, elementOptions: { name: toolbarButton.Colour } },
  { component: BuilderToolbarFontNameComponent, elementOptions: { name: toolbarButton.FontName } },
  { component: BuilderToolbarFontSizeComponent, elementOptions: { name: toolbarButton.FontSize } },
  {
    component: BuilderToolbarFontColourComponent,
    elementOptions: { name: toolbarButton.FontColour },
  },
  { component: BuilderToolbarBoldComponent, elementOptions: { name: toolbarButton.Bold } },
  { component: BuilderToolbarItalicComponent, elementOptions: { name: toolbarButton.Italic } },
  {
    component: BuilderToolbarUnderlineComponent,
    elementOptions: { name: toolbarButton.Underline },
  },
  { component: BuilderToolbarAlignComponent, elementOptions: { name: toolbarButton.Align } },
  { component: BuilderToolbarListComponent, elementOptions: { name: toolbarButton.List } },
  { component: BuilderToolbarPositionComponent, elementOptions: { name: toolbarButton.Position } },
  { component: BuilderToolbarAnimateComponent, elementOptions: { name: toolbarButton.Animate } },
  { component: BuilderToolbarLinkComponent, elementOptions: { name: toolbarButton.Link } },
  { component: BuilderToolbarCopyComponent, elementOptions: { name: toolbarButton.Copy } },
  { component: BuilderToolbarDeleteComponent, elementOptions: { name: toolbarButton.Delete } },
  {
    component: BuilderToolbarSidebarMenuItemComponent,
    elementOptions: {
      name: toolbarButton.Adjust,
      menu: ActiveSettings.Adjust,
      displayText: 'Adjust',
    },
  },
  {
    component: BuilderToolbarSidebarMenuItemComponent,
    elementOptions: {
      name: toolbarButton.ColoursMenu,
      menu: ActiveSettings.Colour,
      displayText: 'Colours',
    },
  },
  {
    component: BuilderToolbarOrientationComponent,
    elementOptions: { name: toolbarButton.Orientation },
  },
];

export const TOOLBAR_CONFIGS = {
  button: {
    left: [
      toolbarButton.Colour,
      toolbarButton.FontName,
      toolbarButton.FontSize,
      toolbarButton.FontColour,
      toolbarButton.Bold,
      toolbarButton.Italic,
      toolbarButton.Underline,
    ],
    right: [
      toolbarButton.Position,
      toolbarButton.Link,
      toolbarButton.Animate,
      toolbarButton.Copy,
      toolbarButton.Delete,
      toolbarButton.Orientation,
    ],
  },
  text: {
    left: [
      toolbarButton.Colour,
      toolbarButton.FontName,
      toolbarButton.FontSize,
      toolbarButton.FontColour,
      toolbarButton.Bold,
      toolbarButton.Italic,
      toolbarButton.Underline,
      toolbarButton.List,
      toolbarButton.Align,
    ],
    right: [
      toolbarButton.Position,
      toolbarButton.Link,
      toolbarButton.Animate,
      toolbarButton.Copy,
      toolbarButton.Delete,
      toolbarButton.Orientation,
    ],
  },
  image: {
    left: [toolbarButton.Adjust],
    right: [
      toolbarButton.Position,
      toolbarButton.Link,
      toolbarButton.Animate,
      toolbarButton.Copy,
      toolbarButton.Delete,
      toolbarButton.Orientation,
    ],
  },
  componentMenu: { left: [toolbarButton.Colour], right: [toolbarButton.Orientation] },
  none: { left: [], right: [toolbarButton.Orientation] },
  defaultMenu: { left: [], right: [toolbarButton.Orientation] },
};
