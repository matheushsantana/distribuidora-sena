import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pedido } from "src/app/pedido/shared/pedido";

@Injectable({
    providedIn: 'root'
  })
  export class MeusPedidosDataService {
  
    private pedidoSoucer = new BehaviorSubject({pedido: null, key: ''});
    currentPedido = this.pedidoSoucer.asObservable();
  
    constructor() { }
  
    changePedido(pedido: Pedido, key: string){
      this.pedidoSoucer.next({pedido: pedido, key: key});
    }
  }
  