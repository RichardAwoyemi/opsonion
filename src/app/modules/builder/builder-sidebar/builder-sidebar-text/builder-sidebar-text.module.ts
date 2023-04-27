import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarTextComponent } from './builder-sidebar-text.component';
import { BuilderSidebarTextListComponent } from './builder-sidebar-text-list/builder-sidebar-text-list.component';
import { BuilderSidebarDefaultTextListComponent } from './builder-sidebar-text-list/builder-sidebar-default-text-list/builder-sidebar-default-text-list.component';
import { BuilderSidebarSkeletonTextListComponent } from './builder-sidebar-text-list/builder-sidebar-skeleton-text-list/builder-sidebar-skeleton-text-list.component';
import { BuilderSidebarTextService } from './builder-sidebar-text.service';
import { BuilderSidebarWrapperModule } from '../builder-sidebar-wrapper/builder-sidebar-wrapper.module';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html.pipe';
import { BuilderSidebarSearchInputModule } from '../builder-sidebar-search-input/builder-sidebar-search-input.module';

const COMPONENTS = [
  BuilderSidebarTextComponent,
  BuilderSidebarTextListComponent,
  BuilderSidebarDefaultTextListComponent,
  BuilderSidebarSkeletonTextListComponent,
  SafeHtmlPipe,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    BuilderSidebarWrapperModule,
    FormsModule,
    InfiniteScrollModule,
    BuilderSidebarSearchInputModule,
  ],
  providers: [BuilderSidebarTextService],
  exports: [...COMPONENTS],
})
export class BuilderSidebarTextModule {}
