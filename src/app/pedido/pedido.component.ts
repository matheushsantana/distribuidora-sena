import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
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
  tempoEntrega: string = '';

  constructor(private calculaFrete: CalculaFrete, private pedidoService: PedidoService, private appComponet: AppComponent) { 
    this.appComponet.ativaNav = false; }

  ngOnInit(): void {
    console.log('entrou 1')
    window.scrollTo(0, 0)
    this.calculaFrete.calculaFrete(this, this.pegaPedido);
    this.carregando = false;
  }

  pegaPedido(comp, aux) {
    comp.pedidoService.getAllPedido().subscribe(dados => {
      console.log('entrou 2')
      comp.pedido = dados[1]
      comp.infoPedido = dados[1]
      comp.barraStatus();
      comp.carregando = true;
    })
    comp.pedidoService.getAllPedidoProdutos().subscribe(dados => {
      comp.produtos = dados
    });
  }

  barraStatus() {
    this.carregando = true;
    const estado = ['Aguardando a Distribuidora aceitar...', 'Pedido em preparo pela Distribuidora...', 
    'Pedido saiu para entrega...', 'Pedido finalizado...', 'Seu pedido foi cancelado...']

    setTimeout(() => {
      var barra = document.getElementById('progressBar') as HTMLElement
      if (String(this.infoPedido['estado']) == estado[0]) {
        barra.style.width = '20%'
        this.tempoEntrega = ''
      }
      if (String(this.infoPedido['estado']) == estado[1]) {
        barra.style.width = '40%'
        this.tempoEntrega = ''
      }
      if (String(this.infoPedido['estado']) == estado[2]) {
        barra.style.width = '70%'
        this.tempoEntrega = ' Tempo Estimado: ' + (this.calculaFrete.precoFrente * 2) + ' minutos'
      }
      if (String(this.infoPedido['estado']) == estado[3]) {
        barra.style.width = '100%',
          barra.className = 'progress-bar progress-bar-striped bg-success',
          this.tempoEntrega = ''
        setTimeout(() => {
          window.location.href = "/"
        }, 3000)
      }
      if (String(this.infoPedido['estado']) == estado[4]) {
        barra.style.width = '100%',
          barra.className = 'progress-bar progress-bar-striped bg-danger',
          this.tempoEntrega = ''
        setTimeout(() => {
          window.location.href = "/"
        }, 3000)
      }
    }, 500)
  }

}
