import { Component, OnInit } from '@angular/core';
import { Carrinho } from 'src/app/carrinho/shared/carrinho';
import { HttpClient } from '@angular/common/http';
import { CarrinhoService } from 'src/app/carrinho/shared/carrinho.service';
import { Produto } from 'src/app/produtos/shared/produto';
import { ProdutoDataService } from 'src/app/produtos/shared/produto-data.service';

@Component({
  selector: 'app-produto-selecionado',
  templateUrl: './produto-selecionado.component.html',
  styleUrls: ['./produto-selecionado.component.css']
})
export class ProdutoSelecionadoComponent implements OnInit {
  
  produto: Produto
  key: string = '';

  quantidade: number = 1;
  total: number;

  contador: number[];

  carrinho: Carrinho;

  urlContador = 'https://sena-distribuidora-default-rtdb.firebaseio.com/cliente/';

  constructor(private produtoDataService: ProdutoDataService, private carrinhoService: CarrinhoService, private http: HttpClient) { }

  ngOnInit(): void {
    this.produto = new Produto();
    this.produtoDataService.currentProduto.subscribe(data => {
      if(data.produto && data.key){
        this.produto = new Produto();
        this.produto.nome = data.produto.nome;
        this.produto.valor = data.produto.valor;
        this.produto.categoria = data.produto.categoria;
        this.produto.linkImg = data.produto.linkImg;
        this.key = data.key;      }
    })
    this.total = this.produto.valor;
    this.carrinho = new Carrinho();
    this.pegaContador().subscribe(dados => {
      this.contador = dados
      console.log('contador', this.contador)
    });
  }

  quantidadeAltera(valor: number){
    if(valor >= 1){
      this.quantidade = this.quantidade + valor;
      this.total = this.quantidade * this.produto.valor;
    }else if(valor === 0){
      if(this.quantidade >= 2){
        this.quantidade--;
        this.total = this.total - this.produto.valor;
      }
    }
  }

  pegaContador(){
    return this.http.get<any[]>(`${this.urlContador + this.carrinhoService.idCliente + '/contador.json'}`);
  }


  adicionar(quantidade: number, total: number){

    this.carrinho.nome = this.produto.nome;
    this.carrinho.valor = this.produto.valor;
    this.carrinho.quantidade = quantidade;
    this.carrinho.total = total;
    this.carrinho.linkImg = 'null';

    var aux = this.contador
    console.log(aux)

    this.carrinhoService.adicionaProduto('1', this.carrinho);
  }
}
