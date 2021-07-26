import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user';
import { CalculaFrete } from './carrinho/calculaFrete.service';
import { ClienteLogado } from './cliente/clienteLogado.service';
import { ClienteVerificaCadastro } from './cliente/clienteVefificaCadastro.service';
import { Cliente } from './cliente/shared/cliente';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  user$: Observable<User> = null;
  authenticated$: Observable<boolean>;
  auxLogin: boolean = false
  idCliente: string;
  valor: string;
  cliente: Cliente;
  verificaPedido: boolean;
  test: Observable<any>;
  dadosCliente: any;
  endereco: string = 'carregando';
  ativaNav: boolean = true;
  admAutenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router, private clienteLogado: ClienteLogado,
    private clienteVerificaCadastro: ClienteVerificaCadastro, private authGuard: AuthGuard, private calculaFrete: CalculaFrete) {
    this.user$ = this.authService.getUser();
    this.authenticated$ = this.authService.authenticated();
    var inicializadora = this.authGuard.aux;
  }
  ngOnInit() {
    this.user$.subscribe(dados => {
      this.cliente = new Cliente();
      this.cliente.id = dados.id;
      this.cliente.nome = dados.firsname;
      this.cliente.tipo = dados.tipo;
      this.clienteLogado.recebeDados(this.cliente);
      if (this.cliente.tipo === 'cliente') {
        this.clienteVerificaCadastro.verifica()
        setTimeout(() => {
          this.dadosCliente = this.clienteVerificaCadastro.dadosCliente
          if (this.dadosCliente.enderecoRua != null || this.dadosCliente.enderecoRua != undefined) {
            this.endereco = this.dadosCliente.enderecoRua + ', ' + this.dadosCliente.enderecoNumero + ', ' + this.dadosCliente.enderecoBairro
          } else {
            this.endereco = 'Adicionar Endereço...'
          }
          this.ativaNav = true
          this.calculaFrete.calculaFrete();
          console.log('entrou cliente')
          this.carregaPagina();
        }, 1500);
      } else if (this.cliente.tipo === 'admin') {
        this.ativaNav = false;
        this.admAutenticated = true;
        this.router.navigate(['/admin/menu'])
        console.log('entrou admin')
        this.carregaPagina();
      }
    })
    setTimeout(() => {
      if(this.cliente.id == null){
        this.carregaPagina();
      }
    }, 500)
  }

  carregaPagina() {
    setTimeout(() => {
      var site = document.getElementById('site').style
      site.display = 'block';
      var carregamento = document.getElementById('carregamento')
      carregamento.classList.add("hide")
    }, 1500)
  }

  logout() {
    this.authService.logout();
    window.location.href = '/'
  }

  verifica() {
    if (this.clienteVerificaCadastro.pedido != null || this.clienteVerificaCadastro.pedido != undefined) {
      this.verificaPedido = true;
      this.router.navigate(['/pedido', this.clienteLogado.cliente.id]);
    } else {
      this.verificaPedido = false;
      this.router.navigate(['/carrinho', this.clienteLogado.cliente.id]);
    }
  }

  mudaCor() {
    console.log('funcionou')
  }

  atualizaEndereco() {
    this.router.navigate(['/cadastro/cliente'])
  }

}
