import { Component, Input } from '@angular/core';
import { IframeService } from 'src/app/shared/services/iframe.service';
import { BuilderToolbarElementService } from '../builder-toolbar-element.service';
import { IElementSettings } from '../../../builder-sidebar/builder-sidebar-config/builder-sidebar-config';

@Component({
  selector: 'app-builder-toolbar-italic',
  templateUrl: './builder-toolbar-italic.component.html',
  styleUrls: ['../../builder-toolbar.component.css'],
})
export class BuilderToolbarItalicComponent {
  @Input() settings: IElementSettings;

  document = IframeService.getIframeElement('builder-showcase');

  constructor(private builderToolbarElementService: BuilderToolbarElementService) {}

  onButtonClick(commandName: string): void {
    this.builderToolbarElementService.activeToolbarElement.next('italic');
    this.builderToolbarElementService.applyFormatting(this.settings, commandName, this.document);
  }

  getToolbarButtonCommandState(commandName: string): string {
    return this.builderToolbarElementService.setFormatButtonClass(commandName, this.document);
  }
}
