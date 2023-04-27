import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ISectionElement } from '../builder-section';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'section-element-link',
  templateUrl: './builder-section-element-link.component.html',
})
export class BuilderSectionElementLinkComponent {
  @Input() element: ISectionElement;
  @Input() previewMode: boolean;
  @Input() websiteMode: boolean;

  ngUnsubscribe = new Subject<void>();
  constructor(private builderService: BuilderService) {}

  handleClick(): void {
    if ((this.previewMode || this.websiteMode) && this.element.link && this.element.link.type) {
      switch (this.element.link.type) {
        case 'url':
          this.openUrl();
          break;
        case 'page':
          this.setPage();
          break;
        default:
          break;
      }
    }
  }

  openUrl(): void {
    const link = this.element.link;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    link.newTab ? window.open(link.url, '_blank') : window.open(link.url, '_self');
  }

  setPage(): void {
    // currently limited to opening in the same tab
    this.builderService.activePageSetting.next(this.element.link.page);
    // this.builderService.activePageIndex.next(this);
  }
}
