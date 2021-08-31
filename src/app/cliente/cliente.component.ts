import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ClienteLogado } from './clienteLogado.service';
import { ClienteVerificaCadastro } from './clienteVefificaCadastro.service';
import { Cliente } from './shared/cliente';
import { ClienteService } from './shared/cliente.service';
import { Location } from '@angular/common';
import { CalculaFrete } from '../carrinho/calculaFrete.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente: Cliente;

  constructor(private clienteLogado: ClienteLogado, private clienteService: ClienteService, private appComponent: AppComponent,
    private clienteVerificaCadastro: ClienteVerificaCadastro, private location: Location, private calculaFrete: CalculaFrete) { 
      this.appComponent.pedidoAtivo = false;
    }

  ngOnInit(): void {
    this.cliente = new Cliente();
    this.cliente.id = this.clienteLogado.cliente.id;
    this.cliente.nome = this.clienteLogado.cliente.nome;
    this.cliente.telefone = this.clienteVerificaCadastro.dadosCliente.telefone;
    this.cliente.enderecoRua = this.clienteVerificaCadastro.dadosCliente.enderecoRua;
    this.cliente.enderecoNumero = this.clienteVerificaCadastro.dadosCliente.enderecoNumero;
    this.cliente.enderecoBairro = this.clienteVerificaCadastro.dadosCliente.enderecoBairro;
  }

  onSubmit() {
    this.calculaFrete.freteCarregado = 3;
    this.clienteService.insertCliente(this.cliente);
    this.calculaFrete.pegaCoordenadas(this.cliente)
    this.location.back();
    this.appComponent.ngOnInit();
    this.cliente = new Cliente();
  }

  voltaPagina() {
    this.location.back();
  }

}
