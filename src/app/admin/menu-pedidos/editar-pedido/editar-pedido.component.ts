import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from 'src/app/pedido/shared/pedido';
import { PedidoDataService } from 'src/app/pedido/shared/pedido-data.service';
import { PedidoService } from 'src/app/pedido/shared/pedido.service';
import { MenuPedidosComponent } from '../menu-pedidos.component';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.css']
})
export class EditarPedidoComponent implements OnInit {

  pedido: Pedido;
  produtosPedido: Observable<any>;

  constructor(private db: AngularFireDatabase, private pedidoDataService: PedidoDataService,
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
        this.pedido.clienteId = data.pedido.clienteId,
        this.pedido.instrucoes = data.pedido.instrucoes,
        this.pedido.tipoDesconto = data.pedido.tipoDesconto,
        this.pedido.desconto = data.pedido.desconto,
      this.produtosPedido = this.getAllProdPedido();
      console.log(data)
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
