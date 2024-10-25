import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '@services/generic';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) { }
  
  // Aca se deberia decodificar el jwt, pero al ser con json-server no se realiza, 
  // solo se verifica si se obtiene para verificar que este logueado, tambien se podria verificar expiracion del token.
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (TokenService.getToken) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
