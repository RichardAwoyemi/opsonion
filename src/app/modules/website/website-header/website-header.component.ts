import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from '../../../shared/services/website.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-website-header',
  templateUrl: './website-header.component.html',
  styleUrls: ['./website-header.component.css'],
})
export class WebsiteHeaderComponent implements OnInit, OnDestroy {
  isMobile: Observable<BreakpointState>;
  id: string;
  websiteName: string;

  ngUnsubscribe = new Subject<void>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private websiteService: WebsiteService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);

    this.websiteService.websiteName.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.websiteName = `${response}.opsn.io`;
      }
    });
  }

  redirectToDashboard(): void {
    this.router.navigate(['dashboard']).then(() => {});
  }

  redirectToBuilder(): void {
    this.router.navigate(['builder', this.id]).then(() => {});
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  redirectToWebsite(): void {
    if (this.websiteName) {
      window.open(this.websiteName, '_blank');
    } else {
      window.open(environment.domainUrl, '_blank');
    }
    window.focus();
  }
}
