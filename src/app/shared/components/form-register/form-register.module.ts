import { NgModule } from '@angular/core';
import { FormRegisterComponent } from './form-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginButtonGroupModule } from '../social-login-button-group/social-login-button-group.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    SocialLoginButtonGroupModule,
    CommonModule,
    RouterModule,
  ],
  exports: [FormRegisterComponent],
  declarations: [FormRegisterComponent],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LeAv3UUAAAAAPYLttDEohg_KgyNifLN0Cx6IlPc',
      } as RecaptchaSettings,
    },
  ],
})
export class FormRegisterModule {}
