import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarElementsComponent } from './builder-sidebar-elements.component';
import { BuilderSidebarElementsListComponent } from './builder-sidebar-elements-list/builder-sidebar-elements-list.component';
import { BuilderSidebarElementsGroupsComponent } from './builder-sidebar-elements-groups/builder-sidebar-elements-groups.component';
import { BuilderSidebarWrapperModule } from '../builder-sidebar-wrapper/builder-sidebar-wrapper.module';
import { BuilderSidebarSearchInputModule } from '../builder-sidebar-search-input/builder-sidebar-search-input.module';
import { BuilderSidebarElementsGroupComponent } from './builder-sidebar-elements-groups/builder-sidebar-elements-group/builder-sidebar-elements-group.component';
import { BuilderSidebarElementsFacade } from './builder-sidebar-elements.facade';
import { BuilderSidebarElementsListFacade } from './builder-sidebar-elements-list/builder-sidebar-elements-list.facade';
import { BuilderSidebarElementsGroupsFacade } from './builder-sidebar-elements-groups/builder-sidebar-elements-groups.facade';

const COMPONENTS = [
  BuilderSidebarElementsComponent,
  BuilderSidebarElementsListComponent,
  BuilderSidebarElementsGroupComponent,
  BuilderSidebarElementsGroupsComponent,
];

const PROVIDERS = [
  BuilderSidebarElementsFacade,
  BuilderSidebarElementsGroupsFacade,
  BuilderSidebarElementsListFacade,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, BuilderSidebarWrapperModule, BuilderSidebarSearchInputModule],
  exports: [...COMPONENTS],
  providers: [...PROVIDERS],
})
export class BuilderSidebarElementsModule {}
