import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { WebsiteService } from '../../services/website.service';
import { IUser } from '../../models/user';
import { ITemplate } from '../../models/template';

@Component({
  selector: 'app-browser-mockup',
  templateUrl: './browser-mockup.component.html',
  styleUrls: ['./browser-mockup.component.css'],
})
export class BrowserMockupComponent implements OnInit {
  @Input() img: string;
  @Input() view: string;
  @Input() template: ITemplate;
  @Input() user: IUser;

  isMobile: Observable<BreakpointState>;
  imageStyle: { [key: string]: number };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private websiteService: WebsiteService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
  }

  setImageOpacity(opacity: number): void {
    this.imageStyle = { opacity: opacity };
  }

  createWebsite(): void {
    this.websiteService.createWebsiteFromTemplate(this.template, this.user);
  }
}
