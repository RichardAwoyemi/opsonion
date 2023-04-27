import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IWebsite } from '../../../shared/models/website';
import { ActiveSettings, ActiveToolbar, ActiveElements } from '../builder';
import { IComponentMetadata } from '../builder-components/builder-components';
import { BuilderService } from '../builder.service';
import { TOOLBAR_CONFIGS, TOOLBAR_ELEMENTS } from './builder-toolbar';

@Component({
  selector: 'app-builder-toolbar',
  templateUrl: './builder-toolbar.component.html',
  styleUrls: ['./builder-toolbar.component.css'],
})
export class BuilderToolbarComponent implements OnChanges {
  @Input() activeComponentMetadata: IComponentMetadata;
  @Input() activeToolbarElement: string;
  @Input() website: IWebsite;
  @Input() activeFontName: string;
  @Input() activeSetting: ActiveSettings;

  ngUnsubscribe = new Subject<void>();
  toolbarClass: string;
  activeComponent: string;
  previewMode: boolean;
  activeToolbarElements: { left: unknown; right: unknown };

  constructor(private builderService: BuilderService) {
    this.builderService.previewMode.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      this.previewMode = response;
      if (response) {
        this.toolbarClass = 'toolbar-preview no-select';
      } else {
        this.toolbarClass = 'toolbar no-select';
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        if (prop === 'activeComponentMetadata') {
          let activeToolbar = '';
          if (change.currentValue) {
            activeToolbar =
              change.currentValue.activeElementType &&
              change.currentValue.activeElementType !== ActiveElements.Default
                ? change.currentValue.activeElementType
                : ActiveToolbar.ComponentMenu;
          }
          this.filterElements(activeToolbar);
        }
      }
    }
  }

  filterElements(activeToolbar: string): void {
    const chosenConfig =
      TOOLBAR_CONFIGS[activeToolbar] || TOOLBAR_CONFIGS[ActiveToolbar.Placeholder];
    this.activeToolbarElements = {
      left: TOOLBAR_ELEMENTS.filter((key) => chosenConfig.left.includes(key.elementOptions.name)),
      right: TOOLBAR_ELEMENTS.filter((key) => chosenConfig.right.includes(key.elementOptions.name)),
    };
  }

  togglePreview(): void {
    this.builderService.previewMode.next(!this.previewMode);
  }
}
