import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-section-header-group',
  templateUrl: './section-header-group.component.html',
})
export class SectionHeaderGroupComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;

  isMobile: Observable<BreakpointState>;
  headerTopPadding$: Observable<{ [key: string]: string }>;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.headerTopPadding$ = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        map((isHandset) => (isHandset ? { 'padding-top': '2.5em' } : { 'padding-top': '0em' }))
      );
  }
}
