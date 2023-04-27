import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarSearchInputComponent } from './builder-sidebar-search-input.component';
import { FormsModule } from '@angular/forms';
import { BuilderSidebarSearchInputService } from './builder-sidebar-search-input.service';

@NgModule({
  declarations: [BuilderSidebarSearchInputComponent],
  imports: [CommonModule, FormsModule],
  exports: [BuilderSidebarSearchInputComponent],
  providers: [BuilderSidebarSearchInputService],
})
export class BuilderSidebarSearchInputModule {}
