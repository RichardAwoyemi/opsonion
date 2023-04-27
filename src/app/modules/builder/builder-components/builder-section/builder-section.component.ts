import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { UtilService } from 'src/app/shared/services/util.service';
import { ActiveComponents, ActiveDragType, ActiveSettings } from '../../builder';
import { BuilderElementsService } from '../../builder-elements/builder-elements.service';
import { BuilderService } from '../../builder.service';
import { IComponent, IComponentMetadata, IDragData } from '../builder-components';
import { BuilderComponentsService } from '../builder-components.service';
import { BuilderAlignmentService } from './builder-alignment.service';
import { IFilteredElementCord, IMinCord, ISectionElement } from './builder-section';
import {
  IHandle,
  IHandleSettings,
} from './builder-section-element-resize/builder-section-element-resize';
import { BuilderResizeElementService } from './builder-section-element-resize/builder-section-element-resize.service';

@Component({
  selector: 'app-builder-section',
  templateUrl: './builder-section.component.html',
})
export class BuilderSectionComponent implements OnInit, OnChanges, OnDestroy {
  get component(): IComponent {
    return this._component;
  }

  @Input() set component(newVal: IComponent) {
    if (this._component !== newVal) {
      this._component = newVal;
      this.componentMetadata.component = this._component;
    }
  }

  @Input() showcaseDocument: Document;
  @Input() activeDragData: IDragData;
  @Input() activeComponentMetadata: IComponentMetadata;
  @Input() websiteMode: boolean;
  @Input() previewMode: boolean;
  @Input() activeScreenSize: string;
  @Input() activeOrientation: string;
  @Input() activeSetting: ActiveSettings;
  @Input() activePage: string;

  @ViewChild('sectionComponent') sectionComponent;

  animationState = {};
  componentMetadata: IComponentMetadata = {
    componentName: ActiveComponents.Section,
    componentMenu: {},
  };
  componentActive = false;
  elementClass: string;
  showcaseDimensions: number = null;
  dragImage = document.createElement('img');
  initialX: number;
  initialY: number;
  xAxisLimit: number;
  yAxisLimit: number;
  initialSectionCord: number;
  initialSectionSettings = { originalHeight: null, minHeight: 5 };
  previousElement: ISectionElement;
  activeElement: ISectionElement;
  activeElementIndex = null;
  isContentEditable = false;
  collapseLayout: boolean;
  filteredElementCords: IFilteredElementCord[];
  storedMinCords: { x?: IMinCord[]; y?: IMinCord[] } = { x: [], y: [] };
  activeHandleSettings: { x: IHandleSettings; y: IHandleSettings } = { x: null, y: null };
  observer: IntersectionObserver;
  activeAction: string;
  resizeObject: {
    handle: IHandle;
    initalElement?: ISectionElement;
    handleCords?: { x: number; y: number };
    itemCords?: DOMRect;
    activeCords?: number[];
  };

  private _component: IComponent;
  constructor(
    private ref: ChangeDetectorRef,
    private builderService: BuilderService,
    private resizeService: BuilderResizeElementService,
    private builderElementsService: BuilderElementsService,
    private builderAlignmentService: BuilderAlignmentService,
    private builderComponentsService: BuilderComponentsService,
    public breakpointObserver: BreakpointObserver
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setShowcaseDimensions();
  }

