import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilService } from 'src/app/shared/services/util.service';
import { IComponentMetadata } from '../../builder-components';
import { ISectionElement } from '../builder-section';
import { IHandle } from './builder-section-element-resize';
import { BuilderResizeElementService } from './builder-section-element-resize.service';

@Component({
  selector: 'section-element-resize',
  templateUrl: './builder-section-element-resize.component.html',
})
export class BuilderSectionElementResizeComponent implements OnInit {
  private static handleSettings = {
    right: {
      position: 'right',
      axis: 'x',
      dimension: 'width',
      eventProperty: 'clientX',
      translate: false,
      deltaMultiplier: 1,
    },
    left: {
      position: 'left',
      axis: 'x',
      dimension: 'width',
      eventProperty: 'clientX',
      translate: true,
      deltaMultiplier: -1,
    },
    bottom: {
      position: 'bottom',
      axis: 'y',
      dimension: 'height',
      eventProperty: 'clientY',
      translate: false,
      deltaMultiplier: 1,
    },
    top: {
      position: 'top',
      axis: 'y',
      dimension: 'height',
      eventProperty: 'clientY',
      translate: true,
      deltaMultiplier: -1,
    },
  };

  @Input() componentMetadata: IComponentMetadata;
  @Input() activeAction: string;
  @Input() showcaseDocument: Document;
  @Input() activeElement: ISectionElement;
  @Input() collapseLayout: boolean;

  @Output() align = new EventEmitter();
  @Output() dragEnd = new EventEmitter();
  @Output() resize = new EventEmitter();
  @Output() startResize = new EventEmitter();
  @Output() elementChange = new EventEmitter();

  cornerDragSettings = [
    { position: ['top', 'left'], class: 'resize-corner-crop-container resize-corner-top-left' },
    { position: ['top', 'right'], class: 'resize-corner-crop-container resize-corner-top-right' },
    {
      position: ['bottom', 'left'],
      class: 'resize-corner-crop-container resize-corner-bottom-left',
    },
    {
      position: ['bottom', 'right'],
      class: 'resize-corner-crop-container resize-corner-bottom-right',
    },
  ];
  sideDragSettings = [
    {
      position: ['top'],
      outerClass: 'resize-crop-container-y resize-top-container-size',
      innerClass: 'resize-crop-handle-y',
    },
    {
      position: ['bottom'],
      outerClass: 'resize-crop-container-y resize-bottom-container-size',
      innerClass: 'resize-crop-handle-y',
    },
    {
      position: ['left'],
      outerClass: 'resize-crop-container-x resize-left-container-size',
      innerClass: 'resize-crop-handle-x',
    },
    {
      position: ['right'],
      outerClass: 'resize-crop-container-x resize-right-container-size',
      innerClass: 'resize-crop-handle-x',
    },
  ];

  activeCords: number[];
  active = false;
  showcaseDimensions: number = null;
  private dragImage = document.createElement('img');
  private initialResizeHandleCords: { x: number; y: number };
  private initialResizeItemCords: DOMRect;
  private initialActiveElement: ISectionElement;
  private activeHandleSettings: IHandle;

  constructor(private resizeService: BuilderResizeElementService) {}

  ngOnInit(): void {
    this.dragImage.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }

  setShowcaseDimensions(): void {
    this.showcaseDimensions = this.showcaseDocument.body.clientWidth;
  }

  startResizeElement(e: DragEvent, positions: string[]): void {
    this.initialActiveElement = UtilService.shallowClone(this.activeElement);
    this.setShowcaseDimensions();
    e.dataTransfer.setDragImage(this.dragImage, 0, 0);
    this.initialResizeItemCords = e.currentTarget['parentElement']['getBoundingClientRect']();
    this.initialResizeHandleCords = { x: e.clientX, y: e.clientY };
    this.activeHandleSettings = { x: null, y: null, settings: [] };
    positions.forEach((position) => {
      if (position === 'left' || position === 'right') {
        this.activeHandleSettings.x = position;
      } else {
        this.activeHandleSettings.y = position;
      }
      this.activeHandleSettings.settings.push(
        BuilderSectionElementResizeComponent.handleSettings[position]
      );
    });
    this.setActiveCords();
    this.active = true;
    this.startResize.emit({
      handle: this.activeHandleSettings,
      initalElement: this.initialActiveElement,
      handleCords: this.initialResizeHandleCords,
      itemCords: this.initialResizeItemCords,
      activeCords: this.activeCords,
    });
    this.setupDragEnd();
  }

  resizeElement(e: MouseEvent): void {
    if (this.active && this.activeAction === 'resizeElement') {
      this.resize.emit();
      const element = this.resizeService.resizeElement(
        e,
        this.activeElement,
        this.initialActiveElement,
        this.initialResizeHandleCords,
        this.initialResizeItemCords,
        this.activeHandleSettings.settings,
        this.showcaseDimensions
      );
      this.elementChange.emit(element);
      this.align.emit(this.activeCords);
    }
  }

  setupDragEnd(): void {
    const dragEnd = (e: MouseEvent | DragEvent) => {
      e.stopPropagation();
      this.activeHandleSettings = { x: null, y: null, settings: [] };
      this.dragEnd.emit(true);
      this.active = false;
      this.showcaseDocument.removeEventListener('mouseup', dragEnd, true);
      this.showcaseDocument.removeEventListener('dragEnd', dragEnd, true);
    };
    this.showcaseDocument.addEventListener('mouseup', dragEnd, true);
    this.showcaseDocument.addEventListener('dragEnd', dragEnd, true);
  }

  setActiveCords(): void {
    let pointOne = false;
    let pointTwo = false;
    this.activeHandleSettings.settings.forEach((setting) => {
      if (['top', 'left'].includes(setting.position)) {
        pointOne = true;
      } else {
        pointTwo = true;
      }
    });
    this.activeCords = [];
    if (pointOne) {
      this.activeCords.push(0);
    }
    if (pointTwo) {
      this.activeCords.push(2);
    }
    this.activeCords.push(1);
  }
}
