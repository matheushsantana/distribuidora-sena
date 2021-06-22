import { Component, OnInit } from '@angular/core';
import { Carrinho } from 'src/app/carrinho/shared/carrinho';
import { CarrinhoService } from 'src/app/carrinho/shared/carrinho.service';
import { ProdutosCarrinho } from 'src/app/carrinho/shared/produtoscarrinho';
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
  produtosCarrinho: ProdutosCarrinho;

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
    this.produtosCarrinho = new ProdutosCarrinho();
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

    this.produtosCarrinho.nome = this.produto.nome;
    this.produtosCarrinho.valor = this.produto.valor;
    this.produtosCarrinho.quantidade = quantidade;
    this.produtosCarrinho.total = total;
    this.produtosCarrinho.linkImg = 'null';

    this.carrinho.produto = this.produtosCarrinho; 

    this.carrinhoService.adicionaProduto(this.carrinho);
  }
}
