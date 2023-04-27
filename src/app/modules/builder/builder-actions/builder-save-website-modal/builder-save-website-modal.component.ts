import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IModalComponent } from '../../../../shared/models/modal';
import { IWebsite } from '../../../../shared/models/website';
import { WebsiteService } from '../../../../shared/services/website.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';

@Component({
  selector: 'app-builder-confirm-save-modal',
  templateUrl: './builder-save-website-modal.component.html',
})
export class BuilderSaveWebsiteModalComponent implements IModalComponent, OnInit, OnDestroy {
  website: IWebsite;
  websiteName: string;
  uid: string;
  ngUnsubscribe = new Subject<void>();

  constructor(
    public afAuth: AngularFireAuth,
    private activeModal: NgbActiveModal,
    private websiteService: WebsiteService,
    private builderComponentsService: BuilderComponentsService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.builderComponentsService.website
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response) {
          this.website = response;
        }
      });

    this.websiteService.websiteName.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.websiteName = response;
      }
    });
  }

  onConfirmButtonClick(): void {
    this.activeModal.dismiss();
    this.afAuth.authState.pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      if (result) {
        this.websiteService
          .saveWebsite(result.uid)
          .then(() => {
            this.toastrService.success('Your website has been saved.', 'Great!');
          })
          .catch(() => {
            this.toastrService.error('Your website could not be saved. Please try again.', 'Oops!');
          });
      }
    });
  }

  onCloseButtonClick(): void {
    this.activeModal.dismiss();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
