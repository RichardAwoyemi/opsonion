import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ElementLibraryService } from 'src/app/shared/services/element-library.service';
import { ArraySortModule } from '../../../shared/pipes/array-sort/array-sort.module';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { UnsplashService } from '../../../shared/services/unsplash.service';
import { BuilderSidebarFontComponent } from './builder-sidebar-font/builder-sidebar-font.component';
import { BuilderSidebarTemplatesComponent } from './builder-sidebar-templates/builder-sidebar-templates.component';
import { BuilderSidebarComponent } from './builder-sidebar.component';
import { BuilderSidebarUploadsComponent } from './builder-sidebar-uploads/builder-sidebar-uploads.component';
import { BuilderSidebarAdjustComponent } from './builder-sidebar-adjust/builder-sidebar-adjust.component';
import { CarouselModule } from '../../../shared/components/carousel/carousel.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BuilderSidebarMenuModule } from './builder-sidebar-menu/builder-sidebar-menu.module';
import { BuilderSidebarContainerComponent } from './builder-sidebar-container/builder-sidebar-container.component';
import { BuilderSidebarColourComponent } from './builder-sidebar-colour/builder-sidebar-colour.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { BuilderSidebarElementsModule } from './builder-sidebar-elements/builder-sidebar-elements.module';
import { BuilderSidebarWrapperModule } from './builder-sidebar-wrapper/builder-sidebar-wrapper.module';
import { BuilderSidebarSearchInputModule } from './builder-sidebar-search-input/builder-sidebar-search-input.module';
import { BuilderSidebarConfigModule } from './builder-sidebar-config/builder-sidebar-config.module';
import { BuilderSidebarPhotosModule } from './builder-sidebar-photos/builder-sidebar-photos.module';
import { BuilderSidebarTextModule } from './builder-sidebar-text/builder-sidebar-text.module';
import { BuilderSidebarToggleComponent } from './builder-sidebar-toggle/builder-sidebar-toggle.component';
import { BuilderSidebarAnimateComponent } from './builder-sidebar-animate/builder-sidebar-animate.component';

@NgModule({
  declarations: [
    BuilderSidebarAdjustComponent,
    BuilderSidebarComponent,
    BuilderSidebarColourComponent,
    BuilderSidebarFontComponent,
    BuilderSidebarTemplatesComponent,
    BuilderSidebarUploadsComponent,
    FilterPipe,
    BuilderSidebarContainerComponent,
    BuilderSidebarToggleComponent,
    BuilderSidebarAnimateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ArraySortModule,
    ScrollingModule,
    CarouselModule,
    InfiniteScrollModule,
    ColorPickerModule,
    BuilderSidebarWrapperModule,
    BuilderSidebarMenuModule,
    BuilderSidebarElementsModule,
    BuilderSidebarPhotosModule,
    BuilderSidebarTextModule,
    BuilderSidebarSearchInputModule,
    BuilderSidebarConfigModule,
  ],
  exports: [BuilderSidebarComponent, BuilderSidebarToggleComponent, FilterPipe],
  providers: [UnsplashService, ElementLibraryService],
})
export class BuilderSidebarModule {}
