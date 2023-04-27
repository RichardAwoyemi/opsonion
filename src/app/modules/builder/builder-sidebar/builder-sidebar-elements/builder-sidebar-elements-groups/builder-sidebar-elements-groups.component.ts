import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISidebarSearchInputMessage } from '../../builder-sidebar-search-input/builder-sidebar-search-input';
import { ELEMENT_CATEGORIES, IElement } from 'src/app/shared/models/element';
import { IComponentMetadata } from '../../../builder-components/builder-components';
import { BuilderSidebarElementsGroupsFacade } from './builder-sidebar-elements-groups.facade';

@Component({
  selector: 'app-builder-sidebar-elements-groups',
  templateUrl: './builder-sidebar-elements-groups.component.html',
})
export class BuilderSidebarElementsGroupsComponent {
  @Input() elementImageLibrary;
  @Input() elementButtonLibrary;
  @Input() activeComponentMetadata: IComponentMetadata;
  @Output() onSearchTextChange = new EventEmitter();

  ELEMENT_CATEGORIES = ELEMENT_CATEGORIES;

  constructor(private builderSidebarElementsGroupsFacade: BuilderSidebarElementsGroupsFacade) {}

  emitSearchTextChange(payload: ISidebarSearchInputMessage): void {
    this.onSearchTextChange.emit(payload);
  }

  getElementGroupItems(elementLibraryCategory: string): IElement[] {
    return this.builderSidebarElementsGroupsFacade.getElementGroupItems(
      this.elementImageLibrary,
      this.elementButtonLibrary,
      elementLibraryCategory
    );
  }

  getElementGroupItemsCount(elementLibraryCategory: string): number {
    return this.builderSidebarElementsGroupsFacade.getElementGroupItemsCount(
      this.elementImageLibrary,
      this.elementButtonLibrary,
      elementLibraryCategory
    );
  }
}
