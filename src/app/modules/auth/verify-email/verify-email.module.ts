import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../auth.service';
import { VerifyEmailComponent } from './verify-email.page';
import { CommonModule } from '@angular/common';
import { AnonymousGuard } from '../../core/guards/anonymous.guard';

const routes: Routes = [
  { path: '', component: VerifyEmailComponent, canActivate: [AnonymousGuard] },
];

@NgModule({
  declarations: [VerifyEmailComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  providers: [AuthService],
})
export class VerifyEmailModule {}
