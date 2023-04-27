import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IElement } from '../../../../../../shared/models/element';
import { IComponentMetadata } from '../../../../builder-components/builder-components';
import { ISidebarSearchInputMessage } from '../../../builder-sidebar-search-input/builder-sidebar-search-input';
import { ActiveSettings } from '../../../../builder';
import { BuilderSidebarElementsListFacade } from '../../builder-sidebar-elements-list/builder-sidebar-elements-list.facade';

@Component({
  selector: 'app-builder-sidebar-elements-group',
  templateUrl: './builder-sidebar-elements-group.component.html',
  styleUrls: ['./builder-sidebar-elements-group.component.css'],
})
export class BuilderSidebarElementsGroupComponent {
  @Input() elementsGroupTitle: string;
  @Input() elementsGroupItems: IElement[];
  @Input() elementsGroupItemsCount: number;
  @Input() activeComponentMetadata: IComponentMetadata;
  @Output() onSearchTextChange = new EventEmitter();

  ELEMENTS_GROUP_PREVIEW_SPAN = 7;
  elementsGroupPreviewLowerBand = 0;
  elementsGroupPreviewUpperBand = 6;

  constructor(private builderSidebarElementsListFacade: BuilderSidebarElementsListFacade) {}

  ngOnInit(): void {
    this.setRandomElementsGroupPreviewItems();
  }

  trackByIdx(i: number): number {
    return i;
  }

  onDrag(dragEvent: DragEvent, elementItem: IElement): void {
    this.builderSidebarElementsListFacade.onDrag(dragEvent, elementItem);
  }

  onDragStart(dragEvent: DragEvent, elementItem: IElement): void {
    this.builderSidebarElementsListFacade.onDragStart(dragEvent, elementItem);
  }

  onDragEnd(dragEvent: DragEvent, elementItem: IElement): void {
    this.builderSidebarElementsListFacade.onDragEnd(dragEvent, elementItem);
  }

  addElement(elementItem: IElement): void {
    this.builderSidebarElementsListFacade.addElement(elementItem, this.activeComponentMetadata);
  }

  setRandomElementsGroupPreviewItems(): void {
    this.elementsGroupPreviewLowerBand = this.setElementsGroupPreviewLowerBand();
    this.elementsGroupPreviewUpperBand = this.setElementsGroupPreviewUpperBand();
  }

  setElementsGroupPreviewLowerBand(): number {
    return Math.floor(
      Math.random() * (this.elementsGroupItemsCount - this.ELEMENTS_GROUP_PREVIEW_SPAN)
    );
  }

  setElementsGroupPreviewUpperBand(): number {
    return this.elementsGroupPreviewLowerBand + this.ELEMENTS_GROUP_PREVIEW_SPAN - 1;
  }

  emitSearchTextChange(searchText: string): void {
    const payload: ISidebarSearchInputMessage = {
      message: searchText,
      recipient: ActiveSettings.Elements,
    };
    this.onSearchTextChange.emit(payload);
  }
}
