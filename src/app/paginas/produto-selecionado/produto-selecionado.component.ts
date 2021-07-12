import { Component, OnInit } from '@angular/core';
import { Carrinho } from 'src/app/carrinho/shared/carrinho';
import { Location } from '@angular/common';
import { Produto } from 'src/app/produtos/shared/produto';
import { ProdutoDataService } from 'src/app/produtos/shared/produto-data.service';
import { Contador } from 'src/app/carrinho/shared/contador';
import { ClienteLogado } from 'src/app/cliente/clienteLogado.service';
import { CarrinhoService } from 'src/app/carrinho/shared/carrinho.service';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/pedido/shared/pedido.service';
import { AppComponent } from 'src/app/app.component';
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
  produtosCarrinho: any;
  produtoExiste: boolean = false;

  pedido: any;

  imgPadrao = 'assets/pre-carregamento-prod.gif'

  constructor(private produtoDataService: ProdutoDataService, private carrinhoService: CarrinhoService,
    private clienteLogado: ClienteLogado, private router: Router, private pedidoService: PedidoService,
    private location: Location, private clienteVerificaCadastro: ClienteVerificaCadastro) { }

  ngOnInit(): void {
    this.produto = new Produto();
    this.produtoDataService.currentProduto.subscribe(data => {
      if (data.produto && data.key) {
        this.produto = new Produto();
        this.produto.nome = data.produto.nome;
        this.produto.valor = data.produto.valor;
        this.produto.categoria = data.produto.categoria;
        this.produto.imgGrande = data.produto.imgGrande;
        this.produto.imgPequena = data.produto.imgPequena;
        this.key = data.key;
        this.total = this.produto.valor;
      }
    })

    this.carrinho = new Carrinho();
    this.contador = new Contador();
    this.recebeContador = new Contador();
    this.pegaContador();
    this.verificaproduto();
  }

  verificaproduto(){
    this.carrinhoService.getAllProdCarrinho().subscribe(dados => {
      this.produtosCarrinho = dados

      for(var i = 0; i < this.produtosCarrinho.length; i++){
        if(this.produto.nome == this.produtosCarrinho[i].nome)
          this.produtoExiste = true;
      }
    })
  }

  voltaPagina() {
    this.location.back();
  }

  quantidadeAltera(valor: number, aux: number) {

    if (valor >= 1) {
      if (this.quantidade == 1 && aux == 1) {
        this.quantidade = this.quantidade + (valor - 1);
        this.total = this.quantidade * this.produto.valor;
      } else {
        this.quantidade = this.quantidade + valor;
        this.total = this.quantidade * this.produto.valor;
      }
    } else if (valor === 0) {
      if (this.quantidade >= 2) {
        this.quantidade--;
        this.total = this.total - this.produto.valor;
      }
    }
  }

  pegaContador() {
    this.carrinhoService.getContadorCarrinho().subscribe(dados => {
      console.log('dados Contador: ', dados)
      console.log('entrou 1')
      if (dados[0] == undefined || dados[0] == null) {
        console.log('entrou 2')
        this.recebeContador = new Contador();
        this.recebeContador.valor = 0;
        console.log('valor recebido1', this.recebeContador)
      } else {
        this.contador.valor = dados[0].valor
        this.recebeContador = this.contador;
        console.log('valor recebido2', this.recebeContador.valor)
      }
    }, err => {
      console.log('Erro ao listar contador', err);
    })
  }

  adicionar(quantidade: number, total: number) {

    if (this.clienteLogado.cliente != null) {
      this.carrinhoService.getAllPedido().subscribe(dados => {
        this.pedido = dados[1]
        console.log('dados 1: ', dados)
        console.log('dados 2: ', dados[1])
        if (this.pedido == undefined || this.pedido.key != 'pedido' ||
          this.pedido.estado == 'Pedido finalizado...' || this.pedido.estado == 'Seu pedido foi cancelado...') {
          this.clienteVerificaCadastro.pedido = null;
          if (this.produtoExiste != true) {
            this.pedidoService.deletePedido();
            this.contador = new Contador();
            this.contador = this.recebeContador;

            this.carrinho.nome = this.produto.nome;
            this.carrinho.valor = this.produto.valor;
            this.carrinho.quantidade = quantidade;
            this.carrinho.total = total;
            this.carrinho.linkImg = this.produto.imgPequena;

            this.carrinhoService.adicionaProduto(this.contador, this.carrinho);
            this.produto = new Produto();
          } else {
            this.produto = new Produto();
            alert('Esse produto ja esta adicionado em seu carrinho, confira a quantidade desejada!')
            this.router.navigate(['/carrinho/' + this.clienteLogado.cliente.id])
          }

        } else {
          alert('Espere a entrega do pedido feito para adiconar novos produtos!')
          this.router.navigate(['/pedido/' + this.clienteLogado.cliente.id])
        }
      })
    } else {
      alert('Faça o Login para adicionar produtos ao carrinho!')
      this.router.navigate(['/auth/login'])
    }

  }
}
