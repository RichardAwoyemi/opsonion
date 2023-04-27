import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginComponent } from './login.page';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnonymousGuard } from '../../core/guards/anonymous.guard';
import { SectionHeaderGroupModule } from '../../../shared/components/section-header-group/section-header-group.module';
import { SocialLoginButtonGroupModule } from '../../../shared/components/social-login-button-group/social-login-button-group.module';

const routes: Routes = [{ path: '', component: LoginComponent, canActivate: [AnonymousGuard] }];

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [
    RouterModule.forChild(routes),
    SectionHeaderGroupModule,
    FormsModule,
    SocialLoginButtonGroupModule,
    CommonModule,
  ],
  providers: [AuthService],
})
export class LoginModule {}
