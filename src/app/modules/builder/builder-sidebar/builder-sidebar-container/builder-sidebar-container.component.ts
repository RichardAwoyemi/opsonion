import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-builder-sidebar-container',
  templateUrl: './builder-sidebar-container.component.html',
  styleUrls: ['./builder-sidebar-container.component.css', '../builder-sidebar.component.css'],
})
export class BuilderSidebarContainerComponent {
  @Input() innerHeight;
}
