import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ISectionElement } from '../builder-section';

@Component({
  selector: 'section-animation',
  templateUrl: './builder-section-animation.component.html',
})
export class BuilderSectionAnimationComponent {
  @Input() animationState = {};
  @Input() element: ISectionElement;

  isHovered = false;

  ngUnsubscribe = new Subject<void>();
  constructor() {}

  setHoverAnimationState(state: boolean): void {
    this.isHovered = state;
  }
}
