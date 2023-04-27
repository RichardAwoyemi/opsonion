import { Component, Input } from '@angular/core';
import { ActiveOrientations } from '../../../builder';
import { IElementSettings } from '../../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';
import { BuilderService } from '../../../builder.service';
import { BuilderToolbarElementService } from '../builder-toolbar-element.service';

@Component({
  selector: 'app-builder-toolbar-orientation',
  templateUrl: './builder-toolbar-orientation.component.html',
  styleUrls: ['../../builder-toolbar.component.css', './builder-toolbar-orientation.component.css'],
})
export class BuilderToolbarOrientationComponent {
  @Input() settings: IElementSettings;

  ACTIVE_DESKTOP_ORIENTATION = ActiveOrientations.Desktop;
  ACTIVE_TABLET_ORIENTATION = ActiveOrientations.Tablet;
  ACTIVE_MOBILE_ORIENTATION = ActiveOrientations.Mobile;
  activeButtonClass = 'toolbar-button toolbar-button-active';
  inactiveButtonClass = 'toolbar-button';

  constructor(
    public builderService: BuilderService,
    private builderToolbarElementService: BuilderToolbarElementService
  ) {}

  setActiveOrientationButtonClass(orientation: string): string {
    return this.builderService.activeOrientation.getValue() === orientation
      ? this.activeButtonClass
      : this.inactiveButtonClass;
  }

  setOrientationToolbarButtonClass(activeOrientation: string): void {
    if (Object.values(ActiveOrientations).includes(<ActiveOrientations>activeOrientation)) {
      switch (activeOrientation) {
        case ActiveOrientations.Desktop:
          this.builderService.activeOrientation.next(this.ACTIVE_TABLET_ORIENTATION);
          break;
        case ActiveOrientations.Tablet:
          this.builderService.activeOrientation.next(this.ACTIVE_MOBILE_ORIENTATION);
          break;
        case ActiveOrientations.Mobile:
          this.builderService.activeOrientation.next(this.ACTIVE_DESKTOP_ORIENTATION);
          break;
        default:
          break;
      }
      this.builderToolbarElementService.activeToolbarElement.next('orientation');
    }
  }
}
