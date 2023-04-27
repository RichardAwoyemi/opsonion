import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounce } from '../../../shared/decorators/debounce.decorator';
import { IframeService } from '../../../shared/services/iframe.service';
import { BuilderService } from '../builder.service';
import { BuilderShowcaseLayoutComponent } from './builder-showcase-layout/builder-showcase-layout.component';

@Component({
  selector: 'app-builder-showcase',
  templateUrl: './builder-showcase.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./builder-showcase.component.css'],
})
export class BuilderShowcaseComponent implements AfterViewInit, OnChanges {
  @ViewChild('iframe', { static: false }) iframe: ElementRef;

  @Input() activeOrientation;
  @Input() innerHeight;
  @Input() showcaseHeight = 122;
  @Input() iframeHolderHeight = 184;
  @Input() iframeHeight = 180;
  @Input() fontUrl;
  @Input() previewButtonIcon;
  @Input() previewMode;
  @Input() fullScreenMode;
  @Input() fullScreenButtonIcon;
  @Input() activeToolbarOrientation;
  @Input() activePage;
  @Input() activePageIndex;
  @Input() activeComponentMetadata;
  @Input() websiteLoaded;
  @Input() website;
  @Input() activeToolbarElement;
  @Input() activeSetting;
  @Input() activeFontName;

  SHOWCASE_LAYOUT_PROPS = [
    'activeComponentMetadata',
    'websiteLoaded',
    'website',
    'activePage',
    'activePageIndex',
    'previewMode',
    'activeOrientation',
    'activeSetting',
  ];

  fontUrlList = [];
  document: Document;
  componentReference: ComponentRef<unknown>;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize(): void {
    IframeService.loadIframeStyle(this.document, this.fontUrl);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        if (prop === 'fontUrl') {
          if (change.currentValue) {
            this.fontUrlList.push(change.currentValue);
            IframeService.loadIframeStyle(this.document, change.currentValue);
          }
        }
        if (this.SHOWCASE_LAYOUT_PROPS.includes(prop) && this.componentReference) {
          this.componentReference.instance[prop] = change.currentValue;
        }
      }
    }
  }

  ngAfterViewInit(): void {
    this.document =
      this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    IframeService.loadIframeCss(this.document, 'assets/css/page.min.css');
    IframeService.loadIframeCss(this.document, 'assets/css/website.css');
    IframeService.loadIframeCss(this.document, 'assets/css/builder.css');
    IframeService.loadIframeCss(this.document, 'assets/css/fonts.css');
    IframeService.loadIframeCss(this.document, 'assets/css/animate.css');
    this.fontUrlList.forEach((url) => IframeService.loadIframeStyle(this.document, url));
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      BuilderShowcaseLayoutComponent
    );
    this.componentReference = this.viewContainerRef.createComponent(componentFactory);
    this.componentReference.changeDetectorRef.detectChanges();
    this.setComponentReferenceProps();
    this.document.body.appendChild(this.componentReference.location.nativeElement);
  }

  setComponentReferenceProps(): void {
    this.SHOWCASE_LAYOUT_PROPS.forEach(
      (prop) => (this.componentReference.instance[prop] = this[prop])
    );
  }

  clearActiveComponent(): void {
    this.builderService.clearActiveComponent();
  }
}
