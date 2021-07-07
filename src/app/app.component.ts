import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user';
import { ClienteLogado } from './cliente/clienteLogado.service';
import { ClienteVerificaCadastro } from './cliente/clienteVefificaCadastro.service';
import { Cliente } from './cliente/shared/cliente';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
  endereco: string = 'carregando'

  constructor(private authService: AuthService, private router: Router, private clienteLogado: ClienteLogado, private clienteVerificaCadastro: ClienteVerificaCadastro) {
    this.user$ = this.authService.getUser();
    this.authenticated$ = this.authService.authenticated();
  }
  ngOnInit() {
    this.user$.subscribe(dados => {
      this.cliente = new Cliente();
      this.cliente.id = dados.id;
      this.cliente.nome = dados.firsname;
      this.clienteLogado.recebeDados(this.cliente);
      this.clienteVerificaCadastro.verifica()
      setTimeout(() => {
        this.dadosCliente = this.clienteVerificaCadastro.dadosCliente
        if (this.dadosCliente.enderecoRua != null || this.dadosCliente.enderecoRua != undefined) {
          this.endereco = this.dadosCliente.enderecoRua + ', ' + this.dadosCliente.enderecoNumero + ', ' + this.dadosCliente.enderecoBairro
        } else {
          this.endereco = 'Adicionar Endereço...'
        }
      }, 2000);
    })
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
      this.verificaPedido = false
      this.router.navigate(['/carrinho', this.clienteLogado.cliente.id]);
    }
  }

  mudaCor() {
    console.log('funcionou')
  }
}
