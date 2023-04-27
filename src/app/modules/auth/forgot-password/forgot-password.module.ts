import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../auth.service';
import { ForgotPasswordComponent } from './forgot-password.page';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnonymousGuard } from '../../core/guards/anonymous.guard';
import { SectionHeaderGroupModule } from '../../../shared/components/section-header-group/section-header-group.module';

const routes: Routes = [
  { path: '', component: ForgotPasswordComponent, canActivate: [AnonymousGuard] },
];

@NgModule({
  declarations: [ForgotPasswordComponent, ForgotPasswordFormComponent],
  imports: [RouterModule.forChild(routes), SectionHeaderGroupModule, FormsModule, CommonModule],
  providers: [AuthService],
})
export class ForgotPasswordModule {}
