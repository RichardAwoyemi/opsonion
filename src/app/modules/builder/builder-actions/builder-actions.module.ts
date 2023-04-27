import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderDeletePageModalComponent } from './builder-delete-page-modal/builder-delete-page-modal.component';
import { BuilderNewPageModalComponent } from './builder-new-page-modal/builder-new-page-modal.component';
import { BuilderComponentToolbarComponent } from './builder-component-toolbar/builder-component-toolbar.component';
import { BuilderDeleteComponentModalComponent } from './builder-delete-component-modal/builder-delete-component-modal.component';
import { BuilderChangeTemplateModalComponent } from './builder-change-template-modal/builder-change-template-modal.component';
import { FormsModule } from '@angular/forms';
import { SimpleModalModule } from '../../../shared/components/simple-modal/simple-modal.module';
import { BlockNonAlphabetCharactersDirective } from '../../../shared/directives/block-non-alphabet-characters.directive';
import { BuilderRenamePageModalComponent } from './builder-rename-page-modal/builder-rename-page-modal.component';
import { BuilderActionsService } from './builder-actions.service';
import { BuilderCreateAccountModalComponent } from './builder-create-account-modal/builder-create-account-modal.component';
import { BuilderSaveWebsiteModalComponent } from './builder-save-website-modal/builder-save-website-modal.component';
import { BuilderRenameWebsiteModalComponent } from './builder-rename-website-modal/builder-rename-website-modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { WebsiteService } from '../../../shared/services/website.service';
import { BuilderRegisterAccountModalComponent } from './builder-register-account-modal/builder-register-account-modal.component';
import { BuilderPublishWebsiteModalComponent } from './builder-publish-website-modal/builder-publish-website-modal.component';
import { BlacklistService } from '../../../shared/services/blacklist.service';

const COMPONENTS = [
  BuilderDeletePageModalComponent,
  BuilderNewPageModalComponent,
  BuilderDeleteComponentModalComponent,
  BuilderChangeTemplateModalComponent,
  BuilderComponentToolbarComponent,
  BuilderRenamePageModalComponent,
  BuilderCreateAccountModalComponent,
  BuilderSaveWebsiteModalComponent,
  BuilderRenameWebsiteModalComponent,
  BlockNonAlphabetCharactersDirective,
  BuilderRegisterAccountModalComponent,
  BuilderPublishWebsiteModalComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, FormsModule, SimpleModalModule, ImageCropperModule],
  exports: COMPONENTS,
  providers: [BuilderActionsService, BlacklistService, WebsiteService],
})
export class BuilderActionsModule {}
