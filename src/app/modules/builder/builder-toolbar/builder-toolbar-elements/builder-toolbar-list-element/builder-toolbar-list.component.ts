import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BuilderToolbarElementService } from '../builder-toolbar-element.service';
import { IframeService } from '../../../../../shared/services/iframe.service';
import { BuilderService } from '../../../builder.service';
import { IElementSettings } from '../../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';

@Component({
  selector: 'app-builder-toolbar-list-text',
  templateUrl: './builder-toolbar-list.component.html',
  styleUrls: ['../../builder-toolbar.component.css'],
})
export class BuilderToolbarListComponent implements OnInit, OnDestroy {
  @Input() settings: IElementSettings;

  document: Document;
  listState: string;
  ngUnsubscribe = new Subject<void>();
  activeElement: string;
  activeComponentId: string;

  constructor(
    private builderToolbarElementService: BuilderToolbarElementService,
    private builderService: BuilderService
  ) {}

  ngOnInit(): void {
    this.document = IframeService.getIframeElement('builder-showcase');

    this.builderToolbarElementService.listState
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.listState = response;
      });

    this.builderService.activeComponentMetadata
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response && this.activeElement !== response.activeElementId) {
          this.activeElement = response.activeElementId;
          this.builderToolbarElementService.toggleListCommandToolbarStatus(this.document);
        } else {
          this.activeElement = null;
        }
      });
  }

  onButtonClick(commandName: string): void {
    this.builderToolbarElementService.activeToolbarElement.next('list');
    this.builderToolbarElementService.applyFormatting(this.settings, commandName, this.document);
  }

  getToolbarButtonCommandState(commandName: string): string {
    return this.builderToolbarElementService.setFormatButtonClass(commandName, this.document);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
