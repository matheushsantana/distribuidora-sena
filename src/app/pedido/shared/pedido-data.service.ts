import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pedido } from './pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoDataService {

  private pedidoSoucer = new BehaviorSubject({pedido: null, key: ''});
  currentPedido = this.pedidoSoucer.asObservable();

  constructor() { }

  changePedido(pedido: Pedido, key: string){
    this.pedidoSoucer.next({pedido: pedido, key: key});
  }
}
