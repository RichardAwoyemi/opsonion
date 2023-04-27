import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser } from '../../../../shared/models/user';
import { DataService } from '../../../../shared/services/data.service';
import * as fromUser from '../../../core/store/shared/user.reducer';
import { ITemplate } from '../../../../shared/models/template';
import { UtilService } from '../../../../shared/services/util.service';
import { S3_MEDIA_BUCKET_URL } from '../../../builder/builder';

@Component({
  selector: 'app-dashboard-body-templates',
  templateUrl: './dashboard-body-templates.component.html',
})
export class DashboardBodyTemplatesComponent implements OnInit, OnDestroy {
  user: IUser;
  innerHeight: number;
  searchText: string;
  webTemplates: ITemplate[];
  S3_COMPONENT_TEMPLATES_BUCKET_URL = `${S3_MEDIA_BUCKET_URL}/templates`;

  ngUnsubscribe = new Subject<void>();

  constructor(
    private dataService: DataService,
    private userStore: Store<fromUser.State>,
    private ngxLoader: NgxUiLoaderService
  ) {}

  asType(template: unknown): ITemplate {
    return <ITemplate>template;
  }

  ngOnInit(): void {
    this.ngxLoader.start();

    this.innerHeight = window.innerHeight;

    this.dataService
      .getAllWebTemplates()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response) {
          this.webTemplates = response.flat(1);
        }
      });

    this.userStore
      .select('user')
      .pipe()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });

    this.ngxLoader.stop();
  }

  trim(): void {
    if (!UtilService.isNullOrWhitespace(this.searchText)) {
      this.searchText.trim();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
