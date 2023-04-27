import { NgModule } from '@angular/core';
import { DashboardBodyRewardsComponent } from './dashboard-body-rewards/dashboard-body-rewards.component';
import { DashboardBodySettingsComponent } from './dashboard-body-settings/dashboard-body-settings.component';
import { DashboardBodyComponent } from './dashboard-body.component';
import { DashboardBodyWebsitesComponent } from './dashboard-body-websites/dashboard-body-websites.component';
import { DashboardBodyTemplatesComponent } from './dashboard-body-templates/dashboard-body-templates.component';
import { CommonModule } from '@angular/common';
import { SettingsBillingComponent } from './dashboard-body-settings/settings-billing/settings-billing.component';
import { SettingsProfileComponent } from './dashboard-body-settings/settings-profile/settings-profile.component';
import { FormChangePasswordComponent } from '../../../shared/components/form-change-password/form-change-password.component';
import { FormPhotoUploadModule } from '../../../shared/components/form-photo-upload/form-photo-upload.module';
import { FormUsernameInputModule } from '../../../shared/components/form-username-input/form-username-input.module';
import { FormNameInputModule } from '../../../shared/components/form-name-input/form-name-input.module';
import { FormDobInputModule } from '../../../shared/components/form-dob-input/form-dob-input.module';
import { FormAddressInputModule } from '../../../shared/components/form-address-input/form-address-input.module';
import { BrowserMockupModule } from '../../../shared/components/browser-mockup/browser-mockup.module';
import { ArraySortModule } from '../../../shared/pipes/array-sort/array-sort.module';
import { FormsModule } from '@angular/forms';
import { BuilderSidebarModule } from '../../builder/builder-sidebar/builder-sidebar.module';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CropImageModalComponent } from '../../../shared/components/form-photo-upload/crop-image-modal/crop-image-modal.component';
import { CreditsService } from '../../../shared/services/credits.service';

@NgModule({
  declarations: [
    DashboardBodySettingsComponent,
    SettingsBillingComponent,
    SettingsProfileComponent,
    FormChangePasswordComponent,
    DashboardBodyWebsitesComponent,
    DashboardBodyRewardsComponent,
    DashboardBodyTemplatesComponent,
    DashboardBodyComponent,
  ],
  imports: [
    CommonModule,
    FormPhotoUploadModule,
    FormUsernameInputModule,
    FormNameInputModule,
    FormDobInputModule,
    FormAddressInputModule,
    BrowserMockupModule,
    ArraySortModule,
    FormsModule,
    BuilderSidebarModule,
    RouterModule,
    NgbDropdownModule,
  ],
  exports: [
    DashboardBodySettingsComponent,
    DashboardBodyWebsitesComponent,
    DashboardBodyRewardsComponent,
    DashboardBodyTemplatesComponent,
    DashboardBodyComponent,
    SettingsProfileComponent,
    SettingsBillingComponent,
  ],
  entryComponents: [CropImageModalComponent],
  providers: [CreditsService],
})
export class DashboardBodyModule {}
