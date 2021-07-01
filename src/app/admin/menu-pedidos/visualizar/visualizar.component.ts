import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from 'src/app/pedido/shared/pedido';
import { PedidoDataService } from 'src/app/pedido/shared/pedido-data.service';
import { AceitarComponent } from '../aceitar/aceitar.component';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent implements OnInit {

  pedido: Pedido;
  produtosPedido: Observable<any>;

  constructor(private db: AngularFireDatabase, private pedidoDataService: PedidoDataService, private aceitar: AceitarComponent) { }

  ngOnInit(): void {
    console.log('carregou')
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
      this.pedido.clienteId = data.pedido.clienteId
      this.produtosPedido = this.getAllProdPedido();
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

  updatePedido(aux: string){
    this.pedido.estado = aux;
    this.db.list('cliente/' + this.pedido.clienteId).update('pedido', this.pedido)
    .catch((error: any) =>{
      console.error(error);
    });
    this.aceitar.mostraDetalhes = false;
  }

}
