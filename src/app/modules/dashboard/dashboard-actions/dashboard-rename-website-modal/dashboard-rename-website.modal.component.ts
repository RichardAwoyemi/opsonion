import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IModalComponent } from '../../../../shared/models/modal';
import { WebsiteService } from '../../../../shared/services/website.service';
import { BuilderActionsService } from '../../../builder/builder-actions/builder-actions.service';
import { BlacklistService } from '../../../../shared/services/blacklist.service';
import { UtilService } from '../../../../shared/services/util.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-dashboard-rename-website-modal',
  templateUrl: './dashboard-rename-website-modal.component.html',
  styleUrls: ['./dashboard-rename-website-modal.component.css'],
})
export class DashboardRenameWebsiteModalComponent implements IModalComponent, OnInit, OnDestroy {
  @Input() websiteName;
  @Input() websiteId;
  newWebsiteName: string;
  disableSaveButton: boolean;
  blacklistTerms: string[];

  ngUnsubscribe = new Subject<void>();

  constructor(
    private afs: AngularFirestore,
    private activeModal: NgbActiveModal,
    private authService: AuthService,
    private toastrService: ToastrService,
    private websiteService: WebsiteService,
    private blacklistService: BlacklistService
  ) {}

  ngOnInit(): void {
    this.newWebsiteName = this.websiteName.toLowerCase();

    this.blacklistService
      .getAllBlackListTerms()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((blacklistTerms) => {
        if (blacklistTerms) {
          this.blacklistTerms = blacklistTerms.flatMap((x) => x.blacklist);
        }
      });
  }

  onConfirmButtonClick(): void {
    if (
      !BlacklistService.checkAgainstBlacklist(this.blacklistTerms, this.newWebsiteName) &&
      !UtilService.isNullOrWhitespace(this.newWebsiteName)
    ) {
      this.websiteService
        .checkIfWebsiteNameIsAvailable(this.newWebsiteName.toLowerCase())
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((websites) => {
          this.websiteService.renameWebsite(
            this.authService.isLoggedIn(),
            websites,
            this.activeModal,
            this.websiteId,
            this.newWebsiteName.toLowerCase()
          );
        });
    } else {
      this.toastrService.error('You cannot use this name. Please try something else.');
    }
  }

  onCloseButtonClick(): void {
    this.websiteService.websiteName.next(this.websiteName.toLowerCase());
    this.activeModal.dismiss();
  }

  validateWebsiteName(): void {
    this.disableSaveButton = BuilderActionsService.toggleWebsiteModalSaveButton(
      this.websiteName.toLowerCase()
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
