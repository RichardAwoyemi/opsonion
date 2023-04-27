import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISectionElement } from '../builder-section';

@Component({
  selector: 'section-element-wrapper',
  templateUrl: './builder-section-element-wrapper.component.html',
})
export class BuilderSectionElementWrapperComponent {
  get element(): ISectionElement {
    return this._element;
  }

  @Input() set element(newVal: ISectionElement) {
    if (this._element !== newVal) {
      this._element = newVal;
    }
  }

  get isContentEditable(): boolean {
    return this._isContentEditable;
  }

  @Input() set isContentEditable(newVal: boolean) {
    if (this._isContentEditable !== newVal) {
      this._isContentEditable = newVal;
    }
  }

  @Input() activeElementIndex: number;
  @Input() collapseLayout: boolean;
  @Input() componentActive: boolean;
  @Input() componentIndex: number;
  @Input() elementClass: string;
  @Input() previewMode: boolean;
  @Input() websiteMode: boolean;
  @Input() showcaseDocument: Document;

  @Output() selectElement = new EventEmitter();
  @Output() deleteElement = new EventEmitter();
  @Output() elementDragStart = new EventEmitter();
  @Output() elementDragEnd = new EventEmitter();
  @Output() elementMouseMove = new EventEmitter();

  private active = false;
  private _element: ISectionElement;
  private _isContentEditable: boolean;

  select(e: Event): void {
    this.selectElement.emit({
      e: e,
      element: this.element,
      i: this.componentIndex,
      isContentEditable: true,
    });
  }

  dragStart(e: MouseEvent): void {
    if (!this.previewMode && !this.websiteMode) {
      const dragEnd = (event: MouseEvent | DragEvent) => {
        if (this.active) {
          event.stopPropagation();
          event.preventDefault();
          this.active = false;
          this.elementDragEnd.emit();
        }
        this.showcaseDocument.removeEventListener('mouseup', dragEnd, true);
        this.showcaseDocument.removeEventListener('dragEnd', dragEnd, true);
      };
      this.showcaseDocument.addEventListener('mouseup', dragEnd, true);
      this.showcaseDocument.addEventListener('dragEnd', dragEnd, true);
      this.active = true;
      this.elementDragStart.emit({
        e: e,
        element: this.element,
        i: this.componentIndex,
      });
    }
  }

  mouseMove(e: MouseEvent): void {
    this.elementMouseMove.emit(e);
  }

  remove(e: DragEvent): void {
    if (!this.previewMode && !this.websiteMode) {
      this.deleteElement.emit({
        e: e,
        elementId: this.element.elementId,
      });
    }
  }
}
