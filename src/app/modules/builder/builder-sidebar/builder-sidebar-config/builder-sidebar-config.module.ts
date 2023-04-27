import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'ngx-sortablejs';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ArraySortModule } from 'src/app/shared/pipes/array-sort/array-sort.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { BuilderSidebarConfigComponent } from './builder-sidebar-config.component';
import { BuilderSidebarConfigDirective } from './builder-sidebar-config.directive';
import { BuilderSidebarConfigService } from './builder-sidebar-config.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReplacePipe } from '../../../../shared/pipes/replace.pipe';

@NgModule({
  declarations: [BuilderSidebarConfigDirective, BuilderSidebarConfigComponent, ReplacePipe],
  imports: [
    CommonModule,
    SortablejsModule,
    ImageCropperModule,
    FormsModule,
    ArraySortModule,
    NgbDropdownModule,
    NgxSliderModule,
    FontAwesomeModule,
    ScrollingModule,
  ],
  providers: [BuilderSidebarConfigService],
  exports: [BuilderSidebarConfigComponent, ReplacePipe],
})
export class BuilderSidebarConfigModule {}
