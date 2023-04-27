import { Component, Input } from '@angular/core';
import { IElement } from '../../../../../shared/models/element';
import { IComponentMetadata } from '../../../builder-components/builder-components';
import { BuilderSidebarElementsListFacade } from './builder-sidebar-elements-list.facade';

@Component({
  selector: 'app-builder-sidebar-elements-list',
  templateUrl: './builder-sidebar-elements-list.component.html',
  styleUrls: ['./builder-sidebar-elements-list.component.css'],
})
export class BuilderSidebarElementsListComponent {
  @Input() elementsSearchResult: IElement[];
  @Input() activeComponentMetadata: IComponentMetadata;

  constructor(private builderSidebarElementsListFacade: BuilderSidebarElementsListFacade) {}

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
}
