import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  url = 'https://sena-distribuidora-default-rtdb.firebaseio.com/cliente/';

  constructor(private carrinhoService: CarrinhoService, private http: HttpClient) {
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
    console.log('key', key)
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
    return this.http.get<Carrinho[]>(`${this.url + this.carrinhoService.idCliente + '/carrinho/produtos.json'}`);
  }

  conta() {
    this.listarCarrinho().subscribe(dados => {
      this.produtos = dados;
      console.log('dados', dados)
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
    console.log('quantos?', qtdAux)
    while(a < qtdAux){
      console.log('while 1 entrou')
      if(this.produtos[j] != null) {
        this.qtd++
        a++
        j++
        console.log('a:', a)
      }else{
        a++
        j++
      }
    }
    console.log('while 1 saiu')
    console.log('qtd', this.qtd)

    while (aux < this.qtd) {
      console.log('while 2 entrou')
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
    console.log('while 2 saiu')
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
}
