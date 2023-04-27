import { NgModule } from '@angular/core';
import { SocialLoginButtonGroupComponent } from './social-login-button-group.component';
import { CommonModule } from '@angular/common';

@NgModule({
  exports: [SocialLoginButtonGroupComponent],
  imports: [CommonModule],
  declarations: [SocialLoginButtonGroupComponent],
})
export class SocialLoginButtonGroupModule {}
