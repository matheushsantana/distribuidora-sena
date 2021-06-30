import { Component, OnInit } from '@angular/core';
import { ClienteLogado } from './clienteLogado.service';
import { Cliente } from './shared/cliente';
import { ClienteService } from './shared/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente: Cliente;

  constructor(private clienteLogado: ClienteLogado, private clienteService: ClienteService,) { }

  ngOnInit(): void {
    this.cliente = new Cliente();
    this.cliente.id = this.clienteLogado.cliente.id;
    this.cliente.nome = this.clienteLogado.cliente.nome;
  }

  onSubmit() {
    this.clienteService.insertCliente(this.cliente);
    this.cliente = new Cliente();
  }

}
