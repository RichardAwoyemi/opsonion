import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../../../../shared/models/user';
import { WebsiteService } from '../../../../shared/services/website.service';
import * as fromUser from '../../../core/store/shared/user.reducer';
import { DashboardCreateWebsiteModalComponent } from '../../dashboard-actions/dashboard-create-website-modal/dashboard-create-website-modal.component';
import { DashboardDeleteWebsiteModalComponent } from '../../dashboard-actions/dashboard-delete-website-modal/dashboard-delete-website-modal.component';
import { DashboardRenameWebsiteModalComponent } from '../../dashboard-actions/dashboard-rename-website-modal/dashboard-rename-website.modal.component';
import { takeUntil } from 'rxjs/operators';
import { IWebsite } from '../../../../shared/models/website';

@Component({
  selector: 'app-dashboard-body-websites',
  templateUrl: './dashboard-body-websites.component.html',
  styleUrls: ['./dashboard-body-websites.component.css'],
})
export class DashboardBodyWebsitesComponent implements OnInit, OnDestroy {
  innerHeight: number;
  websites: IWebsite[];
  user: IUser;
  isMobile: Observable<BreakpointState>;

  ngUnsubscribe = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private websiteService: WebsiteService,
    private ngxLoader: NgxUiLoaderService,
    private userStore: Store<fromUser.State>,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.ngxLoader.start();
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.innerHeight = window.innerHeight;
    this.userStore
      .select('user')
      .pipe()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
          this.websiteService
            .getWebsitesByUserId(this.user.uid)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => {
              if (response) {
                this.websites = response;
              }
            });
        }
      });
    this.ngxLoader.stop();
  }

  openCreateWebsiteModal(): void {
    this.modalService.open(DashboardCreateWebsiteModalComponent, {
      windowClass: 'modal-holder',
      centered: true,
    });
  }

  openBuilderPage(uid: string): void {
    this.router.navigate([`builder/${uid}`]).then(() => {});
  }

  openPreviewPage(uid: string): void {
    this.router.navigate([`websites/${uid}`]).then(() => {});
  }

  openDeleteWebsiteModal(uid: string, name: string): void {
    const modal = this.modalService.open(DashboardDeleteWebsiteModalComponent, {
      windowClass: 'modal-holder',
      centered: true,
    });
    modal.componentInstance.websiteId = uid;
    modal.componentInstance.websiteName = name;
  }

  openRenameWebsiteModal(uid: string, name: string): void {
    const modal = this.modalService.open(DashboardRenameWebsiteModalComponent, {
      windowClass: 'modal-holder',
      centered: true,
    });
    modal.componentInstance.websiteId = uid;
    modal.componentInstance.websiteName = name;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
