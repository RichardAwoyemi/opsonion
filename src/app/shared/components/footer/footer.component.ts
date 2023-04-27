import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit, OnDestroy {
  isMobile: Observable<BreakpointState>;
  today: number = Date.now();
  copyrightMessage = ' Opsonion. All rights reserved.';
  ngUnsubscribe = new Subject<void>();
  currentRoute: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.routerService.currentRoute.pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      if (result) {
        this.currentRoute = result;
      }
    });
  }

  checkLoggedOutRoute(): boolean {
    return RouterService.checkLoggedOutRoute(this.currentRoute);
  }

  checkIfIsOnDomain(): boolean {
    return RouterService.checkIfIsOnDomain();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
