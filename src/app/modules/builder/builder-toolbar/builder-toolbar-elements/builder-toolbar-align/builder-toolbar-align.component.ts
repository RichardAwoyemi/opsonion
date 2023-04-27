import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IframeService } from '../../../../../shared/services/iframe.service';
import { IElementSettings } from '../../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-builder-toolbar-align-text',
  templateUrl: './builder-toolbar-align.component.html',
  styleUrls: ['../../builder-toolbar.component.css'],
})
export class BuilderToolbarAlignComponent implements OnInit, OnDestroy {
  @Input() settings: IElementSettings;

  document: Document;
  ngUnsubscribe = new Subject<void>();
  activeElement: string;
  activeComponentId: string;
  activeAlignment: string;

  constructor(private builderService: BuilderService) {}

  ngOnInit(): void {
    this.document = IframeService.getIframeElement('builder-showcase');
    this.builderService.activeComponentMetadata
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response && this.activeElement !== response.activeElementId) {
          this.activeElement = response.activeElementId;
          this.setAlignment();
        } else {
          this.activeElement = null;
        }
      });
  }

  setAlignment(): void {
    const commands = ['justifyFull', 'justifyLeft', 'justifyCenter', 'justifyRight'];
    for (let i = 0; i < 4; i++) {
      if (this.document.queryCommandState(commands[i])) {
        this.activeAlignment = commands[i];
        return;
      }
    }
    const defaultAlignment = 'justifyLeft';
    this.activeAlignment = defaultAlignment;
  }

  onButtonClick(commandName: string): void {
    switch (commandName) {
      case 'justifyFull':
        this.document.execCommand('justifyLeft', false);
        this.activeAlignment = 'justifyLeft';
        break;
      case 'justifyLeft':
        this.document.execCommand('justifyCenter', false);
        this.activeAlignment = 'justifyCenter';
        break;
      case 'justifyCenter':
        this.document.execCommand('justifyRight', false);
        this.activeAlignment = 'justifyRight';
        break;
      case 'justifyRight':
        this.document.execCommand('justifyFull', false);
        this.activeAlignment = 'justifyFull';
        break;
      default:
        break;
    }
  }

  isActive(commandName: string): boolean {
    return this.document.queryCommandState(commandName);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
