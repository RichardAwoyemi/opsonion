import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.page';
import { AuthService } from '../auth.service';
import { SectionHeaderGroupModule } from '../../../shared/components/section-header-group/section-header-group.module';
import { FormRegisterModule } from '../../../shared/components/form-register/form-register.module';
import { AnonymousGuard } from '../../core/guards/anonymous.guard';

const routes: Routes = [{ path: '', component: RegisterComponent, canActivate: [AnonymousGuard] }];

@NgModule({
  declarations: [RegisterComponent],
  imports: [RouterModule.forChild(routes), SectionHeaderGroupModule, FormRegisterModule],
  providers: [AuthService],
})
export class RegisterModule {}
