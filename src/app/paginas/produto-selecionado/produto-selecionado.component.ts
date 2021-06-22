import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { Carrinho } from 'src/app/carrinho/shared/carrinho';
import { CarrinhoService } from 'src/app/carrinho/shared/carrinho.service';
import { ProdutoCarrinho } from 'src/app/carrinho/shared/produtocarrinho';
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

  carrinho: Carrinho;
  produtoCarrinho: ProdutoCarrinho;

  constructor(private produtoDataService: ProdutoDataService, private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.produto = new Produto();
    this.produtoDataService.currentProduto.subscribe(data => {
      if(data.produto && data.key){
        this.produto = new Produto();
        this.produto.nome = data.produto.nome;
        this.produto.valor = data.produto.valor;
        this.produto.categoria = data.produto.categoria;
        //this.produto.linkImg = data.produto.linkImg;
        this.key = data.key;      }
    })
    this.total = this.produto.valor;
    this.carrinho = new Carrinho();
    this.produtoCarrinho = new ProdutoCarrinho();
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

  adicionar(quantidade: number, total: number){

    this.produtoCarrinho.produto = this.produto;
    this.produtoCarrinho.quantidade = quantidade;
    this.produtoCarrinho.total = total;

    this.carrinho.produtos = this.produtoCarrinho;

    this.carrinhoService.adicionaProduto(this.carrinho);
  }
}
