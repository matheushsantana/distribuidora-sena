import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { slideInAnimation } from './animations';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user';
import { ClienteLogado } from './cliente/clienteLogado.service';
import { ClienteVerificaCadastro } from './cliente/clienteVefificaCadastro.service';
import { Cliente } from './cliente/shared/cliente';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent {

  user$: Observable<User> = null;
  authenticated$: Observable<boolean>;
  cliente: Cliente;
  endereco: string = 'carregando';
  ativaNav: boolean = true;
  admAutenticated: boolean = false;
  menuPerfil: boolean = true;

  constructor(private authService: AuthService, private router: Router, private clienteLogado: ClienteLogado,
    private clienteVerificaCadastro: ClienteVerificaCadastro, private authGuard: AuthGuard) {
    this.user$ = this.authService.getUser();
    this.authenticated$ = this.authService.authenticated();
  }

  ngOnInit() {
    window.scrollTo(0, 0)
    setTimeout(() => {
      this.user$.subscribe(dados => {
        this.cliente = new Cliente();
        this.cliente.id = dados.id;
        this.cliente.nome = dados.firsname;
        this.cliente.tipo = dados.tipo;
        this.clienteLogado.recebeDados(this.cliente);
        if (this.cliente.tipo === 'cliente') {
          this.clienteVerificaCadastro.verifica(this, this.pegaEndereco)
          this.authGuard.canActivate;
        } else if (this.cliente.tipo === 'admin') {
          this.ativaNav = false;
          this.admAutenticated = true;
          this.carregaPagina();
          this.router.navigate(['/admin/menu'])
        }
      })
      setTimeout(() => {
        if(this.cliente.id == null){
          this.carregaPagina();
        }
      }, 1500)
    }, 500)
    
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  pegaEndereco(appComponent, dados){
    if (dados.enderecoRua != null || dados.enderecoRua != undefined) {
      appComponent.endereco = dados.enderecoRua + ', ' + dados.enderecoNumero + ', ' + dados.enderecoBairro
    } else {
      appComponent.endereco = 'Adicionar Endereço...'
    }
    appComponent.ativaNav = true
    appComponent.carregaPagina();
  }

  carregaPagina() {
    var site = document.getElementById('site').style
    site.display = 'block';
    var carregamento = document.getElementById('carregamento')
    carregamento.classList.add("hide")
  }

  verifica() {
    if (this.clienteVerificaCadastro.pedido != null || this.clienteVerificaCadastro.pedido != undefined) {
      this.router.navigate(['/pedido', this.clienteLogado.cliente.id]);
    } else {
      this.router.navigate(['/carrinho', this.clienteLogado.cliente.id]);
    }
  }

  verifica2(){
    if(this.cliente.id == null){
      this.router.navigate(['/auth/login'])
    }
  }

  logout() {
    this.authService.logout();
    setTimeout(() => {
      window.location.href = '/'
    }, 500);
  }

}
