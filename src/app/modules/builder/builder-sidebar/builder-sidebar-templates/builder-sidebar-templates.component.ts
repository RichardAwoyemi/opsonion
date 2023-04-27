import { Component, Input, SimpleChanges } from '@angular/core';
import { ActiveSettings } from '../../builder';
import { UtilService } from '../../../../shared/services/util.service';

@Component({
  selector: 'app-builder-sidebar-templates',
  templateUrl: './builder-sidebar-templates.component.html',
  styleUrls: ['./builder-sidebar-templates.component.css'],
})
export class BuilderSidebarTemplatesComponent {
  @Input() tabName;
  @Input() activeSetting;

  titleCaseTabName: string;
  SETTINGS_NAME = ActiveSettings.Templates;

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, prop)) {
        const change = changes[prop];
        switch (prop) {
          case 'activeSetting': {
            if (change.currentValue) {
              this.titleCaseTabName = UtilService.toTitleCase(change.currentValue);
              break;
            }
          }
        }
      }
    }
  }
}
