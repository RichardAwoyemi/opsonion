import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BuilderComponent } from './builder.page';
import { BuilderService } from './builder.service';
import { BuilderHeaderComponent } from './builder-header/builder-header.component';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { BuilderComponentsModule } from './builder-components/builder-components.module';
import { TemplateService } from '../../shared/services/template.service';
import { BuilderActionsModule } from './builder-actions/builder-actions.module';
import { BuilderShowcaseModule } from './builder-showcase/builder-showcase.module';
import { BuilderSidebarModule } from './builder-sidebar/builder-sidebar.module';
import { ToastrModule } from 'ngx-toastr';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { FormUsernameInputModule } from '../../shared/components/form-username-input/form-username-input.module';
import { FontsService } from '../../shared/services/fonts.service';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { ExceptionService } from 'src/app/shared/services/exception.service';
import { PhotosService } from '../../shared/services/photos-service';
import { ImgurService } from '../../shared/services/imgur.service';

const routes: Routes = [{ path: '', component: BuilderComponent }];

@NgModule({
  declarations: [BuilderComponent, BuilderHeaderComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    BuilderComponentsModule,
    BuilderSidebarModule,
    BuilderShowcaseModule,
    BuilderActionsModule,
    ToastrModule.forRoot({
      maxOpened: 3,
      preventDuplicates: true,
      timeOut: 2000,
      closeButton: true,
      newestOnTop: true,
    }),
    NgbPopoverModule,
    FormUsernameInputModule,
  ],
  providers: [
    BuilderService,
    DataService,
    ImgurService,
    TemplateService,
    ThemeService,
    UploadService,
    FontsService,
    PhotosService,
    ExceptionService,
  ],
})
export class BuilderModule {}
