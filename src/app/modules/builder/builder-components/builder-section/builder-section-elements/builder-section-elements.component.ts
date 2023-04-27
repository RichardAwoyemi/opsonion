import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IComponentMetadata } from '../../builder-components';
import { ISectionElement } from '../builder-section';

@Component({
  selector: 'section-elements',
  templateUrl: './builder-section-elements.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSectionElementsComponent {
  @Input() activeComponentMetadata: IComponentMetadata;
  @Input() componentActive: boolean;
  @Input() componentMetadata: IComponentMetadata;
  @Input() element: ISectionElement;
  @Input() isContentEditable: boolean;
  @Input() websiteMode: boolean;
}
