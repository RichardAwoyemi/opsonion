import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-builder-sidebar-photos-categories',
  templateUrl: './builder-sidebar-photos-categories.component.html',
  styleUrls: ['../builder-sidebar-photos.component.css'],
})
export class BuilderSidebarPhotosCategoriesComponent {
  @Input() photoCategory;
  @Input() photoCategoryIndex;
}
