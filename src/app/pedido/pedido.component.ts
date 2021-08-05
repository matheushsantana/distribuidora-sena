import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculaFrete } from '../carrinho/calculaFrete.service';
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
  tempoEntrega: string = ''

  estado = ['Aguardando a Distribuidora aceitar...', 'Pedido em preparo pela Distribuidora...', 'Pedido saiu para entrega...', 'Pedido finalizado...', 'Seu pedido foi cancelado...']

  constructor(private pedidoService: PedidoService, private calculaFrete: CalculaFrete) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.calculaFrete.calculaFrete(this, this.pegaPedido);
    this.carregando = false;
  
    setTimeout(() => {
      this.loop = setInterval(() => {
        this.barraStatus();
      }, 10000)
      this.barraStatus();
    }, 500)
  }

  pegaPedido(comp, aux){
    comp.pedidoService.getAllPedido().subscribe(dados => {
      comp.pedido = dados[1]
      comp.infoPedido = dados[1]
      comp.carregando = true;
    })
    comp.pedidoService.getAllPedidoProdutos().subscribe(dados => {
      comp.produtos = dados
    });
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
      this.tempoEntrega = ' Tempo Estimado: ' + (this.calculaFrete.precoFrente * 2) + ' minutos'
    }
    if (String(this.statuspedido) == this.estado[3]) {
      barra.style.width = '100%',
      barra.className = 'progress-bar progress-bar-striped bg-success',
      this.tempoEntrega = ''
      setTimeout(() => {
        window.location.href = "/"
      }, 3000)
    }
    if (String(this.statuspedido) == this.estado[4]) {
      barra.style.width = '100%',
      barra.className = 'progress-bar progress-bar-striped bg-danger',
      this.tempoEntrega = ''
      setTimeout(() => {
        window.location.href = "/"
      }, 3000)
    }
  }

}
