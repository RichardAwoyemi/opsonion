import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IComponentMetadata } from '../../builder-components/builder-components';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { ISectionElement } from '../../builder-components/builder-section/builder-section';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-button',
  templateUrl: './builder-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderButtonComponent {
  @Input() componentMetadata: IComponentMetadata;
  @Input() element: ISectionElement;
  @Input() style = {};
  @Input() text: string | ArrayBuffer;
  @Input() prependClass = 'btn btn-lg btn-primary';
  @Input() displayOption = true;
  @Input() cyButtonTag: string;
  @Input() cyTextEditorTag: string;
  @Input() buttonLink: string;
  @Input() websiteMode: boolean;
  @Input() contenteditable: boolean;

  constructor(
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService
  ) {}

  setText(text: string): void {
    this.element.data.button.innerHtml = text;
  }

  selectButton(): void {
    if (this.websiteMode) {
      this.builderService.activePageSetting.next(this.buttonLink);
      this.builderService.activePageIndex.next(
        this.builderComponentsService.getPageIndex(this.buttonLink)
      );
    }
  }
}
