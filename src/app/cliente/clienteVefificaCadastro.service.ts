import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { Carrinho } from "../carrinho/shared/carrinho";
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

    constructor(private clienteLogado: ClienteLogado, private db: AngularFireDatabase) { }

    verifica(){
        this.buscaCliente().subscribe(dados => {
            this.dadosCliente = new Cliente();
            if(dados.length > 1){
                this.aux = dados[1]
                this.carrinho = dados[0]
                this.dadosCliente = this.aux
            }else{
                this.aux = dados[0]
                this.dadosCliente = this.aux
                this.carrinho = null
            }
            
        })
    }

    buscaCliente(){
        return this.db.list('cliente/' + this.clienteLogado.cliente.id)
            .snapshotChanges()
            .pipe(
            map(changes => {
                return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
            })
        );
    }

}