import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IframeService } from '../../../../shared/services/iframe.service';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-text-editor',
  templateUrl: './builder-text-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderTextEditorComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() value: string;
  @Input() contenteditable = true;
  @ViewChild('editor', { static: false }) editor: ElementRef;
  @Output() valueChange = new EventEmitter();

  document: Document;
  previewMode: boolean;
  websiteMode: boolean;

  ngUnsubscribe = new Subject<void>();

  constructor(private builderService: BuilderService) {}

  ngOnInit(): void {
    this.builderService.previewMode.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      this.previewMode = response;
    });

    this.builderService.websiteMode.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      this.websiteMode = response;
    });
  }

  ngAfterViewInit(): void {
    if (!this.websiteMode || !this.previewMode) {
      this.document = IframeService.getIframeElement('builder-showcase');
      this.document.execCommand('styleWithCSS', false, null);
    }
    this.editor.nativeElement.innerHTML = this.value;
  }

  onInput(newValue: string): void {
    this.valueChange.emit(newValue);
  }

  setContentEditable(): boolean {
    return !this.previewMode && !this.websiteMode && this.contenteditable;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        switch (prop) {
          case 'editor': {
            if (change.currentValue.editor && change.currentValue.editor.nativeElement) {
              if (this.editor.nativeElement.innerHTML !== change.currentValue.value) {
                this.editor.nativeElement.innerHTML = change.currentValue.value;
              }
              break;
            }
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
