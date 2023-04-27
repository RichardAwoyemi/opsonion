import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveSettings } from 'src/app/modules/builder/builder';
import { TourService } from '../../shared/services/tour.service';
import { ActiveOrientations } from './builder';
import { IComponentMetadata, IDragData } from './builder-components/builder-components';

@Injectable()
export class BuilderService {
  activeComponentMetadata = new BehaviorSubject<IComponentMetadata>(null);
  activeSetting = new BehaviorSubject<ActiveSettings>(null);
  activePageSetting = new BehaviorSubject<string>('Home');
  activeDragData = new BehaviorSubject<IDragData>(null);
  activePageIndex = new BehaviorSubject<number>(0);
  activeOrientation = new BehaviorSubject<string>(null);
  activeScreenSize = new BehaviorSubject<string>(null);
  previewMode = new BehaviorSubject<boolean>(false);
  websiteMode = new BehaviorSubject<boolean>(false);
  fullScreenMode = new BehaviorSubject<boolean>(false);
  fontUnits = new BehaviorSubject<string[]>(['px', 'em']);
  shepherdDefaultStepOptions = TourService.setupBuilderTourStepOptions;
  shepherdDefaultSteps = TourService.setupBuilderTourSteps();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]) {
          this.activeScreenSize.next(ActiveOrientations.Mobile);
        } else {
          this.activeScreenSize.next(ActiveOrientations.Desktop);
        }
        if (!this.activeOrientation.getValue() && !this.websiteMode.getValue()) {
          this.activeOrientation.next(this.activeScreenSize.getValue());
        }
      });
  }

  static removeLineBreaks(e: Event): void {
    const element = e.target as HTMLTextAreaElement;
    element.innerText = element.innerText.replace(/\n/g, '').trim();
  }

  static setComponentClass(
    previewMode: boolean,
    activeComponent: IComponentMetadata,
    componentMetadata: IComponentMetadata,
    active = true
  ): string {
    if (previewMode) {
      return '';
    } else {
      if (
        activeComponent &&
        activeComponent.componentName === componentMetadata.componentName &&
        active
      ) {
        return 'component-border-active';
      } else {
        return 'component-border';
      }
    }
  }

  static setContextMenu(
    previewMode: boolean,
    activeEditComponent: IComponentMetadata,
    componentMetadata: IComponentMetadata
  ): string {
    if (
      !previewMode &&
      activeEditComponent &&
      activeEditComponent.component.componentId === componentMetadata.component.componentId
    ) {
      return `${componentMetadata.componentName}-edit-component no-select`;
    } else {
      return 'no-select';
    }
  }

  clearActiveComponent(): void {
    const toolbarTabs = [
      ActiveSettings.Adjust,
      ActiveSettings.Animate,
      ActiveSettings.Colour,
      ActiveSettings.Font,
    ];
    const activeSetting = this.activeSetting.getValue();
    this.activeComponentMetadata.next(null);
    if (!activeSetting || toolbarTabs.includes(activeSetting)) {
      this.activeSetting.next(ActiveSettings.Templates);
    }
  }
}
