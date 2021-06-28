import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteLogado } from '../cliente/clienteLogado.service';
import { Pedido } from '../pedido/shared/pedido';
import { PedidoService } from '../pedido/shared/pedido.service';
import { Carrinho } from './shared/carrinho';
import { CarrinhoService } from './shared/carrinho.service';
import { Contador } from './shared/contador';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  carrinho: Observable<any>;
  produtos: Carrinho[] = [];
  produto: Carrinho;
  carregando: boolean = false;
  qtd: number;
  total: number;
  totalFinal: number;
  frete: number = 4.99;
  quantidade: number = 1;
  recebeContador: Contador;
  contador: Contador;
  quantidadeProd: number;
  pedido: Pedido;

  url = 'https://projeto-distribuidora-default-rtdb.firebaseio.com/cliente/';

  constructor(private carrinhoService: CarrinhoService, private http: HttpClient, private pedidoService: PedidoService, private clienteLogado: ClienteLogado) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.carrinho = this.carrinhoService.getAllProdCarrinho();
      this.conta();
      this.carregando = true;
    }, 2500);
  }

  voltaPagina(){
    window.history.back()
  }

  quantidadeAltera(valor: number, key: number) {
    if (valor >= 1) {
      this.produtos[key].quantidade = Number(this.produtos[key].quantidade) + 1;
      this.produtos[key].total = Number(this.produtos[key].total) + Number(this.produtos[key].valor);
      this.total = Number(this.total) + Number(this.produtos[key].valor);
      this.totalFinal = Number(this.totalFinal) + Number(this.produtos[key].valor);
      this.quantidadeProd = this.quantidadeProd + 1;

      this.produto = new Carrinho();
      this.produto.nome = this.produtos[key].nome,
        this.produto.linkImg = this.produtos[key].linkImg,
        this.produto.quantidade = this.produtos[key].quantidade,
        this.produto.total = this.produtos[key].total,
        this.produto.valor = this.produtos[key].valor,
        this.carrinhoService.atualizaCarrinho(key, this.produto)
    } else if (valor === 0) {
      if (this.produtos[key].quantidade >= 2) {
        this.produtos[key].quantidade = Number(this.produtos[key].quantidade) - 1;
        this.produtos[key].total = Number(this.produtos[key].total) - Number(this.produtos[key].valor);
        this.total = Number(this.total) - Number(this.produtos[key].valor);
        this.totalFinal = Number(this.totalFinal) - Number(this.produtos[key].valor);
        this.quantidadeProd = this.quantidadeProd - 1;

        this.produto = new Carrinho();
        this.produto.nome = this.produtos[key].nome,
          this.produto.linkImg = this.produtos[key].linkImg,
          this.produto.quantidade = this.produtos[key].quantidade,
          this.produto.total = this.produtos[key].total,
          this.produto.valor = this.produtos[key].valor,
          this.carrinhoService.atualizaCarrinho(key, this.produto)
      }
    }
  }

  listarCarrinho() {
    return this.http.get<Carrinho[]>(`${this.url + this.clienteLogado.cliente.id + '/carrinho/produtos.json'}`);
  }

  conta() {
    this.listarCarrinho().subscribe(dados => {
      this.produtos = dados;
      this.totalPedido()
    }, err => {
      console.log('Erro ao listar os sistemas', err);
    })
  }

  totalPedido() {
    var i: number = 0;
    var a: number = 0;
    var j: number = 0
    var aux: number = 0;
    this.total = 0.00;
    this.qtd = 0;
    this.quantidadeProd = 0;
    this.totalFinal = this.frete;
    var qtdAux = (Object.keys(this.produtos).length)
    while(a < qtdAux){
      if(this.produtos[j] != null) {
        this.qtd++
        a++
        j++
      }else{
        a++
        j++
      }
    }

    while (aux < this.qtd) {
      if (this.produtos[i] != null) {
        this.total = Number(this.total) + Number(this.produtos[i].total);
        this.quantidadeProd = this.quantidadeProd + this.produtos[i].quantidade;
        this.totalFinal = Number(this.totalFinal) + Number(this.produtos[i].total);
        aux++
        i++
      } else {
        i++
      }
      
    }
  }

  apagarProduto(key: string) {
    if (this.qtd > 1) {
      this.carrinhoService.deleteProdCarrinho(key, 0);
      setTimeout(() => {
        this.conta()
      }, 1000);
    } else {
      this.carrinhoService.deleteProdCarrinho(key, 1);
      setTimeout(() => {
        this.conta()
      }, 1000);
    }
  }

  pegarDados() {
    return this.http.get<Pedido>(`${this.url + this.clienteLogado.cliente.id + '/pedido.json'}`);
  }

  fazerPedido(){

    this.pegarDados().subscribe(dados => {
      this.pedido = new Pedido();
      this.pedido = dados;
      console.log('pedido existente: ' ,this.pedido)
      
      if(this.pedido == null){
        this.pedido = new Pedido();
        this.pedido.clienteId = this.clienteLogado.cliente.id;
        this.pedido.clienteNome = this.clienteLogado.cliente.nome;
        this.pedido.clienteNumero = '';
        this.pedido.data = '';
        this.pedido.metodoPag = 'Dinheiro';
        this.pedido.clienteEndereco = '';
        this.pedido.estado = 'Pedido esta em preparo...'
        this.pedido.produtos = this.produtos;
        this.pedido.valor = this.total;
  
        this.pedidoService.insertPedido(this.pedido)
      } else {
        alert('Espere a entrega do pedido feito para realizar outro!')
      }
    })   
  }
}