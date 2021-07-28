import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  aux: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { this.authService.usuarioAutenticado().subscribe(dados => {
    this.aux = dados
  }) }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
  

    if(this.aux != null){
      return true;
    }
    this.router.navigate(['/'])
    return false;
  }
}
