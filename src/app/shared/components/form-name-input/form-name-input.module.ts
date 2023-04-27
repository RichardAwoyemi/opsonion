import { NgModule } from '@angular/core';
import { FormNameInputComponent } from './form-name-input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormNameInputService } from './form-name-input.service';

@NgModule({
  exports: [FormNameInputComponent],
  imports: [FormsModule, CommonModule],
  declarations: [FormNameInputComponent],
  providers: [FormNameInputService],
})
export class FormNameInputModule {}
