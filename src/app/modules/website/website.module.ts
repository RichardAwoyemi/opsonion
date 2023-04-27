import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WebsiteLayoutComponent } from './website-layout/website-layout.component';
import { WebsiteComponent } from './website.page';
import { WebsiteHeaderComponent } from './website-header/website-header.component';

const routes: Routes = [
  { path: '', component: WebsiteComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [WebsiteComponent, WebsiteLayoutComponent, WebsiteHeaderComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  entryComponents: [WebsiteLayoutComponent],
})
export class WebsiteModule {}
