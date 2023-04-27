import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarPhotosListComponent } from './builder-sidebar-photos-list/builder-sidebar-photos-list.component';
import { BuilderSidebarSkeletonPhotosListComponent } from './builder-sidebar-photos-list/builder-sidebar-skeleton-photos-list/builder-sidebar-skeleton-photos-list.component';
import { BuilderSidebarPhotosCategoriesComponent } from './builder-sidebar-photos-categories/builder-sidebar-photos-categories.component';
import { BuilderSidebarSkeletonPhotosCategoriesComponent } from './builder-sidebar-photos-categories/builder-sidebar-skeleton-photos-categories/builder-sidebar-skeleton-photos-categories.component';
import { BuilderSidebarPhotosComponent } from './builder-sidebar-photos.component';
import { BuilderSidebarWrapperModule } from '../builder-sidebar-wrapper/builder-sidebar-wrapper.module';
import { BuilderSidebarSearchInputModule } from '../builder-sidebar-search-input/builder-sidebar-search-input.module';
import { CarouselModule } from '../../../../shared/components/carousel/carousel.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
  BuilderSidebarPhotosComponent,
  BuilderSidebarPhotosListComponent,
  BuilderSidebarSkeletonPhotosListComponent,
  BuilderSidebarPhotosCategoriesComponent,
  BuilderSidebarSkeletonPhotosCategoriesComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    CarouselModule,
    BuilderSidebarWrapperModule,
    BuilderSidebarSearchInputModule,
    InfiniteScrollModule,
    FormsModule,
  ],
  exports: [...COMPONENTS],
})
export class BuilderSidebarPhotosModule {}
