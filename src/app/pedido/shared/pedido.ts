import { Carrinho } from "src/app/carrinho/shared/carrinho";

export class Pedido {

    clienteId: string;
    clienteNome: string;
    clienteNumero: string;
    clienteEnderecoRua: string;
    clienteEnderecoNumero: number;
    clienteEnderecoBairro: string;
    data: string;
    valor: number;
    metodoPag: string;
    produtos: Carrinho[];
    estado: string;
}
