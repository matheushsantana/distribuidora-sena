import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ClienteLogado } from '../cliente/clienteLogado.service';
import { Pedido } from '../pedido/shared/pedido';
import { PedidoService } from '../pedido/shared/pedido.service';
import { Carrinho } from './shared/carrinho';
import { CarrinhoService } from './shared/carrinho.service';
import { Contador } from './shared/contador';
import { ClienteVerificaCadastro } from '../cliente/clienteVefificaCadastro.service';
import { Router } from '@angular/router';

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
  metodoPagamento: string = 'Selecione a forma de pagamento';
  contadorProd: Contador

  data = new Date();

  imgPadrao = 'assets/pre-carregamento-prod.gif'

  url = 'https://projeto-distribuidora-default-rtdb.firebaseio.com/cliente/';

  constructor(private carrinhoService: CarrinhoService, private http: HttpClient, private pedidoService: PedidoService,
    private clienteLogado: ClienteLogado, private location: Location, private clienteVerificaCadastro: ClienteVerificaCadastro,
    private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.carrinho = this.carrinhoService.getAllProdCarrinho();
      this.conta();
      this.carregando = true;
    }, 2500);
  }

  voltaPagina() {
    this.location.back();
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
    while (a < qtdAux) {
      if (this.produtos[j] != null) {
        this.qtd++
        a++
        j++
      } else {
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

  fazerPedido() {

    this.pegarDados().subscribe(dados => {
      this.pedido = new Pedido();
      this.pedido = dados;
      console.log('pedido existente: ', this.pedido)

      if (this.clienteVerificaCadastro.aux != null) {
        if (this.pedido == null) {
          if(this.metodoPagamento != 'Selecione a forma de pagamento'){
            this.pedido = new Pedido();
            this.contadorProd = new Contador();
            this.carrinhoService.getContadorPedido().subscribe(contador =>{
              this.pedido.pedidoId = contador[0].valor
              console.log('valor', contador[0].valor)
              console.log('pegou?', this.pedido.pedidoId)
              this.contadorProd.valor = this.pedido.pedidoId
              this.pedido.clienteId = this.clienteLogado.cliente.id;
              this.pedido.clienteNome = this.clienteLogado.cliente.nome;
              this.pedido.clienteNumero = this.clienteVerificaCadastro.dadosCliente.telefone;
              this.pedido.data = this.data.getDate() + '/' + this.data.getMonth() + '/' + this.data.getFullYear() + ' - ' + this.data.getHours() + ':' + this.data.getMinutes();
              this.pedido.metodoPag = 'Dinheiro';
              this.pedido.clienteEnderecoRua = this.clienteVerificaCadastro.dadosCliente.enderecoRua;
              this.pedido.clienteEnderecoBairro = this.clienteVerificaCadastro.dadosCliente.enderecoBairro;
              this.pedido.clienteEnderecoNumero = this.clienteVerificaCadastro.dadosCliente.enderecoNumero;
              this.pedido.estado = 'Aguardando a distribuidora aceitar...'
              this.pedido.produtos = this.produtos;
              this.pedido.valor = this.total;

              this.pedidoService.insertPedido(this.pedido);
              this.carrinhoService.atualizarContadorPedido(this.contadorProd);
            });
          } else {
            alert('Escolha a forma de Pagamento!')
          } 
        }else{
          alert('Espere a entrega do pedido feito para realizar outro!')
          }
      } else {
        alert('Complete seu cadastro para Continuar')
        this.router.navigate(['/cadastro/cliente'])
      }
    })
  }
}
