import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RouterService {
  currentRoute = new BehaviorSubject<string>('/');

  constructor(public router: Router) {}

  static getCurrentRoute(): string {
    const currentRoute = localStorage.getItem('currentRoute');
    if (!currentRoute) {
      return 'dashboard';
    }
    return currentRoute;
  }

  static checkLoggedOutRoute(currentRoute: string): boolean {
    return (
      currentRoute === '/' ||
      currentRoute === '/login' ||
      currentRoute === '/register' ||
      currentRoute === '/press' ||
      currentRoute === '/legal' ||
      currentRoute === '/forgot-password' ||
      currentRoute === '/verify-email' ||
      currentRoute.includes('/invite/')
    );
  }

  static checkIfIsOnDomain(): boolean {
    const full = window.location.host;
    const parts = full.split('.');
    let result = true;
    if (parts.length === 3 && parts[1] !== 'netlify') {
      result = false;
      (<RouterWindow>(<unknown>window)).Intercom('update', {
        hide_default_launcher: true,
      });
    }
    return result;
  }

  setCurrentRoute(): void {
    if (
      this.currentRoute.getValue().indexOf('website') > -1 ||
      this.currentRoute.getValue().indexOf('builder') > -1
    ) {
      (<RouterWindow>(<unknown>window)).Intercom('update', {
        hide_default_launcher: true,
      });
    } else {
      (<RouterWindow>(<unknown>window)).Intercom('update', {
        hide_default_launcher: false,
      });
    }
    localStorage.setItem('currentRoute', this.currentRoute.getValue());
  }
}

export interface RouterWindow extends Window {
  Intercom(update: string, params: { hide_default_launcher: boolean }): void;
}
