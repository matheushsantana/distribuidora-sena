import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { slideInAnimation } from './animations';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user';
import { ClienteLogado } from './cliente/clienteLogado.service';
import { ClienteVerificaCadastro } from './cliente/clienteVefificaCadastro.service';
import { Cliente } from './cliente/shared/cliente';
import { AuthGuard } from './guards/auth.guard';
import { CarrinhoService } from './carrinho/shared/carrinho.service';
import { EstadoDistribuidoraGuard } from './guards/estadoDistribuidora.guard';
import { EstadoDistribuidora } from './guards/estadoDistribuidora';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
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
  estadoDistribuidora: string = 'Aberto';
  estadoBtn: string = '....';

  constructor(private authService: AuthService, private router: Router, private clienteLogado: ClienteLogado,
    private clienteVerificaCadastro: ClienteVerificaCadastro, private authGuard: AuthGuard,
    private carrinhoService: CarrinhoService, private estadoDistribuidoraGuard: EstadoDistribuidoraGuard) {
    this.user$ = this.authService.getUser();
    this.authenticated$ = this.authService.authenticated();
  }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.estadoDistribuidoraGuard.verificaEstado(this, this.pegaCliente)
  }

  pegaCliente(appComponent) {
    appComponent.user$.subscribe(dados => {
      appComponent.cliente = new Cliente();
      appComponent.cliente.id = dados.id;
      appComponent.cliente.nome = dados.firsname;
      appComponent.cliente.tipo = dados.tipo;
      appComponent.clienteLogado.recebeDados(appComponent.cliente);
      if (appComponent.cliente.tipo === 'cliente') {
        appComponent.auxMenu = true
        appComponent.carrinhoService.pegaQtdProds().subscribe(dados => {
          if (dados.length != 0) {
            appComponent.qtdProdutos = dados[0].valor
          }
          appComponent.carregaPagina();
          if (appComponent.estadoDistribuidoraGuard.estado['chave'] == 'Aberto') {
            appComponent.estadoDistribuidora = 'Aberto'
          } else {
            appComponent.estadoDistribuidora = 'Fechado'
            var carregamento = document.getElementById('carregamento')
            carregamento.classList.add("hide")
          }
        });
        appComponent.clienteVerificaCadastro.verifica(appComponent, appComponent.pegaEndereco)
        appComponent.authGuard.canActivate;
      } else if (appComponent.cliente.tipo === 'admin') {
        appComponent.estadoDistribuidora = 'Aberto'
        appComponent.ativaNav = false;
        appComponent.admAutenticated = true;
        appComponent.carregaPagina();
        appComponent.router.navigate(['/admin/menu'])
        setTimeout(() => {
          appComponent.mudaBotao();
        }, 600)

      }
    })
    setTimeout(() => {
      if (appComponent.cliente.id == null) {
        appComponent.carregaPagina();
        if (appComponent.estadoDistribuidoraGuard.estado['chave'] == 'Aberto') {
          appComponent.estadoDistribuidora = 'Aberto'
        } else {
          appComponent.estadoDistribuidora = 'Fechado'
          var carregamento = document.getElementById('carregamento')
          carregamento.classList.add("hide")
        }
      }
    }, 1500)

  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  pegaEndereco(appComponent, dados) {
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

  verifica2() {
    if (this.cliente.id == null) {
      this.router.navigate(['/auth/login'])
    }
  }

  logout() {
    this.authService.logout();
    setTimeout(() => {
      window.location.href = '/'
    }, 500);
  }

  scroll() {
    window.scrollTo(0, 0)
  }

  mudaEstado() {
    var aux = new EstadoDistribuidora();
    if (this.estadoDistribuidoraGuard.estado['chave'] == 'Aberto') {
      aux.chave = 'Fechado'
      this.estadoDistribuidoraGuard.mudaEstado(aux)
      this.mudaBotao()
    } else if (this.estadoDistribuidoraGuard.estado['chave'] == 'Fechado') {
      aux.chave = 'Aberto'
      this.estadoDistribuidoraGuard.mudaEstado(aux)
      this.mudaBotao()
    }
  }

  mudaBotao() {
    var btnEstado = document.getElementById('flexSwitchCheckChecked') as HTMLInputElement
    if (this.estadoDistribuidoraGuard.estado['chave'] == 'Aberto') {
      this.estadoBtn = 'Distribuidora Aberta'
      btnEstado.checked = true
    } else {
      this.estadoBtn = 'Distribuidora Fechada'
      btnEstado.checked = false
    }

  }
}
