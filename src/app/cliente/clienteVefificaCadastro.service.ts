import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { Carrinho } from "../carrinho/shared/carrinho";
import { Pedido } from "../pedido/shared/pedido";
import { ClienteLogado } from "./clienteLogado.service";
import { Cliente } from "./shared/cliente";

@Injectable({
    providedIn: 'root'
})
export class ClienteVerificaCadastro {

    aux: Cliente[];
    dadosCliente: any;
    dadosMap: any;
    carrinho: Carrinho;
    pedido: Pedido;

    constructor(private clienteLogado: ClienteLogado, private db: AngularFireDatabase) {}

    verifica(appComponent, callBack){
        this.buscaCliente().subscribe(dados => {
            this.dadosCliente = new Cliente();
            if (dados.length > 1) {
                if (dados[0].key == 'carrinho') {
                    this.aux = dados[1]
                    this.carrinho = dados[0]
                    this.dadosCliente = this.aux
                }
                if (dados[0].key == 'dados' && dados[1].key == 'carrinho') {
                    this.aux = dados[0]
                    this.carrinho = dados[1]
                    this.dadosCliente = this.aux
                }
                if (dados[0].key == 'dados' && dados[1].key == 'pedido') {
                    this.aux = dados[0]
                    this.pedido = dados[1]
                    this.dadosCliente = this.aux
                }
            } else {
                if(dados.length == 0){  

                } else {
                    if (dados[0].key == 'carrinho') {
                        this.carrinho = dados[0]
                    } else {
                        this.aux = dados[0]
                        this.dadosCliente = this.aux
                    }
                }
               
            }
            callBack(appComponent, this.dadosCliente)
        });
    }

    buscaCliente() {
        return this.db.list('cliente/' + this.clienteLogado.cliente.id)
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
                })
            );
    }

}