import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '@services/generic';
import { HomeComponent } from '@views/private/home/home.component';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard {
  constructor(private router: Router) { }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!TokenService.getToken) {
      return true;
    } else {
      this.router.navigate([HomeComponent.PATH]);
      return false;
    }
  }
}
