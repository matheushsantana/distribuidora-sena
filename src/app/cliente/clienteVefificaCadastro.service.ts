import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ClienteLogado } from "./clienteLogado.service";
import { Cliente } from "./shared/cliente";
import { ClienteService } from "./shared/cliente.service";

@Injectable({
    providedIn: 'root'
})
export class ClienteVerificaCadastro {

    url = 'https://projeto-distribuidora-default-rtdb.firebaseio.com/cliente/'
    aux: Cliente[];

    constructor(private clienteLogado: ClienteLogado, private clienteService: ClienteService, private router: Router,
        private http: HttpClient) { }

    verifica(){
        console.log('entrou verifica')
        this.buscaCliente().subscribe(dados => {
            console.log('dados', dados)
            this.aux = dados
        })
    }

    buscaCliente() {
        return this.http.get<Cliente[]>(`${this.url + this.clienteLogado.cliente.id + '/dados.json'}`);
    }
}