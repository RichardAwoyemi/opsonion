import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IModalComponent } from '../../../../shared/models/modal';
import { WebsiteService } from '../../../../shared/services/website.service';
import { BuilderService } from '../../builder.service';
import { BuilderActionsService } from '../builder-actions.service';
import { AuthService } from '../../../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-builder-rename-website-modal',
  templateUrl: './builder-rename-website-modal.component.html',
})
export class BuilderRenameWebsiteModalComponent implements OnInit, IModalComponent, OnDestroy {
  @Input() websiteName;
  @Input() newWebsiteName;
  uid: string;
  isLoggedIn: boolean;

  ngUnsubscribe = new Subject<void>();

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private activeModal: NgbActiveModal,
    private builderService: BuilderService,
    private builderActionsService: BuilderActionsService,
    private websiteService: WebsiteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      if (result) {
        this.uid = result.uid;
      }
    });
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onConfirmButtonClick(): void {
    if (this.isLoggedIn && this.uid) {
      this.websiteService.saveWebsite(this.uid);
    }
    this.websiteService
      .checkIfWebsiteNameIsAvailable(this.newWebsiteName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((websites) => {
        this.websiteService.renameWebsite(
          this.isLoggedIn,
          websites,
          this.activeModal,
          this.websiteService.websiteId.getValue(),
          this.newWebsiteName.toLowerCase()
        );
      });
    this.builderActionsService.renameRenameWebsiteModalStatus.next({ open: false });
  }

  onCloseButtonClick(): void {
    this.websiteService.websiteName.next(this.websiteName);
    document.getElementById(
      'builder-header-website-name'
    ).innerText = this.websiteName.toLowerCase();
    this.builderActionsService.renameRenameWebsiteModalStatus.next({ open: false });
    this.activeModal.dismiss();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
