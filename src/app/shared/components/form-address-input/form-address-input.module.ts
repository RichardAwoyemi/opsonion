import { NgModule } from '@angular/core';
import { FormAddressInputComponent } from './form-address-input.component';
import { FormAddressInputService } from './form-address-input.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FormAddressInputComponent],
  exports: [FormAddressInputComponent],
  imports: [FormsModule, CommonModule],
  providers: [FormAddressInputService],
})
export class FormAddressInputModule {}
