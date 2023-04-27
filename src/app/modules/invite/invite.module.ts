import { RouterModule, Routes } from '@angular/router';
import { InviteComponent } from './invite.page';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SectionHeaderGroupModule } from '../../shared/components/section-header-group/section-header-group.module';
import { FormRegisterModule } from '../../shared/components/form-register/form-register.module';

const routes: Routes = [{ path: '', component: InviteComponent }];

@NgModule({
  declarations: [InviteComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SectionHeaderGroupModule,
    FormRegisterModule,
  ],
})
export class InviteModule {}
