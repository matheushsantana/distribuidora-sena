import { Component, OnInit } from '@angular/core';
import { ClienteLogado } from 'src/app/cliente/clienteLogado.service';
import { Cliente } from 'src/app/cliente/shared/cliente';

@Component({
  selector: 'app-ir-carrinho',
  templateUrl: './ir-carrinho.component.html',
  styleUrls: ['./ir-carrinho.component.css']
})
export class IrCarrinhoComponent implements OnInit {

  cliente = new Cliente();

  constructor(private clienteLogado: ClienteLogado) { }

  ngOnInit(): void {

    this.cliente = this.clienteLogado.cliente
  
  }

}
