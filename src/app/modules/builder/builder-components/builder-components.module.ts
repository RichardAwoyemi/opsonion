import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderPlaceholderComponent } from './builder-placeholder/builder-placeholder.component';
import { BuilderActionsModule } from '../builder-actions/builder-actions.module';
import { FormsModule } from '@angular/forms';
import { BuilderElementsModule } from '../builder-elements/builder-elements.module';
import { BuilderSectionComponent } from './builder-section/builder-section.component';
import { BuilderAlignmentService } from './builder-section/builder-alignment.service';
import { BuilderSectionAnimationComponent } from './builder-section/builder-section-animation/builder-section-animation.component';
import { BuilderSectionElementsComponent } from './builder-section/builder-section-elements/builder-section-elements.component';
import { BuilderSectionAlignmentComponent } from './builder-section/builder-section-alignment/builder-section-alignment.component';
import { BuilderSectionElementWrapperComponent } from './builder-section/builder-section-element-wrapper/builder-section-element-wrapper.component';
import { BuilderSectionWrapperComponent } from './builder-section/builder-section-wrapper/builder-section-wrapper.component';
import { BuilderSectionElementResizeComponent } from './builder-section/builder-section-element-resize/builder-section-element-resize.component';
import { BuilderResizeElementService } from './builder-section/builder-section-element-resize/builder-section-element-resize.service';
import { BuilderSectionElementLinkComponent } from './builder-section/builder-section-link/builder-section-element-link.component';

const COMPONENTS = [
  BuilderSectionComponent,
  BuilderPlaceholderComponent,
  BuilderSectionAnimationComponent,
  BuilderSectionElementsComponent,
  BuilderSectionAlignmentComponent,
  BuilderSectionWrapperComponent,
  BuilderSectionElementWrapperComponent,
  BuilderSectionElementResizeComponent,
  BuilderSectionElementLinkComponent,
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [CommonModule, BuilderActionsModule, BuilderElementsModule, FormsModule],
  providers: [BuilderAlignmentService, BuilderResizeElementService],
})
export class BuilderComponentsModule {}
