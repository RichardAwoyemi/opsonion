import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IWebsite } from 'src/app/shared/models/website';
import { UtilService } from 'src/app/shared/services/util.service';
import { ActiveSettings } from '../../builder';
import { IComponent, IComponentMetadata } from '../../builder-components/builder-components';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import {
  IAnimation,
  ISectionElement,
} from '../../builder-components/builder-section/builder-section';

@Component({
  selector: 'app-builder-sidebar-animate',
  templateUrl: './builder-sidebar-animate.component.html',
  styleUrls: ['./builder-sidebar-animate.component.css'],
})
export class BuilderSidebarAnimateComponent implements OnChanges {
  @Input() tabName: string;
  @Input() activeSetting: ActiveSettings;
  @Input() activeComponentMetadata: IComponentMetadata;
  @Input() website: IWebsite;

  settingsName = ActiveSettings.Animate;
  activeTab = 'entrance';

  tabPanes = ['Entrance', 'Default', 'Hover'];

  entranceAnimations = [
    { name: 'Bounce', class: 'animate__bounceIn' },
    { name: 'Bounce Up', class: 'animate__bounceInUp' },
    { name: 'Bounce Down', class: 'animate__bounceInDown' },
    { name: 'Bounce Left', class: 'animate__bounceInLeft' },
    { name: 'Bounce Right', class: 'animate__bounceInRight' },
    { name: 'Fade', class: 'animate__fadeIn' },
    { name: 'Fade Up', class: 'animate__fadeInUp' },
    { name: 'Fade Down', class: 'animate__fadeInDown' },
    { name: 'Fade Left', class: 'animate__fadeInLeft' },
    { name: 'Fade Right', class: 'animate__fadeInRight' },
    { name: 'Flip Vertical', class: 'animate__flipInX' },
    { name: 'Flip Horizontal', class: 'animate__flipInY' },
    { name: 'Zoom', class: 'animate__zoomIn' },
    { name: 'Zoom Up', class: 'animate__zoomInUp' },
    { name: 'Zoom Down', class: 'animate__zoomInDown' },
    { name: 'Zoom Left', class: 'animate__zoomInLeft' },
    { name: 'Zoom Right', class: 'animate__zoomInRight' },
    { name: 'Slide Up', class: 'animate__slideInUp' },
    { name: 'Slide Down', class: 'animate__slideInDown' },
    { name: 'Slide Left', class: 'animate__slideInLeft' },
    { name: 'Slide Right', class: 'animate__zoomInRight' },
  ];

  otherAnimations = [
    { name: 'Bounce', class: 'animate__bounce' },
    { name: 'Flash', class: 'animate__flash' },
    { name: 'Pulse', class: 'animate__pulse' },
    { name: 'Rubber Band', class: 'animate__rubberBand' },
    { name: 'Shake Side', class: 'animate__shakeX' },
    { name: 'Shake Up', class: 'animate__shakeY' },
    { name: 'Head Shake', class: 'animate__headShake' },
    { name: 'Swing', class: 'animate__swing' },
    { name: 'Tada', class: 'animate__tada' },
    { name: 'Wobble', class: 'animate__wobble' },
    { name: 'Heartbeat', class: 'animate__heartBeat' },
  ];

  componentMetadata: IComponentMetadata;
  component: IComponent;
  element: ISectionElement;
  style: IAnimation;

  constructor(private builderComponentsService: BuilderComponentsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        if (prop === 'activeComponentMetadata') {
          if (change.currentValue) {
            this.componentMetadata = change.currentValue;
            this.setActiveAnimation();
            if (this.website) {
              this.setTargetVariables(undefined, change.currentValue);
              this.setActiveAnimation();
            }
          }
        }
        if (prop === 'website') {
          if (this.activeComponentMetadata && this.activeComponentMetadata.component) {
            this.setTargetVariables(change.currentValue);
            this.setActiveAnimation();
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
        this.style = this.element.animation;
      }
    }
  }

  setComponent(website = this.website, data = this.activeComponentMetadata): IComponent {
    return website.pages[data.component.pageIndex].components[data.component.componentIndex];
  }

  setElement(data = this.activeComponentMetadata): ISectionElement {
    return this.component.elements.find((element) => element.elementId === data.activeElementId);
  }

  setActiveAnimation(): void {}

  setAnimateClass(animationClass: string, tab: string): void {
    const animationSetting = { [tab]: { class: animationClass } };
    const activeElement = this.activeComponentMetadata.activeElement;
    activeElement.animation = { ...activeElement.animation, ...animationSetting };
    const component = this.activeComponentMetadata.component;
    const website = UtilService.shallowClone(this.website);
    const elements =
      website.pages[component.pageIndex].components[component.componentIndex].elements;
    const elementIndex = elements.findIndex(
      (chosenElement) => chosenElement.elementId === this.activeComponentMetadata.activeElementId
    );
    website.pages[component.pageIndex].components[component.componentIndex].elements[
      elementIndex
    ] = activeElement;
    this.builderComponentsService.website.next(website);
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }
}
