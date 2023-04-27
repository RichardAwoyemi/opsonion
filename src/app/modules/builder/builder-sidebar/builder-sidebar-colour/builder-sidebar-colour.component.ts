import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IframeService } from 'src/app/shared/services/iframe.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { IWebsite } from '../../../../shared/models/website';
import { ActiveDragType, ActiveSettings } from '../../builder';
import {
  IComponent,
  IComponentMetadata,
  IStyle,
  IToolbarColours,
} from '../../builder-components/builder-components';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { ISectionElement } from '../../builder-components/builder-section/builder-section';
import { DEFAULT_COLOURS } from '../../builder-toolbar/builder-toolbar-elements/builder-toolbar-colour/builder-toolbar-colour';

@Component({
  selector: 'app-builder-sidebar-colour',
  templateUrl: './builder-sidebar-colour.component.html',
  styleUrls: ['./builder-sidebar-colour.component.css'],
})
export class BuilderSidebarColourComponent implements OnChanges {
  @Input() activeComponentMetadata: IComponentMetadata;
  @Input() activeSetting: string;
  @Input() website: IWebsite;
  @Input() activePageIndex: number;
  @Input() activeToolbarElement: string;
  @Input() activeToolbarColourSetting: {
    index: number;
    colour: string;
    setting: IToolbarColours;
  };

  settingsName = ActiveSettings.Colour;
  componentMetadata: IComponentMetadata;
  style: IStyle;
  defaultColours = DEFAULT_COLOURS;
  activeColour = 'rgb(0, 0, 0)';
  ACTIVE_BUTTON = 'active-colour';
  innerWidth = [window.innerWidth * 0.14 + 'px'];
  component: IComponent;
  element: ISectionElement;

  constructor(
    private toastrService: ToastrService,
    private builderComponentsService: BuilderComponentsService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.innerWidth = [window.innerWidth * 0.14 + 'px'];
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        if (prop === 'activeComponentMetadata') {
          if (change.currentValue) {
            this.componentMetadata = change.currentValue;
            this.setActiveColour();
            if (this.website) {
              this.setTargetVariables(undefined, change.currentValue);
              this.setActiveColour();
            }
          } else if (
            this.activeSetting === ActiveSettings.Colour &&
            (!change.currentValue ||
              !change.currentValue.activeElementId ||
              change.currentValue.activeElementType === ActiveDragType.Image)
          ) {
            this.activeSetting = ActiveSettings.Photos;
          }
        }
        if (prop === 'website') {
          if (this.activeComponentMetadata && this.activeComponentMetadata.component) {
            this.setTargetVariables(change.currentValue);
            this.setActiveColour();
          }
        }
      }
    }
  }

  setTargetVariables(website = this.website, data = this.activeComponentMetadata): void {
    this.component = this.setComponent(website, data);
    if (this.activeComponentMetadata.activeElement) {
      this.element = this.setElement();
      if (this.element) {
        this.style = this.element.data[this.element.type].style;
      }
    } else {
      this.style = this.component.style;
    }
  }

  setComponent(website = this.website, data = this.activeComponentMetadata): IComponent {
    return website.pages[data.component.pageIndex].components[data.component.componentIndex];
  }

  setElement(data = this.activeComponentMetadata): ISectionElement {
    return this.component.elements.find((element) => element.elementId === data.activeElementId);
  }

  setActiveColour(): void {
    if (this.activeToolbarElement === 'fontColour') {
      this.setActiveFontColour();
    }
  }

  setActiveFontColour(): void {
    this.activeColour = UtilService.rgbToHex(
      IframeService.getIframeElement('builder-showcase').queryCommandValue('foreColor')
    );
  }

  setColour(colour: string): void {
    if (this.activeToolbarElement !== 'fontColour') {
      this.setElementStyle(colour);
      this.activeColour = colour;
    } else {
      this.setFontColour(colour);
    }
  }

  setElementStyle(colour: string): void {
    this.style[this.activeToolbarColourSetting.setting.key] = colour;
    this.builderComponentsService.website.next(UtilService.shallowClone(this.website));
  }

  setFontColour(colour: string): void {
    const showcaseDocument = IframeService.getIframeElement('builder-showcase');
    if (showcaseDocument.getSelection().toString()) {
      showcaseDocument.execCommand('foreColor', false, colour);
      this.activeColour = colour;
    } else {
      this.toastrService.warning('Please make a text selection before applying formatting.');
    }
  }
}
