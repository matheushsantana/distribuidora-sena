import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClienteLogado } from '../cliente/clienteLogado.service';
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

  estado = ['Aguardando a Distribuidora aceitar...', 'Pedido em preparo pela Distribuidora...', 'Pedido saiu para entrega...', 'Pedido finalizado...', 'Seu pedido foi cancelado...']

  url = 'https://projeto-distribuidora-default-rtdb.firebaseio.com/cliente/';

  constructor(private http: HttpClient, private clienteLogado: ClienteLogado, private pedidoService: PedidoService,
    private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.carregando = false;
    setTimeout(() => {
      this.preencheCampos();
      this.infoPedido = this.pedidoService.getAllPedido()
      this.estraiInfo();
      this.carregando = true;
    }, 2500);
  }

  barraStatus(dados: Observable<any>) {
    var barra = document.getElementById('progressBar') as HTMLElement
    var aux = String(dados)
    if (aux == this.estado[0]) {
      barra.style.width = '20%'
    }
    if (aux == this.estado[1]) {
      barra.style.width = '40%'
    }
    if (aux == this.estado[2]) {
      barra.style.width = '70%'
    }
    if (aux == this.estado[3]) {
      barra.style.width = '100%'
    }
    if (aux == this.estado[4]) {
      barra.style.width = '100%'
      barra.className = 'progress-bar progress-bar-striped bg-danger'
    }
  }

  pegarDados() {
    return this.http.get<Pedido>(`${this.url + this.clienteLogado.cliente.id + '/pedido.json'}`);
  }

  preencheCampos() {
    this.pegarDados().subscribe(dados => {
      this.pedido = new Pedido();
      this.pedido = dados;
      this.carregando = true;
    })
  }

  estraiInfo() {
    this.infoPedido.subscribe(dados => {
      var aux = (Object.keys(dados).length)
      for (var i = 0; i < aux; i++) {
        if (dados[i].key == 'pedido') {
          this.statuspedido = dados[i].estado
        }
      }
      this.barraStatus(this.statuspedido);
    })
  }

  getAllProdPedido() {
    return this.db.list('cliente/' + this.pedido.clienteId + '/pedido/produtos')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
        })
      );
  }

}
