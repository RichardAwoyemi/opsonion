import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSidebarElement]',
})
export class BuilderSidebarConfigDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
