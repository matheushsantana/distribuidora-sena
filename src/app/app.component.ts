import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { slideInAnimation } from './animations';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user';
import { ClienteLogado } from './cliente/clienteLogado.service';
import { ClienteVerificaCadastro } from './cliente/clienteVefificaCadastro.service';
import { Cliente } from './cliente/shared/cliente';
import { AuthGuard } from './guards/auth.guard';
import { CarrinhoService } from './carrinho/shared/carrinho.service';

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
  qtdProdutos: number = 0;
  auxMenu: boolean = false;
  pedidoAtivo: boolean = false;

  constructor(private authService: AuthService, private router: Router, private clienteLogado: ClienteLogado,
    private clienteVerificaCadastro: ClienteVerificaCadastro, private authGuard: AuthGuard,
    private carrinhoService: CarrinhoService) {
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
          this.auxMenu = true
          this.carrinhoService.pegaQtdProds().subscribe(dados => {
            if(dados.length != 0){
              this.qtdProdutos = dados[0].valor
            }
          });
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
  
  mudaBarraBusca(){
    var aux = document.createElement('nav2').style
    aux.backgroundColor = 'blue'
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
    appComponent.verficaPedido()
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
      this.pedidoAtivo = true
    } else {
      this.router.navigate(['/carrinho', this.clienteLogado.cliente.id]);
      this.pedidoAtivo = false
    }
  }

  verficaPedido(){
    if (this.clienteVerificaCadastro.pedido != null || this.clienteVerificaCadastro.pedido != undefined) {
      this.pedidoAtivo = true
    } else {
      this.pedidoAtivo = false
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

  scroll(){
    window.scrollTo(0, 0)
  }

}
