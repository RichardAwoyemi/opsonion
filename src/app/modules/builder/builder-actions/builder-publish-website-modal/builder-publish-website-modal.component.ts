import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IModalComponent } from '../../../../shared/models/modal';
import { WebsiteService } from '../../../../shared/services/website.service';

@Component({
  selector: 'app-builder-publish-website-modal',
  templateUrl: './builder-publish-website-modal.component.html',
})
export class BuilderPublishWebsiteModalComponent implements IModalComponent, OnInit, OnDestroy {
  websiteId: string;

  ngUnsubscribe = new Subject<void>();

  constructor(
    public afAuth: AngularFireAuth,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private websiteService: WebsiteService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.websiteService.websiteId.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.websiteId = response;
      }
    });
  }

  onCloseButtonClick(): void {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick(): void {
    this.activeModal.dismiss();
    this.afAuth.authState.pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      if (result) {
        this.websiteService
          .saveWebsite(result.uid)
          .then(() => {
            this.router.navigate(['websites', this.websiteId]).then(() => {
              this.toastrService.success('Your website has been published.', 'Great!');
            });
          })
          .catch(() => {
            this.toastrService.error('Your website could not be saved. Please try again.', 'Oops!');
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
