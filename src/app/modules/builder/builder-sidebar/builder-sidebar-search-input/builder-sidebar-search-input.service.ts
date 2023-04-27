import { ActiveSettings } from '../../builder';
import { Injectable } from '@angular/core';
import { ISidebarSearchInputMessage } from './builder-sidebar-search-input';

@Injectable()
export class BuilderSidebarSearchInputService {
  setSidebarSearchInputText(
    searchInputMessage: ISidebarSearchInputMessage,
    activeSetting: ActiveSettings
  ): string {
    if (searchInputMessage.recipient === activeSetting) {
      return searchInputMessage.message;
    }
  }
}
