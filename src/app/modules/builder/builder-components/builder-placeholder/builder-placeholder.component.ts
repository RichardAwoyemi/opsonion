import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HTMLInputEvent } from '../../../../shared/models/html-input-event';
import { ActiveComponents, ActiveDragType } from '../../builder';
import { BuilderService } from '../../builder.service';
import { IDragData } from '../builder-components';
import { BuilderComponentsService } from '../builder-components.service';

@Component({
  selector: 'app-builder-placeholder',
  templateUrl: './builder-placeholder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderPlaceholderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() componentId: string;
  @Input() index: number;
  @Input() activeDragData: IDragData;

  componentName: string = ActiveComponents.Placeholder;
  previewMode = false;
  ngUnsubscribe = new Subject<void>();
  triggerDragClass: boolean;

  constructor(
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService
  ) {}

  ngOnInit(): void {
    this.builderService.previewMode.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      this.previewMode = response;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        switch (prop) {
          case 'activeDragData': {
            this.triggerDragClass =
              change.currentValue &&
              change.currentValue.type &&
              change.currentValue.type === ActiveDragType.Component;
          }
        }
      }
    }
  }

  onDragOver(e: Event): void {
    if (this.triggerDragClass) {
      (e as HTMLInputEvent).target.className = 'drop-box-active';
    }
  }

  onDragLeave(e: Event): void {
    if (this.triggerDragClass) {
      (e as HTMLInputEvent).target.className = 'drop-box';
    }
  }

  onDragExit(e: Event): void {
    if (this.triggerDragClass) {
      (e as HTMLInputEvent).target.className = 'drop-box';
    }
  }

  onDropEvent(e: Event): void {
    if (this.triggerDragClass) {
      (e as HTMLInputEvent).target.className = 'drop-box';
      const component = this.activeDragData.component;
      component.componentIndex = this.index;
      this.builderComponentsService.addComponent(component);
      this.builderService.activeDragData.next(null);
    }
  }

  clearActiveComponent(): void {
    this.builderService.clearActiveComponent();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
