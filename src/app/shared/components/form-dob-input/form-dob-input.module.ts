import { NgModule } from '@angular/core';
import { FormDobInputComponent } from './form-dob-input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormDobInputService } from './form-dob-input.service';
import { DataService } from '../../services/data.service';

@NgModule({
  exports: [FormDobInputComponent],
  imports: [FormsModule, CommonModule],
  declarations: [FormDobInputComponent],
  providers: [FormDobInputService, DataService],
})
export class FormDobInputModule {}
