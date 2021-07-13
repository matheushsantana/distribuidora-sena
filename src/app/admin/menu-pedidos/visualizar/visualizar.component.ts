import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from 'src/app/pedido/shared/pedido';
import { PedidoDataService } from 'src/app/pedido/shared/pedido-data.service';
import { PedidoService } from 'src/app/pedido/shared/pedido.service';
import { MenuPedidosComponent } from '../menu-pedidos.component';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent implements OnInit {

  pedido: Pedido;
  produtosPedido: Observable<any>;
  opcoesBtn = ['Aceitar Pedido', 'pedido Preparado', 'Pedido Entregue']
  estado = ['Aguardando a Distribuidora aceitar...', 'Pedido em preparo pela Distribuidora...', 'Pedido saiu para entrega...', 'Pedido finalizado...'];
  btn: string;
  mostraBtn: boolean = true;

  constructor(private db: AngularFireDatabase, private pedidoDataService: PedidoDataService, private menuPedidos: MenuPedidosComponent,
    private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedido = new Pedido();
    this.pedidoDataService.currentPedido.subscribe(data => {
      this.pedido.clienteEnderecoBairro = data.pedido.clienteEnderecoBairro,
        this.pedido.clienteEnderecoNumero = data.pedido.clienteEnderecoNumero,
        this.pedido.clienteEnderecoRua = data.pedido.clienteEnderecoRua,
        this.pedido.clienteNome = data.pedido.clienteNome,
        this.pedido.clienteNumero = data.pedido.clienteNumero,
        this.pedido.data = data.pedido.data,
        this.pedido.estado = data.pedido.estado,
        this.pedido.metodoPag = data.pedido.metodoPag,
        this.pedido.produtos = data.pedido.produtos,
        this.pedido.valor = data.pedido.valor,
        this.pedido.pedidoId = data.pedido.pedidoId,
        this.pedido.clienteId = data.pedido.clienteId
      this.produtosPedido = this.getAllProdPedido();
      console.log(this.pedido)
      this.mudaBotao();
    })
  }

  mudaBotao() {
    console.log('entrou muda btn')
    for (var i = 0; i < 3; i++) {
      console.log('entrou for:', i)
      if (this.pedido.estado == this.estado[i] && this.pedido.estado != this.estado[3]) {
        console.log('entroi if')
        this.btn = this.opcoesBtn[i];
        this.mostraBtn = true;
        break
      } else {
        console.log('entrou else')
        this.mostraBtn = false;
      }
    }
  }

  fechar() {
    this.menuPedidos.mostraDetalhes = false
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

  cancelarPedido() {
    this.pedido.estado = 'Seu pedido foi cancelado...';
    this.menuPedidos.mostraDetalhes = false;
    this.db.list('cliente/' + this.pedido.clienteId).update('pedido', this.pedido)
      .catch((error: any) => {
        console.error(error);
      });
  }

  updatePedido() {
    for (var i = 0; i < 4; i++) {
      if (this.estado[i] == this.pedido.estado) {
        this.pedido.estado = this.estado[i + 1];
        if (this.pedido.estado == 'Pedido finalizado...') {
          this.pedidoService.salvaPedidoFinalizado(this.pedido)
        }
        this.db.list('cliente/' + this.pedido.clienteId).update('pedido', this.pedido)
          .catch((error: any) => {
            console.error(error);
          });
        this.menuPedidos.mostraDetalhes = false
        break
      }
    }
  }

}
