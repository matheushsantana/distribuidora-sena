import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClienteLogado } from '../cliente/clienteLogado.service';
import { Pedido } from './shared/pedido';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  pedido: Pedido
  infoPedido: Pedido;
  carregando: boolean;

  url = 'https://projeto-distribuidora-default-rtdb.firebaseio.com/cliente/';

  constructor(private http: HttpClient, private clienteLogado: ClienteLogado) { }

  ngOnInit(): void {
    this.carregando = false;
    setTimeout(() => {
      this.preencheCampos()
      this.carregando = true;
    }, 2500);
  }

  pegarDados() {
    return this.http.get<Pedido>(`${this.url + this.clienteLogado.cliente.id + '/pedido.json'}`);
  }

  preencheCampos(){
    this.pegarDados().subscribe(dados => {
      this.pedido = dados;
      this.carregando = true;
    })
  }

}
