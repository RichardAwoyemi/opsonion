import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Options } from 'sortablejs';
import { IframeService } from 'src/app/shared/services/iframe.service';
import { IWebsite } from '../../../../shared/models/website';
import {
  ActiveComponentsPartialSelector,
  ActiveDragType,
  ActiveSettings,
  ActiveElements,
} from '../../builder';
import { BuilderDeleteComponentModalComponent } from '../../builder-actions/builder-delete-component-modal/builder-delete-component-modal.component';
import {
  IComponent,
  IComponentEventMessage,
  IComponentMetadata,
  IDragData,
} from '../../builder-components/builder-components';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-showcase-layout',
  templateUrl: './builder-showcase-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderShowcaseLayoutComponent implements OnInit, OnDestroy {
  @Input() websiteLoaded = false;
  @Input() activeComponentMetadata: IComponentMetadata;
  get website(): IWebsite {
    return this._website;
  }

  @Input() set website(newVal: IWebsite) {
    if (this._website === newVal) {
      return;
    }
    this._website = newVal;
    this.ref.detectChanges();
  }

  get activeOrientation(): string {
    return this._activeOrientation;
  }

  @Input() set activeOrientation(newVal: string) {
    if (this._activeOrientation === newVal) {
      return;
    }
    this._activeOrientation = newVal;
    this.ref.detectChanges();
  }

  get activePage(): string {
    return this._activePage;
  }

  @Input() set activePage(newVal: string) {
    if (this._activePage === newVal) {
      return;
    }
    this._activePage = newVal;
    this.ref.detectChanges();
  }

  get activePageIndex(): number {
    return this._activePageIndex;
  }

  @Input() set activePageIndex(newVal: number) {
    if (this._activePageIndex === newVal) {
      return;
    }
    this._activePageIndex = newVal;
    this.ref.detectChanges();
  }

  get previewMode(): boolean {
    return this._previewMode;
  }

  @Input() set previewMode(newVal: boolean) {
    if (this._previewMode === newVal) {
      return;
    }
    this._previewMode = newVal;
    this.ref.detectChanges();
  }

  get activeSetting(): ActiveSettings {
    return this._activeSetting;
  }

  @Input() set activeSetting(newVal: ActiveSettings) {
    if (this._activeSetting === newVal) {
      return;
    }
    this._activeSetting = newVal;
    this.ref.detectChanges();
  }

  options: Options;
  activeScreenSize: string;
  websiteMode: boolean;
  activeDragData: IDragData;
  showcaseDocument: Document = IframeService.getIframeElement('builder-showcase');

  ngUnsubscribe = new Subject<void>();

  private _website: IWebsite;
  private _activeOrientation: string;
  private _activePage: string;
  private _activePageIndex: number;
  private _activeSetting: ActiveSettings;
  private _previewMode: boolean;

  constructor(
    private builderComponentsService: BuilderComponentsService,
    private modalService: NgbModal,
    private builderService: BuilderService,
    private ref: ChangeDetectorRef
  ) {
    this.options = {
      onUpdate: function (e: Event) {
        const tempUnorderedComponentsArrayWithoutPlaceholders = BuilderComponentsService.getUnorderedComponentsArrayWithoutPlaceholders(
          e
        );
        const tempOrderedComponentsArrayWithPlaceholders = BuilderComponentsService.getOrderedComponentsArrayWithPlaceholders(
          tempUnorderedComponentsArrayWithoutPlaceholders
        );
        window.postMessage(
          {
            for: 'opsonion',
            action: 'recycle-showcase',
            data: tempOrderedComponentsArrayWithPlaceholders,
          },
          '*'
        );
      },
    };
  }

  @HostListener('window:message', ['$event'])
  onMessage(e: MessageEvent): void {
    if (e.data.for === 'opsonion') {
      switch (e.data.action) {
        case IComponentEventMessage.RecycleShowcase:
          this.recycleShowcase(e.data.data);
          break;
      }
    }
  }

  ngOnInit(): void {
    this.builderService.activeDragData
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => (this.activeDragData = response));

    this.builderService.websiteMode
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => (this.websiteMode = response));

    this.builderService.activeScreenSize
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => (this.activeScreenSize = response));
  }

  builderComponentSelected(componentIndex: number): void {
    this.builderComponentsService.activeComponentIndex.next(componentIndex);
  }

  builderComponentDragged(componentIndex: number): void {
    this.builderService.activeDragData.next({
      type: ActiveDragType.Component,
      component: this.website.pages[this.activePageIndex].components[componentIndex],
    });
  }

  clearActiveDrag(): void {
    this.builderService.activeDragData.next(null);
  }

  recycleShowcase(components: IComponent[]): void {
    this.builderService.clearActiveComponent();
    this.builderComponentsService.activeComponentIndex.next(null);
    this.builderService.activeSetting.next(ActiveSettings.Templates);

    const pageIndex = this.activePageIndex;
    for (let i = 0; i < components.length; i++) {
      for (let k = 0; k < this.website.pages[pageIndex].components.length; k++) {
        if (components[i].componentName !== ActiveComponentsPartialSelector.Placeholder) {
          if (
            this.website.pages[pageIndex].components[k].componentId === components[i].componentId
          ) {
            this.website.pages[pageIndex].components[k].componentIndex =
              components[i].componentIndex;
            this.website.pages[pageIndex].components[k].pageIndex = pageIndex;
          }
        }
      }
    }

    this.website.pages[pageIndex].components.sort(function (a, b) {
      return a.componentIndex - b.componentIndex;
    });

    this.builderComponentsService.website.next(this.website);
  }

  onDeleteComponent(): void {
    if (
      this.activeComponentMetadata &&
      (!this.activeComponentMetadata.activeElementId ||
        this.activeComponentMetadata.activeElementId === ActiveElements.Default)
    ) {
      const modal = this.modalService.open(BuilderDeleteComponentModalComponent, {
        windowClass: 'modal-holder',
        centered: true,
      });
      modal.componentInstance.componentId = this.activeComponentMetadata.component.componentId;
    }
  }

  trackByFn(index: number, component: IComponent): string {
    return component.componentId;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
