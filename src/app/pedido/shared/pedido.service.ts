import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CarrinhoService } from 'src/app/carrinho/shared/carrinho.service';
import { ClienteLogado } from 'src/app/cliente/clienteLogado.service';
import { Pedido } from './pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private db: AngularFireDatabase, private carrinhoService: CarrinhoService, private router: Router, private clienteLogado: ClienteLogado) { }

  insertPedido(pedido: Pedido){
    var key = 'pedido';
    this.db.list('cliente/' + this.clienteLogado.cliente.id).update(key, pedido)
    this.router.navigate(['/pedido', this.clienteLogado.cliente.id]);
  }

  updatePedido(pedido: Pedido, key: string){
    this.db.list('pedido').update(key, pedido)
    .catch((error: any) =>{
      console.error(error);
    });
  }

  getAllPedido(){
    return this.db.list('cliente/' + this.clienteLogado.cliente.id + '/pedido')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
      })
    );
  }

  deletePedido(key: string){
    this.db.object(`pedido/${key}`).remove();
    alert("Apagado com Sucesso!")
  }
}