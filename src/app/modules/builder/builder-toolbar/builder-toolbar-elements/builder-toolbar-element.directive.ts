import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appToolbarElement]',
})
export class BuilderToolbarElementDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
