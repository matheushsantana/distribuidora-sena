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
import { ClienteVerificaCadastro } from 'src/app/cliente/clienteVefificaCadastro.service';
import { AppComponent } from 'src/app/app.component';

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
    private location: Location, private clienteVerificaCadastro: ClienteVerificaCadastro, private appComponet: AppComponent) { 
      this.appComponet.ativaNav = false;
    }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.produto = new Produto();
    this.produtoDataService.currentProduto.subscribe(data => {
      if (data.produto == null) {
        window.location.href = '/'
      } else {
        this.produto = new Produto();
        this.produto.nome = data.produto.nome;
        this.produto.valor = data.produto.valor;
        this.produto.categoria = data.produto.categoria;
        this.produto.imgProduto = data.produto.imgProduto;
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

  verificaproduto() {
    this.carrinhoService.getAllProdCarrinho().subscribe(dados => {
      this.produtosCarrinho = dados

      for (var i = 0; i < this.produtosCarrinho.length; i++) {
        if (this.produto.nome == this.produtosCarrinho[i].nome)
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
      if (dados[0] == undefined || dados[0] == null) {
        this.recebeContador = new Contador();
        this.recebeContador.valor = 0;
      } else {
        this.contador.valor = dados[0].valor
        this.recebeContador = this.contador;
      }
    }, err => {
      console.log('Erro ao listar contador', err);
    })
  }

  adicionar(quantidade: number, total: number) {

    if (this.produto.categoria != 'esgotado') {
      if (this.clienteLogado.cliente != null) {
        this.carrinhoService.getAllPedido().subscribe(dados => {
          this.pedido = dados[1]
        })
      } else {
        alert('Faça o Login para adicionar produtos ao carrinho!')
        this.router.navigate(['/auth/login'])
      }
    } else {
      alert('Desculpe, Produto Esgotado...')
      this.router.navigate(['/'])
    }
    this.fazerPedido(quantidade, total);
  }

  fazerPedido(quantidade: number, total: number) {
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
        this.carrinho.linkImg = this.produto.imgProduto;

        this.carrinhoService.adicionaProduto(this.contador, this.carrinho);
        this.produto = new Produto();
      } else {
        this.produto = new Produto();
        this.produtoExiste = false;
        alert('Esse produto ja esta adicionado em seu carrinho, confira a quantidade desejada!')
        this.router.navigate(['/carrinho/' + this.clienteLogado.cliente.id])
      }

    } else {
      alert('Espere a entrega do pedido feito para adiconar novos produtos!')
      this.router.navigate(['/pedido/' + this.clienteLogado.cliente.id])
    }
  }

}
