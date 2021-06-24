import { Component, OnInit } from '@angular/core';
import { Carrinho } from 'src/app/carrinho/shared/carrinho';
import { HttpClient } from '@angular/common/http';
import { CarrinhoService } from 'src/app/carrinho/shared/carrinho.service';
import { Produto } from 'src/app/produtos/shared/produto';
import { ProdutoDataService } from 'src/app/produtos/shared/produto-data.service';
import { Contador } from 'src/app/carrinho/shared/contador';
import { Observable } from 'rxjs';

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

  contador: Contador;
  recebeContador: Contador;
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
    this.contador = new Contador();
    this.recebeContador = new Contador();

    this.pegaContador().subscribe(dados => {
      if(dados == null){
        this.recebeContador = {valor: 0}
      }else{
        this.recebeContador = dados;
        console.log('valor recebido',this.recebeContador)
      }
    }, err => {
      console.log('Erro ao listar contador', err);
    })
    console.log('saiu')
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
    return this.http.get<any>(`${this.urlContador + this.carrinhoService.idCliente + '/carrinho/contador.json'}`);
  }


  adicionar(quantidade: number, total: number){
    this.contador.valor = this.recebeContador.valor;
    console.log('valor contador', this.contador.valor)

    this.carrinho.nome = this.produto.nome;
    this.carrinho.valor = this.produto.valor;
    this.carrinho.quantidade = quantidade;
    this.carrinho.total = total;
    this.carrinho.linkImg = 'null';
    
    this.carrinhoService.adicionaProduto(this.contador ,this.carrinho);
  }
}
