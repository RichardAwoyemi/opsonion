import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActiveElements, ActiveSettings } from '../../../builder';
import { BuilderService } from '../../../builder.service';
import { IComponent, IComponentMetadata, IStyle } from '../../builder-components';
import { BuilderComponentsService } from '../../builder-components.service';

@Component({
  selector: 'section-wrapper',
  templateUrl: './builder-section-wrapper.component.html',
})
export class BuilderSectionWrapperComponent implements OnInit, OnDestroy {
  @Input() componentMetadata: IComponentMetadata;
  @Input() activeComponentMetadata: IComponentMetadata;
  @Input() innerStyle: IStyle;
  @Input() outerStyle: IStyle;
  @Input() innerClass: string;
  @Input() cyTag: string;
  @Input() previewMode: boolean;
  @Input() websiteMode: boolean;
  @Input() componentActive: boolean;
  @Input() component: IComponent;
  @Input() activeSetting: ActiveSettings;
  @Input() showcaseDocument: Document;

  @Output() clearSettings = new EventEmitter();

  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService
  ) {}

  ngOnInit(): void {
    this.builderComponentsService.website
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response && this.componentActive) {
          this.builderService.activeComponentMetadata.next(this.componentMetadata);
        }
      });
  }

  clearActiveComponent(): void {
    if (this.componentMetadata) {
      this.builderService.clearActiveComponent();
      this.clearSettings.emit();
    }
  }

  setComponentClass(): string {
    if (this.componentMetadata) {
      return BuilderService.setComponentClass(
        this.previewMode,
        this.activeComponentMetadata,
        this.componentMetadata,
        this.componentActive
      );
    }
  }

  setContextMenu(): string {
    if (this.componentMetadata) {
      return BuilderService.setContextMenu(
        this.previewMode,
        this.activeComponentMetadata,
        this.componentMetadata
      );
    }
  }

  onMouseDown(): void {
    let moving = false;
    let counter = 10;

    const isMoving = () => {
      counter--;
      if (counter < 0) {
        moving = true;
      }
    };

    const setActiveComponent = () => {
      if (this.componentMetadata && !moving) {
        this.componentMetadata.activeElementId = ActiveElements.Default;
        this.componentMetadata.activeElementType = ActiveElements.Default;
        this.componentMetadata.activeElement = null;
        this.componentMetadata.activeElementIndex = null;
        this.builderService.activeComponentMetadata.next(this.componentMetadata);
        this.clearSettings.emit();
      }
      this.showcaseDocument
        .getElementById(this.component.componentId)
        .removeEventListener('mouseup', setActiveComponent, true);
      this.showcaseDocument
        .getElementById(this.component.componentId)
        .removeEventListener('mousemove', isMoving, true);
    };

    this.showcaseDocument
      .getElementById(this.component.componentId)
      .addEventListener('mouseup', setActiveComponent, true);
    this.showcaseDocument
      .getElementById(this.component.componentId)
      .addEventListener('mousemove', isMoving, true);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
