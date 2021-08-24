import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ClienteLogado } from 'src/app/cliente/clienteLogado.service';
import { Pedido } from 'src/app/pedido/shared/pedido';
import { Produto } from 'src/app/produtos/shared/produto';
import { MeusPedidosDataService } from '../meus-pedidos-data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  pedido: Pedido;
  produtos: Produto[];
  produtosAux : any;
  key: string

  constructor(private meusPedidosDataService: MeusPedidosDataService, private db: AngularFireDatabase, private clienteLogado: ClienteLogado) { }

  ngOnInit(): void {
    this.pedido = new Pedido();
    this.meusPedidosDataService.currentPedido.subscribe(data => {
      this.pedido = data.pedido
      this.key = data.key
      this.pegaProdutos().subscribe(data => {
        this.produtos = data
      })
    })
  }

  pegaProdutos(){
      return this.db.list('cliente/' + this.clienteLogado.cliente.id+ '/pedidosFinalizadosCliente/'+ this.key +'/produtos')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
        })
      );
    }

}
