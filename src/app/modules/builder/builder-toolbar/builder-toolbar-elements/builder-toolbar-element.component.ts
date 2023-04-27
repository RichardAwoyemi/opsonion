import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IWebsite } from 'src/app/shared/models/website';
import { IComponentMetadata } from '../../builder-components/builder-components';
import { BuilderToolbarElementItem } from './builder-toolbar-element-item';
import { BuilderToolbarElementDirective } from './builder-toolbar-element.directive';
import { ActiveSettings } from '../../builder';

@Component({
  selector: 'app-toolbar-element',
  template: ' <ng-template appToolbarElement></ng-template>',
})
export class BuilderToolbarElementComponent implements OnInit, OnChanges {
  @Input() activeComponentMetadata: IComponentMetadata;
  @Input() activeToolbarElement: string;
  @Input() website: IWebsite;
  @Input() toolbarElementItem: BuilderToolbarElementItem;
  @Input() activeFontName: string;
  @Input() activeSetting: ActiveSettings;

  @ViewChild(BuilderToolbarElementDirective, { static: true })
  toolbarElementHost: BuilderToolbarElementDirective;
  componentRef: ComponentRef<unknown>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.setupComponents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        if (this.componentRef) {
          this.componentRef.instance[prop] = change.currentValue;
        }
      }
    }
  }

  setupComponents(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.toolbarElementItem.component
    );
    const viewContainerRef = this.toolbarElementHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance['settings'] = this.toolbarElementItem.elementOptions;
    this.componentRef.instance['componentDetails'] = this.toolbarElementItem.elementOptions;
    this.componentRef.instance['activeComponentMetadata'] = this.activeComponentMetadata;
    this.componentRef.instance['activeToolbarElement'] = this.activeToolbarElement;
    this.componentRef.instance['activeFontName'] = this.activeFontName;
    this.componentRef.instance['activeSetting'] = this.activeSetting;
    this.componentRef.instance['website'] = this.website;
  }
}
