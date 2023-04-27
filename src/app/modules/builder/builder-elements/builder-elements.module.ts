import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderTextEditorComponent } from './builder-text-editor/builder-text-editor.component';
import { BuilderElementsService } from './builder-elements.service';
import { BuilderTextBlockComponent } from './builder-text-block/builder-text-block.component';
import { BuilderImageComponent } from './builder-image/builder-image.component';
import { BuilderActionsModule } from '../builder-actions/builder-actions.module';
import { BuilderButtonComponent } from './builder-button/builder-button.component';

const ELEMENTS = [
  BuilderButtonComponent,
  BuilderImageComponent,
  BuilderTextEditorComponent,
  BuilderTextBlockComponent,
];

@NgModule({
  declarations: [ELEMENTS],
  exports: ELEMENTS,
  imports: [CommonModule, BuilderActionsModule],
  providers: [BuilderElementsService],
})
export class BuilderElementsModule {}
