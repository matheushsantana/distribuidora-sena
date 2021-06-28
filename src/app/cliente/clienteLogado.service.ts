import { Injectable } from "@angular/core";
import { Cliente } from "./shared/cliente";

@Injectable({
    providedIn: 'root'
  })
  export class ClienteLogado {
      cliente: Cliente
      
    recebeDados(dados: Cliente){
        this.cliente = dados;
    }
  }