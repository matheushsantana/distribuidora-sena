import { Data } from "@angular/router";
import { Carrinho } from "src/app/carrinho/shared/carrinho";

export class Pedido {

    pedidoId: number;
    clienteId: string;
    clienteNome: string;
    clienteNumero: string;
    clienteEnderecoRua: string;
    clienteEnderecoNumero: number;
    clienteEnderecoBairro: string;
    troco: string;
    data: string;
    valor: number;
    metodoPag: string;
    produtos: Carrinho[];
    estado: string;
    instrucoes: string;
    tipoDesconto: string;
    desconto: number = 0;

}
