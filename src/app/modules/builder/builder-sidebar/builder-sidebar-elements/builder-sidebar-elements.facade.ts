import { Injectable } from '@angular/core';
import { BuilderSidebarSearchInputService } from '../builder-sidebar-search-input/builder-sidebar-search-input.service';
import { ISidebarSearchInputMessage } from '../builder-sidebar-search-input/builder-sidebar-search-input';
import { ActiveSettings } from '../../builder';
import { BuilderSidebarElementsService } from './builder-sidebar-elements.service';
import { IElement } from '../../../../shared/models/element';

@Injectable()
export class BuilderSidebarElementsFacade {
  constructor(private builderSidebarSearchInputService: BuilderSidebarSearchInputService) {}

  setSidebarSearchInputText(
    searchInputMessage: ISidebarSearchInputMessage,
    activeSetting: ActiveSettings
  ): string {
    return this.builderSidebarSearchInputService.setSidebarSearchInputText(
      searchInputMessage,
      activeSetting
    );
  }

  getElementsSearchResult(
    elementImageLibrary: IElement[],
    elementButtonLibrary: IElement[],
    searchText: string
  ): IElement[] {
    return BuilderSidebarElementsService.getElementsSearchResults(
      elementImageLibrary,
      elementButtonLibrary,
      searchText
    );
  }
}
