import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BuilderToolbarElementService } from '../builder-toolbar-element.service';
import { IframeService } from 'src/app/shared/services/iframe.service';
import { IElementSettings } from '../../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';

@Component({
  selector: 'app-builder-toolbar-bold',
  templateUrl: './builder-toolbar-bold.component.html',
  styleUrls: ['../../builder-toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderToolbarBoldComponent {
  @Input() settings: IElementSettings;
  document = IframeService.getIframeElement('builder-showcase');

  constructor(private builderToolbarElementService: BuilderToolbarElementService) {}

  onButtonClick(commandName: string): void {
    this.builderToolbarElementService.activeToolbarElement.next('bold');
    this.builderToolbarElementService.applyFormatting(this.settings, commandName, this.document);
  }

  getToolbarButtonCommandState(commandName: string): string {
    return this.builderToolbarElementService.setFormatButtonClass(commandName, this.document);
  }
}