  ngOnInit(): void {
    this.dragImage.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    this.component.elements.forEach((element) => {
      this.animationState[element.elementId] = {
        entrance: false,
        hover: false,
        default: false,
      };
    });
    const elements = this.showcaseDocument.querySelectorAll('.section-item');
    this.observer = new IntersectionObserver((entry) => {
      entry.forEach((item) => {
        if (item.isIntersecting) {
          this.animationState[item.target.id] = {
            entrance: true,
            hover: false,
            default: false,
          };
          this.ref.detectChanges();
        }
      });
    });
    elements.forEach((element) => this.observer.observe(element));
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        switch (prop) {
          case 'component': {
            this.setNewAnimationStates(change);
            if (change.currentValue !== change.previousValue) {
              this.ref.detectChanges();
            }
            if (this.componentActive && this.activeElement && this.activeElementIndex !== null) {
              this.activeElementIndex = (change.currentValue
                .elements as ISectionElement[]).findIndex(
                (element) => element.elementId === this.activeElement.elementId
              );
              this.activeElement = change.currentValue.elements[this.activeElementIndex];
              this.builderElementsService.selectElement(
                null,
                this.activeElement,
                this.activeElementIndex,
                this.componentMetadata
              );
            } else {
              this.activeElement = null;
            }
            break;
          }
          case 'previewMode': {
            this.elementClass = change.currentValue
              ? 'component-element-preview'
              : 'component-element-active';
            break;
          }
          case 'activeComponentMetadata': {
            this.componentActive =
              this.activeComponentMetadata &&
              this.component &&
              this.activeComponentMetadata.component.componentId === this.component.componentId;
            if (!this.componentActive || !this.activeComponentMetadata.activeElement) {
              this.activeElement = null;
              this.activeElementIndex = null;
              this.filteredElementCords = null;
            }
            break;
          }
          case 'activeScreenSize': {
            this.setBreakpointSettings();
            break;
          }
          case 'activeOrientation': {
            this.setBreakpointSettings();
            setTimeout(() => {
              this.setShowcaseDimensions();
            }, 1000);
            break;
          }
          case 'showcaseDocument': {
            this.setShowcaseDimensions();
            break;
          }
          case 'activeSetting': {
            setTimeout(() => {
              this.setShowcaseDimensions();
            }, 1000);
            break;
          }
          case 'activePage': {
            this.ref.detectChanges();
            break;
          }
        }
      }
    }
  }

  setBreakpointSettings(): void {
    const breakpoint = this.builderService.activeScreenSize.getValue();
    const showcaseOrientation = this.builderService.activeOrientation.getValue();
    if (breakpoint === 'small' || showcaseOrientation === 'mobile') {
      this.collapseLayout = true;
    } else if (
      breakpoint === 'medium' ||
      breakpoint === 'large' ||
      showcaseOrientation === 'tablet' ||
      showcaseOrientation === 'desktop'
    ) {
      this.collapseLayout = false;
    }
    this.setShowcaseDimensions();
  }

  elementDragStart(event: { e: DragEvent; element: ISectionElement; i: number }): void {
    this.setActiveElement(event.element, event.i);
    if (!event.e.target['isContentEditable'] && !this.collapseLayout) {
      this.activeAction = 'drag';
      event.e.stopPropagation();
      this.setShowcaseDimensions();
      this.setInitialElementPosition(event.e);
      this.setElementDragLimits(event.e);
      this.selectElement({
        e: event.e,
        element: event.element,
        i: event.i,
        isContentEditable: false,
      });
      this.setActiveDragData(ActiveDragType.SectionElement, event.element);
    }
  }

  elementMouseMove(e: MouseEvent): void {
    switch (this.activeAction) {
      case 'drag':
        if (
          e &&
          this.activeElement &&
          this.activeElementIndex !== null &&
          (!this.isContentEditable ||
            (this.activeElement.type !== 'text' && this.activeElement.type !== 'button'))
        ) {
          this.elementDrag({ e: e, element: this.component.elements[this.activeElementIndex] });
        }
        break;
      case 'resizeElement':
        if (this.resizeObject && this.resizeObject.initalElement) {
          this.setPreviousElement();
          this.setElement(
            this.resizeService.resizeElement(
              e,
              this.component.elements[this.activeElementIndex],
              this.resizeObject.initalElement,
              this.resizeObject.handleCords,
              this.resizeObject.itemCords,
              this.resizeObject.handle.settings,
              this.showcaseDimensions
            )
          );
          this.setAlignment(this.resizeObject.activeCords, true);
        }
        break;
      default:
        break;
    }
  }

  elementDrag(event: { e: MouseEvent; element: ISectionElement }): void {
    if (!event || !event.e || !event.element) {
      this.clearSettings();
    } else if (this.activeAction === 'drag') {
      this.setPreviousElement();
      this.setBoundedElementPosition(event.e, event.element);
      this.setAlignment([0, 1, 2], false);
    }
  }

  elementDragEnd(): void {
    this.clearSettings();
    this.saveComponent();
  }

  startSectionResize(e: MouseEvent): void {
    this.setShowcaseDimensions();
    this.setSectionVerticalCord(e);
    this.setInitialSectionSettings();
  }

  selectElement(event: {
    e: Event;
    element: ISectionElement;
    i: number;
    isContentEditable: boolean;
  }): void {
    this.setContentEditable(event.e, event.element, event.isContentEditable);
    this.builderElementsService.selectElement(
      event.e,
      event.element,
      event.i,
      this.componentMetadata
    );
    this.setActiveElement(event.element, event.i);
    this.setInitialElementCords();
  }

  deleteElement(event: { e: KeyboardEvent; elementId: string }): void {
    if (!event.e.target['isContentEditable']) {
      const deletionSuccessful = this.removeElementFromComponent(event.elementId);
      if (deletionSuccessful) {
        this.clearActiveElement();
        event.e.stopPropagation();
      }
    }
  }

  dropElement(e: DragEvent): void {
    if (this.isValidDropEvent()) {
      if (this.activeDragData.type === ActiveDragType.SectionElement) {
        this.builderElementsService.selectElement(
          e,
          this.activeDragData.sectionElement,
          this.activeElementIndex,
          this.componentMetadata
        );
        this.clearSettings();
      } else if (Object.values(ActiveDragType).includes(this.activeDragData.type)) {
        this.setShowcaseDimensions();
        let newElement = this.getNewElement(e);
        if (this.activeDragData.type === this.activeDragData.image) {
          newElement = this.setImageDimensions(newElement);
        }
        this.addElementToComponent(newElement);
        this.setElementAnimationState(newElement);
      }
    }
    this.clearSettings();
    this.saveComponent();
  }

  saveComponent(): void {
    this.builderComponentsService.setComponent(this.component);
  }

  setActiveElement(element: ISectionElement, index: number): void {
    this.activeElement = element;
    this.activeElementIndex = index;
  }

  setActiveDragData(type: ActiveDragType, element: ISectionElement): void {
    this.builderService.activeDragData.next(
      UtilService.shallowClone({
        type: ActiveDragType.SectionElement,
        sectionElement: element,
      })
    );
  }

  setInitialElementPosition(e: DragEvent): void {
    const xOffset = e.currentTarget['getBoundingClientRect']().x;
    const yOffset =
      e.currentTarget['getBoundingClientRect']().y -
      e.currentTarget['parentElement']['parentElement']['getBoundingClientRect']().y;
    this.initialX = e.clientX - xOffset;
    this.initialY = e.clientY - yOffset;
  }

  setElementDragLimits(e: DragEvent): void {
    const itemWidth = e.currentTarget['offsetWidth'];
    const itemHeight = e.currentTarget['offsetHeight'];
    const sectionHeight = e.currentTarget['parentElement']['parentNode'].clientHeight;
    this.xAxisLimit = this.showcaseDimensions - itemWidth;
    this.yAxisLimit = sectionHeight - itemHeight + 10;
  }

  setShowcaseDimensions(): void {
    this.showcaseDimensions = this.showcaseDocument.body.clientWidth;
  }

  setBoundedElementPosition(e: MouseEvent, element: ISectionElement): void {
    const currentX = Math.min(Math.max(e.clientX - this.initialX, -2), this.xAxisLimit);
    const currentY = Math.min(Math.max(e.clientY - this.initialY, -2), this.yAxisLimit);
    element.translate.x = (100 * currentX) / this.showcaseDimensions;
    element.translate.y = (100 * currentY) / this.showcaseDimensions;
  }

  setPreviousElement(): void {
    this.previousElement = UtilService.shallowClone(this.activeElement);
  }

  startElementResize(e: {
    handle: IHandle;
    initalElement: ISectionElement;
    handleCords: { x: number; y: number };
    itemCords: DOMRect;
    activeCords: number[];
  }): void {
    this.activeAction = 'resizeElement';
    this.resizeObject = e;
    this.resizeObject.handle = e.handle;
    this.activeHandleSettings = { x: null, y: null };
    for (let i = 0; i < e.handle.settings.length; i++) {
      const selectedHandle = e.handle.settings[i];
      this.activeHandleSettings[selectedHandle.axis] = selectedHandle;
    }
  }

  isValidDropEvent(): boolean {
    return (
      this.activeDragData &&
      this.activeDragData.type &&
      this.activeDragData.type !== ActiveDragType.Component &&
      !this.collapseLayout
    );
  }

  getNewElement(e: MouseEvent): ISectionElement {
    return {
      translate: {
        x: (100 * e.offsetX) / this.showcaseDimensions,
        y: (100 * e.offsetY) / this.showcaseDimensions,
      },
      type: this.activeDragData.type,
      layer: this.component.elements.length,
      mobileSettings: { index: this.component.elements.length, style: {} },
      data: this.activeDragData,
      elementId: `${this.activeDragData.type}-${UtilService.generateRandomString(8)}`,
      height: 20,
      width: 20,
    };
  }

  setImageDimensions(element: ISectionElement): ISectionElement {
    if (
      this.activeDragData.image &&
      this.activeDragData.image.style.height &&
      this.activeDragData.image.style.width
    ) {
      const imageHeight = +this.activeDragData.image.style.height.match(/\d/g).join('');
      const imageWidth = +this.activeDragData.image.style.width.match(/\d/g).join('');
      element.height = (imageHeight / imageWidth) * element.width;
    }
    return element;
  }

  addElementToComponent(newElement: ISectionElement): void {
    this.component.elements.push(newElement);
  }

  trackByFn(index: number, element: ISectionElement): string {
    return element.elementId;
  }

  setSectionVerticalCord(e: MouseEvent): void {
    this.initialSectionCord = e.clientY;
  }

  setInitialSectionSettings(): void {
    this.initialSectionSettings.originalHeight = this.component.height.valueOf();
    this.initialSectionSettings.minHeight = 2;
    for (let i = 0; i < this.component.elements.length; i++) {
      this.initialSectionSettings.minHeight = Math.max(
        this.initialSectionSettings.minHeight,
        +this.component.elements[i].height + this.component.elements[i].translate.y
      );
    }
  }

  resizeSection(e: MouseEvent): void {
    const delta = e.clientY - this.initialSectionCord;
    this.component.height = Math.max(
      this.initialSectionSettings.originalHeight + (100 * delta) / this.showcaseDimensions,
      this.initialSectionSettings.minHeight
    );
  }

  clearSettings(): void {
    if (this.activeElement) {
      this.filteredElementCords = this.builderAlignmentService.setInitialElementCords(
        this.component,
        this.activeElement.elementId
      );
    }
    this.builderService.activeDragData.next(null);
    this.resizeObject = { handle: { x: null, y: null, settings: [] } };
    this.activeAction = null;
  }

  clearShowcaseSelectedText(): void {
    this.showcaseDocument.getSelection().removeAllRanges();
  }

  setContentEditable(e: Event, element: ISectionElement, isContentEditable: boolean): void {
    const isActive =
      this.activeComponentMetadata &&
      this.activeComponentMetadata.activeElementId === element.elementId;
    this.isContentEditable =
      (isContentEditable || e.target['isContentEditable']) && isActive && e.type !== 'dragStart';
    if (!e.target['isContentEditable'] && element.type === ActiveDragType.Text) {
      this.clearShowcaseSelectedText();
    }
  }

  setInitialElementCords(): void {
    this.filteredElementCords = this.builderAlignmentService.setInitialElementCords(
      this.component,
      this.activeElement.elementId
    );
  }

  clearActiveElement(): void {
    this.clearSettings();
    this.builderElementsService.clearActiveElement();
    this.activeElement = null;
    this.activeElementIndex = null;
    this.isContentEditable = false;
    this.activeAction = null;
  }

  removeElementFromComponent(elementId: string): boolean {
    let deleted = false;
    let updatePosition = false;
    for (let i = 0; i < this.component.elements.length; i++) {
      if (this.component.elements[i].elementId === elementId) {
        this.deleteElementByIndex(i);
        deleted = true;
      }
      this.setElementLayerOrder(i, updatePosition, deleted);
      updatePosition = deleted;
    }
    return deleted;
  }

  deleteElementByIndex(i: number): void {
    this.component.elements.splice(i, 1);
  }

  setElementLayerOrder(i: number, updatePosition: boolean, deleted: boolean): void {
    if (updatePosition && !this.collapseLayout) {
      this.component.elements[i].layer = i;
    } else if (deleted && this.collapseLayout) {
      this.component.elements[i].mobileSettings.index = i;
    }
  }

  setAlignment(activeElementCordKeys: number[], isResize: boolean): void {
    this.builderAlignmentService.setAlignment(
      this.component,
      this.activeElement,
      this.previousElement,
      this.filteredElementCords,
      this.activeHandleSettings,
      this.storedMinCords,
      activeElementCordKeys,
      isResize
    );
  }

  setNewAnimationStates(componentChange: SimpleChange): void {
    if (
      !componentChange.firstChange &&
      (componentChange.currentValue as IComponent).elements.length !==
        (componentChange.previousValue as IComponent).elements.length
    ) {
      (componentChange.currentValue as IComponent).elements.forEach((element) => {
        this.setElementAnimationState(element);
      });
    }
  }

  setElementAnimationState(element: ISectionElement): void {
    this.ref.detectChanges();
    if (!this.animationState[element.elementId]) {
      this.animationState[element.elementId] = {
        entrance: true,
        hover: false,
        default: true,
      };
      const targetElement = this.showcaseDocument.getElementById(element.elementId);
      this.observer.observe(targetElement);
    }
  }

  setElement(element: ISectionElement): void {
    this.component.elements[this.activeElementIndex] = element;
    this.activeElement = element;
  }

  ngOnDestroy(): void {
    Object.keys(this.animationState).forEach((elementId) => {
      this.observer.unobserve(this.showcaseDocument.getElementById(elementId));
    });
  }
}
