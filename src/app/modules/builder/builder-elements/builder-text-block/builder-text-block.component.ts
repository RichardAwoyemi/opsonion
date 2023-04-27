import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IComponentMetadata } from '../../builder-components/builder-components';
import { ISectionElement } from '../../builder-components/builder-section/builder-section';

@Component({
  selector: 'app-builder-text-block',
  templateUrl: './builder-text-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderTextBlockComponent {
  @Input() componentMetadata: IComponentMetadata;
  @Input() element: ISectionElement;
  @Input() text: string;
  @Input() style = {};
  @Input() displayOption = true;
  @Input() contenteditable = true;

  @Output() value = new EventEmitter();

  constructor() {}

  setText(text: string): void {
    this.element.data.text.innerHtml = text;
  }
}
