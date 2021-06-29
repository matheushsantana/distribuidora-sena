import { Component, OnInit } from '@angular/core';
import { Carrinho } from 'src/app/carrinho/shared/carrinho';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { CarrinhoService } from 'src/app/carrinho/shared/carrinho.service';
import { Produto } from 'src/app/produtos/shared/produto';
import { ProdutoDataService } from 'src/app/produtos/shared/produto-data.service';
import { Contador } from 'src/app/carrinho/shared/contador';
import { ClienteLogado } from 'src/app/cliente/clienteLogado.service';
import { ClienteVerificaCadastro } from 'src/app/cliente/clienteVefificaCadastro.service';

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

  verificaCliente: boolean;
  contador: Contador;
  recebeContador: Contador;
  carrinho: Carrinho;

  imgPadrao = 'assets/pre-carregamento-prod.gif'

  urlContador = 'https://projeto-distribuidora-default-rtdb.firebaseio.com/cliente/';

  constructor(private produtoDataService: ProdutoDataService, private carrinhoService: CarrinhoService, private http: HttpClient,
    private clienteLogado: ClienteLogado, private location: Location, private clienteVerificaCadastro: ClienteVerificaCadastro) { }

  ngOnInit(): void {
    this.produto = new Produto();
    this.produtoDataService.currentProduto.subscribe(data => {
      if(data.produto && data.key){
        this.produto = new Produto();
        this.produto.nome = data.produto.nome;
        this.produto.valor = data.produto.valor;
        this.produto.categoria = data.produto.categoria;
        this.produto.imgGrande = data.produto.imgGrande;
        this.produto.imgPequena = data.produto.imgPequena;
        this.key = data.key;  
      }
      this.verificaDadosCliente();
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

  voltaPagina(){
    this.location.back();
  }

  quantidadeAltera(valor: number, aux: number){

    if(valor >= 1){
      if(this.quantidade == 1 && aux == 1 ){
        this.quantidade = this.quantidade + (valor - 1);
        this.total = this.quantidade * this.produto.valor;
      }else {
        this.quantidade = this.quantidade + valor;
        this.total = this.quantidade * this.produto.valor;
      }
      }else if(valor === 0){
      if(this.quantidade >= 2){
        this.quantidade--;
        this.total = this.total - this.produto.valor;
      }
    }
  }

  pegaContador(){
    return this.http.get<any>(`${this.urlContador + this.clienteLogado.cliente.id + '/carrinho/contador.json'}`);
  }

  verificaDadosCliente(){
    if(this.clienteVerificaCadastro.aux != null){
      console.log('tem dados')
    } else {
      console.log('não tem dados')
    }

    /*if (this.aux == null) {
            this.router.navigateByUrl('/cadastro/cliente');
            return 
        } else {
            this.router.navigate(['/carrinho', this.clienteLogado.cliente.id]);
            return 
        }*/
  }


  adicionar(quantidade: number, total: number){

    /*this.contador.valor = this.recebeContador.valor;

    this.carrinho.nome = this.produto.nome;
    this.carrinho.valor = this.produto.valor;
    this.carrinho.quantidade = quantidade;
    this.carrinho.total = total;
    this.carrinho.linkImg = this.produto.imgPequena;
    
    this.carrinhoService.adicionaProduto(this.contador ,this.carrinho);*/
  }
}
