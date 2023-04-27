import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
})
export class HomeHeaderComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  mobileTitle = 'No coders.<br>No designers.<br>No barriers.';
  desktopTitle = 'No coders. No designers. No barriers.';
  subtitle = 'Opsonion is a platform that makes building websites easier than ever.';
  headerHeight$: Observable<string>;
  rowAlignment$: Observable<string>;

  constructor(private breakpointObserver: BreakpointObserver, public router: Router) {}

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.headerHeight$ = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map((isHandset) => (isHandset ? 'header' : 'header h-fullscreen')));
    this.rowAlignment$ = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        map((isHandset) =>
          isHandset ? 'row align-items-center h-100' : 'row align-items-center h-100'
        )
      );
  }
}
