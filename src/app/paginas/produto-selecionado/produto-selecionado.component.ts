import { Component, OnInit } from '@angular/core';
import { Carrinho } from 'src/app/carrinho/shared/carrinho';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Produto } from 'src/app/produtos/shared/produto';
import { ProdutoDataService } from 'src/app/produtos/shared/produto-data.service';
import { Contador } from 'src/app/carrinho/shared/contador';
import { ClienteLogado } from 'src/app/cliente/clienteLogado.service';
import { CarrinhoService } from 'src/app/carrinho/shared/carrinho.service';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/pedido/shared/pedido';
import { PedidoService } from 'src/app/pedido/shared/pedido.service';

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

  pedido: Pedido;

  imgPadrao = 'assets/pre-carregamento-prod.gif'

  constructor(private produtoDataService: ProdutoDataService, private carrinhoService: CarrinhoService, private http: HttpClient,
    private clienteLogado: ClienteLogado, private location: Location, private router: Router,
    private pedidoService: PedidoService) { }

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
      console.log('entrou 1')
      if (dados[0] == undefined) {
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

    

    this.carrinhoService.getAllPedido().subscribe(dados => {
      this.pedido = dados[0]

      if (this.clienteLogado.cliente != null) {
        if (this.pedido == null || this.pedido.estado == 'Pedido finalizado...' || this.pedido.estado == 'Seu pedido foi cancelado...') {
          this.pedidoService.deletePedido();
          this.contador = new Contador();
          this.contador = this.recebeContador;

          this.carrinho.nome = this.produto.nome;
          this.carrinho.valor = this.produto.valor;
          this.carrinho.quantidade = quantidade;
          this.carrinho.total = total;
          this.carrinho.linkImg = this.produto.imgPequena;

          this.carrinhoService.adicionaProduto(this.contador, this.carrinho);
          this.voltaPagina();
        } else {
          alert('Espere a entrega do pedido feito para adiconar novos produtos!')
          this.router.navigate(['/pedido/' + this.clienteLogado.cliente.id])
        }
      } else {
        alert('Faça o Login para adicionar produtos ao carrinho!')
        this.router.navigate(['/auth/login'])
      }
    })
  }
}
