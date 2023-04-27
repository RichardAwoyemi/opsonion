import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WebsiteService } from '../../../../shared/services/website.service';

@Component({
  selector: 'app-home-build-button',
  templateUrl: './home-build-button.component.html',
})
export class HomeBuildButtonComponent {
  @Input() position: string;

  constructor(public router: Router, public websiteService: WebsiteService) {}

  setButtonAlignment(position: string): string {
    if (position === 'center') {
      return 'gap-xy text-center';
    }
    if (position === 'left') {
      return 'gap-xy';
    }
  }

  redirectToBuilder(): void {
    this.websiteService.createWebsite();
  }
}
