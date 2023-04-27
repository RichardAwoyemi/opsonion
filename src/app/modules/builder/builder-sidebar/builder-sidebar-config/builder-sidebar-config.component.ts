import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { BuilderSidebarConfigDirective } from './builder-sidebar-config.directive';
import { IElementData, ISidebarElementItem } from './builder-sidebar-config';

@Component({
  selector: 'app-sidebar-element',
  template: '<ng-template appSidebarElement></ng-template>',
})
export class BuilderSidebarConfigComponent implements OnInit {
  @Input() sidebarElementItem: ISidebarElementItem;
  @Input() defaultSidebarElementItems: IElementData;
  @ViewChild(BuilderSidebarConfigDirective, { static: true })
  sidebarElementHost: BuilderSidebarConfigDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.setupComponents();
  }

  setupComponents(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.sidebarElementItem.component
    );
    const viewContainerRef = this.sidebarElementHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance['data'] = this.defaultSidebarElementItems;
    componentRef.instance['settings'] = this.sidebarElementItem.elementSettings;
  }
}
