import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleModalService } from '../../../shared/components/simple-modal/simple-modal.service';
import { BlacklistService } from '../../../shared/services/blacklist.service';
import { UtilService } from '../../../shared/services/util.service';
import { AuthService } from '../../auth/auth.service';
import { BuilderActionsService } from '../builder-actions/builder-actions.service';
import { BuilderCreateAccountModalComponent } from '../builder-actions/builder-create-account-modal/builder-create-account-modal.component';
import { BuilderPublishWebsiteModalComponent } from '../builder-actions/builder-publish-website-modal/builder-publish-website-modal.component';
import { BuilderRenameWebsiteModalComponent } from '../builder-actions/builder-rename-website-modal/builder-rename-website-modal.component';
import { BuilderService } from '../builder.service';
import { HTMLInputEvent } from '../../../shared/models/html-input-event';

@Component({
  selector: 'app-builder-header',
  templateUrl: './builder-header.component.html',
  styleUrls: ['./builder-header.component.css'],
})
export class BuilderHeaderComponent {
  @Input() websiteName;
  @Input() blacklistTerms;
  @Input() renameWebsiteModalStatus;
  @Input() websiteLoaded;
  @Input() user;

  photoURL = '/assets/img/anonymous.jpg';
  hideImageProfilePicture = false;

  constructor(
    private modalService: NgbModal,
    public authService: AuthService,
    private builderActionsService: BuilderActionsService,
    private simpleModalService: SimpleModalService,
    public router: Router
  ) {}

  openCreateAccountModal(): void {
    this.modalService.open(BuilderCreateAccountModalComponent, {
      windowClass: 'modal-holder',
      centered: true,
    });
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['home']).then(() => {});
  }

  redirectToDashboard(): void {
    this.router.navigate(['dashboard']).then(() => {});
  }

  removeLineBreaks(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    BuilderService.removeLineBreaks(event);
  }

  openRenameWebsiteModal(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (
      !BlacklistService.checkAgainstBlacklist(
        this.blacklistTerms,
        (event as HTMLInputEvent).target.innerHTML
      ) &&
      !UtilService.isNullOrWhitespace((event as HTMLInputEvent).target.innerHTML)
    ) {
      if (
        this.websiteName !== (event as HTMLInputEvent).target.innerHTML &&
        !this.renameWebsiteModalStatus
      ) {
        this.builderActionsService.renameRenameWebsiteModalStatus.next({ open: true });
        const modal = this.modalService.open(BuilderRenameWebsiteModalComponent, {
          windowClass: 'modal-holder',
          centered: true,
        });
        modal.componentInstance.websiteName = this.websiteName.toLowerCase();
        modal.componentInstance.newWebsiteName = (event as HTMLInputEvent).target.innerText.toLowerCase();
      }
    } else {
      document.getElementById(
        'builder-header-website-name'
      ).innerText = this.websiteName.toLowerCase();
      this.simpleModalService.displayMessage(
        'Oops!',
        'You cannot use this name. Please try something else.'
      );
    }
  }

  redirect(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']).then(() => {});
    } else {
      this.router.navigate(['home']).then(() => {});
    }
  }

  openPublishModal(): void {
    if (!this.authService.isLoggedIn()) {
      this.modalService.open(BuilderCreateAccountModalComponent, {
        windowClass: 'modal-holder',
        centered: true,
      });
    } else {
      this.modalService.open(BuilderPublishWebsiteModalComponent, {
        windowClass: 'modal-holder',
        centered: true,
      });
    }
  }

  handleImageError(): void {
    this.hideImageProfilePicture = true;
  }
}
