import { NgModule } from '@angular/core';
import { FormUsernameInputComponent } from './form-username-input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlockNonAlphanumericCharactersDirective } from '../../directives/block-non-alphanumeric-characters.directive';
import { FormUsernameInputService } from './form-username-input.service';
import { SimpleModalModule } from '../simple-modal/simple-modal.module';

@NgModule({
  exports: [FormUsernameInputComponent, BlockNonAlphanumericCharactersDirective],
  imports: [FormsModule, CommonModule, SimpleModalModule],
  declarations: [FormUsernameInputComponent, BlockNonAlphanumericCharactersDirective],
  providers: [FormUsernameInputService],
})
export class FormUsernameInputModule {}
