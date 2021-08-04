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

    verifica(callBack){
        console.log('entrou 1')
        this.buscaCliente().subscribe(dados => {
            this.dadosCliente = new Cliente();
            if (dados.length > 1) {
                if (dados[0].key == 'carrinho') {
                    this.aux = dados[1]
                    this.carrinho = dados[0]
                    this.dadosCliente = this.aux
                    console.log('if 1')
                }
                if (dados[0].key == 'dados' && dados[1].key == 'carrinho') {
                    this.aux = dados[0]
                    this.carrinho = dados[1]
                    this.dadosCliente = this.aux
                    console.log('if 2')
                }
                if (dados[0].key == 'dados' && dados[1].key == 'pedido') {
                    this.aux = dados[0]
                    this.pedido = dados[1]
                    this.dadosCliente = this.aux
                    console.log('if 3')
                }
            } else {
                if (dados[0].key == 'carrinho') {
                    this.carrinho = dados[0]
                    console.log('if 4')
                } else {
                    this.aux = dados[0]
                    this.dadosCliente = this.aux
                    console.log('if 5')
                }
            }
            console.log('saiu 1')
            console.log('tem algo? 1', this.dadosCliente)
            setTimeout(() =>{
                console.log('tem algo? 2', this.dadosCliente)
                callBack(this.dadosCliente)
            }, 2500)
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