import { Component, Input } from '@angular/core';
import { IFilteredElementCord } from '../builder-section';

@Component({
  selector: 'section-alignment',
  templateUrl: './builder-section-alignment.component.html',
})
export class BuilderSectionAlignmentComponent {
  @Input() collapseLayout: boolean;
  @Input() previewMode: boolean;
  @Input() filteredElementCords: IFilteredElementCord[];
}
