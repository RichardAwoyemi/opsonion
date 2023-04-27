import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-builder-sidebar-wrapper',
  templateUrl: './builder-sidebar-wrapper.component.html',
  styleUrls: ['./builder-sidebar-wrapper.component.css'],
})
export class BuilderSidebarWrapperComponent {
  @Input() activeSetting;
  @Input() tabName;
  @Input() tabClass;
  @Input() tabId;
}
