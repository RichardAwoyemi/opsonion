import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from 'src/app/modules/core/guards/anonymous.guard';
import { LegalComponent } from './legal/legal.page';
import { PressComponent } from './press/press.page';
import { AuthGuard } from '../core/guards/auth.guard';
import { DomainGuard } from '../core/guards/domain.guard';

const routes: Routes = [
  { path: 'press', component: PressComponent, canActivate: [AnonymousGuard] },
  { path: 'legal', component: LegalComponent, canActivate: [AnonymousGuard] },
  {
    path: 'login',
    loadChildren: '../auth/login/login.module#LoginModule',
    canActivate: [AnonymousGuard],
  },
  {
    path: 'register',
    loadChildren: '../auth/register/register.module#RegisterModule',
    canActivate: [AnonymousGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: '../auth/forgot-password/forgot-password.module#ForgotPasswordModule',
    canActivate: [AnonymousGuard],
  },
  {
    path: 'verify-email',
    loadChildren: '../auth/verify-email/verify-email.module#VerifyEmailModule',
    canActivate: [AnonymousGuard],
  },
  {
    path: 'builder/:id',
    loadChildren: '../builder/builder.module#BuilderModule',
    canActivate: [DomainGuard],
  },
  {
    path: 'websites/:id',
    loadChildren: '../website/website.module#WebsiteModule',
    canActivate: [DomainGuard],
  },
  {
    path: 'dashboard',
    loadChildren: '../dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'invite/:id',
    loadChildren: '../invite/invite.module#InviteModule',
    canActivate: [AnonymousGuard],
  },
  { path: '', loadChildren: './home/home.module#HomeModule' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
  constructor() {}
}
