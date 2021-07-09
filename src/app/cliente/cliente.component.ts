import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ClienteLogado } from './clienteLogado.service';
import { ClienteVerificaCadastro } from './clienteVefificaCadastro.service';
import { Cliente } from './shared/cliente';
import { ClienteService } from './shared/cliente.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente: Cliente;

  constructor(private clienteLogado: ClienteLogado, private clienteService: ClienteService, private appComponent: AppComponent,
    private clienteVerificaCadastro: ClienteVerificaCadastro, private location: Location) { }

  ngOnInit(): void {
    this.cliente = new Cliente();
    this.cliente.id = this.clienteLogado.cliente.id;
    this.cliente.nome = this.clienteLogado.cliente.nome;
    this.cliente.telefone = this.clienteVerificaCadastro.dadosCliente.telefone;
  }

  onSubmit() {
    this.clienteService.insertCliente(this.cliente);
    this.cliente = new Cliente();
    this.appComponent.ngOnInit();
  }

  voltaPagina() {
    this.location.back();
  }

}
