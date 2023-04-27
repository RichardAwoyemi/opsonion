import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { RouterService } from '../../../shared/services/router.service';

@Injectable({
  providedIn: 'root',
})
export class AnonymousGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn() && RouterService.checkIfIsOnDomain()) {
      this.router.navigate(['dashboard']).then(() => {});
    }
    if (!RouterService.checkIfIsOnDomain()) {
      this.router.navigate(['']).then(() => {});
    }
    return true;
  }
}
