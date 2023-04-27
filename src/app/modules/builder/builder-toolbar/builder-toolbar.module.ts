import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderToolbarComponent } from './builder-toolbar.component';
import { BuilderToolbarElementModule } from './builder-toolbar-elements/builder-toolbar-element.module';

@NgModule({
  declarations: [BuilderToolbarComponent],
  exports: [BuilderToolbarComponent],
  imports: [BuilderToolbarElementModule, CommonModule],
})
export class BuilderToolbarModule {}
