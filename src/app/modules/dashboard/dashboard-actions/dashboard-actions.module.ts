import { NgModule } from '@angular/core';
import { DashboardCreateWebsiteModalComponent } from './dashboard-create-website-modal/dashboard-create-website-modal.component';
import { BuilderActionsModule } from '../../builder/builder-actions/builder-actions.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardDeleteWebsiteModalComponent } from './dashboard-delete-website-modal/dashboard-delete-website-modal.component';
import { DashboardRenameWebsiteModalComponent } from './dashboard-rename-website-modal/dashboard-rename-website.modal.component';
import { FormUsernameInputModule } from '../../../shared/components/form-username-input/form-username-input.module';

@NgModule({
  declarations: [
    DashboardCreateWebsiteModalComponent,
    DashboardRenameWebsiteModalComponent,
    DashboardDeleteWebsiteModalComponent,
  ],
  imports: [BuilderActionsModule, FormsModule, CommonModule, FormUsernameInputModule],
  exports: [],
  entryComponents: [
    DashboardCreateWebsiteModalComponent,
    DashboardRenameWebsiteModalComponent,
    DashboardDeleteWebsiteModalComponent,
  ],
})
export class DashboardActionsModule {}
