import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterService } from '../../../shared/services/router.service';

@Injectable({
  providedIn: 'root',
})
export class SubdomainGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (RouterService.checkIfIsOnDomain()) {
      this.router.navigate(['home']).then(() => {});
    }
    return true;
  }
}
