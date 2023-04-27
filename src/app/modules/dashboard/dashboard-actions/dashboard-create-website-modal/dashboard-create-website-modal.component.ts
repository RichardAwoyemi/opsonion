import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateService } from 'src/app/shared/services/template.service';
import { IModalComponent } from '../../../../shared/models/modal';
import { IUser } from '../../../../shared/models/user';
import { UtilService } from '../../../../shared/services/util.service';
import { WebsiteService } from '../../../../shared/services/website.service';
import { BuilderActionsService } from '../../../builder/builder-actions/builder-actions.service';
import { BuilderService } from '../../../builder/builder.service';
import * as fromUser from '../../../core/store/shared/user.reducer';
import { ActiveSettings } from 'src/app/modules/builder/builder';
import { BlacklistService } from '../../../../shared/services/blacklist.service';
import { ActiveUploadTypes } from '../../../builder/builder';

@Component({
  selector: 'app-dashboard-create-website-modal',
  templateUrl: './dashboard-create-website-modal.component.html',
})
export class DashboardCreateWebsiteModalComponent implements IModalComponent, OnInit, OnDestroy {
  user: IUser;
  disableSaveButton: boolean;
  websiteName: string;
  blacklistTerms: string[];
  ngUnsubscribe = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private builderService: BuilderService,
    private afs: AngularFirestore,
    private userStore: Store<fromUser.State>,
    private websiteService: WebsiteService,
    private templateService: TemplateService,
    private blacklistService: BlacklistService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.websiteName = UtilService.generateWebsiteName();
    this.userStore
      .select('user')
      .pipe()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });

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
    this.websiteName = this.websiteName.toLowerCase();
    if (
      !BlacklistService.checkAgainstBlacklist(this.blacklistTerms, this.websiteName) &&
      !UtilService.isNullOrWhitespace(this.websiteName)
    ) {
      this.websiteService
        .checkIfWebsiteNameIsAvailable(this.websiteName)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(async (websitesWithSameName) => {
          if (websitesWithSameName.length === 0) {
            const documentId = this.afs.createId();
            const documentPath = `websites/${documentId}`;
            await this.templateService.getWebsite('default').then((response) => {
              const documentRef: AngularFirestoreDocument = this.afs.doc(documentPath);
              this.websiteService
                .getWebsitesByUserId(this.user.uid)
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((websitesOwnedByUser) => {
                  if (websitesOwnedByUser.length < this.websiteService.MAX_NUMBER_OF_WEBSITES) {
                    documentRef
                      .set(
                        {
                          name: this.websiteName,
                          id: documentId,
                          createdBy: this.user.uid,
                          pages: response.pages,
                          template: response.template,
                          uploads: { [ActiveUploadTypes.Image]: [], [ActiveUploadTypes.Video]: [] },
                        },
                        { merge: true }
                      )
                      .then(() => {});
                    this.builderService.activeSetting.next(ActiveSettings.Templates);
                    this.builderService.activePageIndex.next(0);
                    this.toastrService.success('Your website has been created.');
                    this.activeModal.close();
                    this.router.navigateByUrl(`/builder/${documentId}`).then(() => {});
                  } else {
                    this.toastrService.error(
                      `You cannot create more than ${this.websiteService.MAX_NUMBER_OF_WEBSITES} websites on your current plan.`
                    );
                  }
                });
            });
          } else {
            this.toastrService.error('A website with this name already exists.');
          }
        });
    } else {
      this.toastrService.error('You cannot use this name. Please try something else.');
    }
  }

  validateWebsiteName(): void {
    this.disableSaveButton = BuilderActionsService.toggleWebsiteModalSaveButton(this.websiteName);
  }

  onCloseButtonClick(): void {
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
