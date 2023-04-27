import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BuilderToolbarBoldComponent } from './builder-toolbar-bold/builder-toolbar-bold.component';
import { BuilderToolbarColourComponent } from './builder-toolbar-colour/builder-toolbar-colour.component';
import { BuilderToolbarElementComponent } from './builder-toolbar-element.component';
import { BuilderToolbarElementDirective } from './builder-toolbar-element.directive';
import { BuilderToolbarElementService } from './builder-toolbar-element.service';
import { BuilderToolbarFontNameComponent } from './builder-toolbar-font-name/builder-toolbar-font-name.component';
import { BuilderToolbarFontSizeComponent } from './builder-toolbar-font-size/builder-toolbar-font-size.component';
import { BuilderToolbarItalicComponent } from './builder-toolbar-italic-element/builder-toolbar-italic.component';
import { BuilderToolbarListComponent } from './builder-toolbar-list-element/builder-toolbar-list.component';
import { BuilderToolbarSidebarMenuItemComponent } from './builder-toolbar-sidebar-menu-item/builder-toolbar-sidebar-menu-item.component';
import { BuilderToolbarUnderlineComponent } from './builder-toolbar-underline-element/builder-toolbar-underline.component';
import { BuilderToolbarOrientationComponent } from './builder-toolbar-orientation/builder-toolbar-orientation.component';
import { BuilderToolbarPositionComponent } from './builder-toolbar-position/builder-toolbar-position.component';
import { BuilderToolbarCopyComponent } from './builder-toolbar-copy/builder-toolbar-copy.component';
import { BuilderToolbarDeleteComponent } from './builder-toolbar-delete/builder-toolbar-delete.component';
import { BuilderToolbarFontColourComponent } from './builder-toolbar-font-colour/builder-toolbar-font-colour.component';
import { BuilderToolbarAlignComponent } from './builder-toolbar-align/builder-toolbar-align.component';
import { BuilderToolbarAnimateComponent } from './builder-toolbar-animate/builder-toolbar-animate.component';
import { BuilderToolbarLinkComponent } from './builder-toolbar-link/builder-toolbar-link.component';

const components = [
  BuilderToolbarBoldComponent,
  BuilderToolbarColourComponent,
  BuilderToolbarCopyComponent,
  BuilderToolbarDeleteComponent,
  BuilderToolbarFontColourComponent,
  BuilderToolbarFontNameComponent,
  BuilderToolbarFontSizeComponent,
  BuilderToolbarItalicComponent,
  BuilderToolbarListComponent,
  BuilderToolbarLinkComponent,
  BuilderToolbarSidebarMenuItemComponent,
  BuilderToolbarPositionComponent,
  BuilderToolbarUnderlineComponent,
  BuilderToolbarOrientationComponent,
  BuilderToolbarAlignComponent,
  BuilderToolbarAnimateComponent,
];

@NgModule({
  declarations: [...components, BuilderToolbarElementComponent, BuilderToolbarElementDirective],
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  providers: [BuilderToolbarElementService],
  exports: [BuilderToolbarElementComponent],
})
export class BuilderToolbarElementModule {}
