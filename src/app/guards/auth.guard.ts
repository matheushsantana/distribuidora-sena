import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CarrinhoComponent } from '../carrinho/carrinho.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { ProdutoSelecionadoComponent } from '../paginas/produto-selecionado/produto-selecionado.component';
import { PedidoComponent } from '../pedido/pedido.component';

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
    }else {
      this.router.navigate(['/'])
      return false;
    }
  }
}
