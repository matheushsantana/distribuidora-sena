import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Pedido } from "src/app/pedido/shared/pedido";

@Injectable({
    providedIn: 'root'
  })
  export class PedidoFinalizadoService {
  
    constructor(private db: AngularFireDatabase){}

    insertPedido(pedido: Pedido){
        this.db.list('pedidosFinalizados').push(pedido)
        .then((result: any) =>{
            console.log(result.key);
          });
      }
  }