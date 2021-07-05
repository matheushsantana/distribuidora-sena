import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { ClienteLogado } from "./clienteLogado.service";
import { Cliente } from "./shared/cliente";
import { ClienteService } from "./shared/cliente.service";

@Injectable({
    providedIn: 'root'
})
export class ClienteVerificaCadastro {

    url = 'https://projeto-distribuidora-default-rtdb.firebaseio.com/cliente/'
    aux: Cliente[];
    dadosCliente: any;

    constructor(private clienteLogado: ClienteLogado, private clienteService: ClienteService, private router: Router,
        private http: HttpClient, private db: AngularFireDatabase) { }

    verifica(){
        this.buscaCliente().subscribe(dados => {
            this.dadosCliente = new Cliente();
            this.aux = dados
            this.dadosCliente = this.aux
        })
    }

    buscaCliente() {
        return this.http.get<Cliente[]>(`${this.url + this.clienteLogado.cliente.id + '/dados.json'}`);
    }

}