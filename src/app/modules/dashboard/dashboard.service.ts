import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveSidebarSettings } from './dashboard';

@Injectable()
export class DashboardService {
  activeSidebarSetting = new BehaviorSubject<string>(ActiveSidebarSettings.Websites);

  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  triggerScrollTo(elementId = null): void {}
}
