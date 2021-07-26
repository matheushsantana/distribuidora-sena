import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../produtos/shared/produto';
import { Pedido } from './shared/pedido';
import { PedidoService } from './shared/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  pedido: Pedido;
  infoPedido: Observable<any>;
  statuspedido: Observable<any>;
  carregando: boolean;
  produtos: Produto[];
  listaProduto: any;
  loop: any;

  estado = ['Aguardando a Distribuidora aceitar...', 'Pedido em preparo pela Distribuidora...', 'Pedido saiu para entrega...', 'Pedido finalizado...', 'Seu pedido foi cancelado...']

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.carregando = false;
    this.pedidoService.getAllPedido().subscribe(dados => {
      this.pedido = dados[1]
      this.infoPedido = dados[1]
      this.carregando = true;
    })
    this.pedidoService.getAllPedidoProdutos().subscribe(dados => {
      this.produtos = dados
    });

    setTimeout(() => {
      this.loop = setInterval(() => {
        console.log('entrou loop')
        this.barraStatus();
      }, 10000)
      this.barraStatus();
    }, 500)
  }

  barraStatus() {
    this.statuspedido = this.infoPedido['estado']
    var barra = document.getElementById('progressBar') as HTMLElement
    if (String(this.statuspedido) == this.estado[0]) {
      barra.style.width = '20%'
    }
    if (String(this.statuspedido) == this.estado[1]) {
      barra.style.width = '40%'
    }
    if (String(this.statuspedido) == this.estado[2]) {
      barra.style.width = '70%'
    }
    if (String(this.statuspedido) == this.estado[3]) {
      barra.style.width = '100%'
      barra.className = 'progress-bar progress-bar-striped bg-success'
      setTimeout(() => {
        window.location.href = "/"
      }, 2500)
    }
    if (String(this.statuspedido) == this.estado[4]) {
      barra.style.width = '100%'
      barra.className = 'progress-bar progress-bar-striped bg-danger'
      setTimeout(() => {
        window.location.href = "/"
      }, 2500)
    }
  }

}
