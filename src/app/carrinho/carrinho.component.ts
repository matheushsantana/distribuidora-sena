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
import { CalculaFrete } from './calculaFrete.service';
import { Cupom } from '../cupom/cupom';
import { CupomService } from '../cupom/cupom.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  carrinho: Observable<any>;
  produtos: any;
  produto: Carrinho;
  carregando: boolean = false;
  qtd: number;
  total: number;
  totalFinal: number;
  frete: number = 0;
  quantidadeProd: number;
  pedido: any;
  metodoPagamento: string = 'Selecione a forma de pagamento';
  contadorProd: Contador;
  enderecoCliente: string;
  instrucoes: string;
  descontoCupom: number = 0;
  cupomAdd: boolean = false;
  tipoDescon: string = 'Sem desconto...';

  data = new Date();

  chave: string = '';

  imgPadrao = 'assets/pre-carregamento-prod.gif'

  constructor(private carrinhoService: CarrinhoService, private pedidoService: PedidoService,
    private clienteLogado: ClienteLogado, private location: Location, private clienteVerificaCadastro: ClienteVerificaCadastro,
    private router: Router, private calculaFrete: CalculaFrete, private cupomService: CupomService) {
    this.carrinho = this.carrinhoService.getAllProdCarrinho();
    this.carregando = true;
  }

  ngOnInit() {
    window.scrollTo(0, 0)

    this.enderecoCliente = this.clienteVerificaCadastro.dadosCliente.enderecoRua + ', '
      + this.clienteVerificaCadastro.dadosCliente.enderecoNumero + ', '
      + this.clienteVerificaCadastro.dadosCliente.enderecoBairro

    this.chamaCalculaFrete();

  }

  verificaCupom() {
    if (this.chave != '') {
      var invalido = document.getElementById('cupom-invalido').style
      var valido = document.getElementById('cupom-valido').style
      var aux = document.getElementById('desconto').style
      var entrega = document.getElementById('valorEntrega').style
      if (this.cupomAdd != true) {
        this.cupomService.getAllCupom(this.chave).subscribe(dados => {
          if (dados.length < 2) {
            invalido.display = 'block';
            valido.display = 'none';
            aux.display = 'none'
            entrega.color = 'black'
            this.descontoCupom = 0;
            this.totalPedido2(0, this.validaValor)
          } else {
            invalido.display = 'none';
            valido.display = 'block';
            this.cupomAdd = true;
            if (dados[2] == 'porcentagem') {
              this.descontoCupom = parseFloat(((this.totalFinal - this.frete) * (dados[1] / 100)).toFixed(2))
              this.totalPedido2(0, this.validaValor);
              aux.display = 'block'
              this.tipoDescon = 'Porcentagem'
            }
            if (dados[2] == 'inteiro') {
              this.descontoCupom = parseFloat((dados[1]))
              this.totalPedido2(0, this.validaValor);
              aux.display = 'block'
              this.tipoDescon = 'Valor'
            }
            if (dados[1] == 'entrega') {
              this.descontoCupom = this.calculaFrete.precoFrente
              console.log(this.descontoCupom);
              this.totalPedido2(1, this.validaValor);
              entrega.color = 'rgb(0, 151, 0)';
              this.tipoDescon = 'Frete Gratis'
            }
          }
        })
      } else {
        invalido.display = 'none';
        valido.display = 'none';
        aux.display = 'none'
        entrega.color = 'black'
        this.chave = '';
        this.descontoCupom = 0;
        this.totalPedido2(0, this.validaValor)
        this.cupomAdd = false;
        this.tipoDescon = 'Sem desconto...'
      }
    }
  }

  chamaCalculaFrete() {
    if (this.calculaFrete.freteCarregado == 1 || this.calculaFrete.freteCarregado == 3) {
      this.calculaFrete.calculaFrete(this, this.totalPedido)
    } else if (this.calculaFrete.freteCarregado == 2) {
      this.totalPedido2(0, this.validaValor)
    }
  }

  escondeTransicao() {
    var site = document.getElementById('component').style
    site.display = 'block';
    var carregamento = document.getElementById('carregando')
    carregamento.classList.add("hide")
  }

  voltaPagina() {
    this.location.back();
  }

  atualizaEndereco() {
    this.router.navigate(['/cadastro/cliente'])
  }

  quantidadeAltera(valor: number, key: number) {

    for (var i = 0; i < this.qtd; i++) {
      if (valor >= 1) {
        if (this.produtos[i].key == key) {
          this.produtos[i].quantidade = Number(this.produtos[i].quantidade) + 1;
          this.produtos[i].total = Number(this.produtos[i].total) + Number(this.produtos[i].valor);
          this.total = Number(this.total) + Number(this.produtos[i].valor);
          this.totalFinal = Number(this.totalFinal) + Number(this.produtos[i].valor);
          this.quantidadeProd = this.quantidadeProd + 1;

          this.produto = new Carrinho();
          this.produto.nome = this.produtos[i].nome,
            this.produto.linkImg = this.produtos[i].linkImg,
            this.produto.quantidade = this.produtos[i].quantidade,
            this.produto.total = this.produtos[i].total,
            this.produto.valor = this.produtos[i].valor,
            this.carrinhoService.atualizaCarrinho(i, this.produto);
            this.cupomAdd = false;
            this.verificaCupom();
        }

      } else if (valor === 0) {
        if (this.produtos[i].key == key) {
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
              this.carrinhoService.atualizaCarrinho(key, this.produto);
              this.cupomAdd = false;
              this.verificaCupom();
          }
        }
      }
    }

  }

  pegaProduros() {
    this.carrinho.subscribe(dados => {
      this.produtos = dados
    })
  }

  totalPedido(comp, precoFrete) {
    comp.escondeTransicao()
    comp.pegaProduros();
    comp.frete = precoFrete
    comp.carrinho.subscribe(dados => {
      comp.produtos = dados
      var i: number = 0;
      var a: number = 0;
      var j: number = 0
      var aux: number = 0;
      comp.total = 0.00;
      comp.qtd = 0;
      comp.quantidadeProd = 0;
      comp.totalFinal = precoFrete;
      comp.totalFinal -= comp.descontoCupom;
      var qtdAux = (Object.keys(comp.produtos).length)
      while (a < qtdAux) {
        if (comp.produtos[j] != null) {
          comp.qtd++
          a++
          j++
        } else {
          a++
          j++
        }
      }
      while (aux < comp.qtd) {
        if (comp.produtos[i] != null) {
          comp.total = Number(comp.total) + Number(comp.produtos[i].total);
          comp.quantidadeProd = comp.quantidadeProd + comp.produtos[i].quantidade;
          comp.totalFinal = Number(comp.totalFinal) + Number(comp.produtos[i].total);
          aux++
          i++
        } else {
          i++
        }
      }
    })
  }

  totalPedido2(aux, callBack) {
    this.escondeTransicao()
    this.pegaProduros();
    if(aux == 1){
      this.frete = 0
    }else{
      this.frete = this.calculaFrete.precoFrente
    }
    this.carrinho.subscribe(dados => {
      this.produtos = dados
      var i: number = 0;
      var a: number = 0;
      var j: number = 0
      var aux: number = 0;
      this.total = 0.00;
      this.qtd = 0;
      this.quantidadeProd = 0;
      this.totalFinal = this.calculaFrete.precoFrente;
      this.totalFinal -= this.descontoCupom;
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
      callBack(this)
    })
  }

  validaValor(comp){
    if(comp.totalFinal < 0){
      comp.totalFinal = 0
    }
  }

  apagarProduto(key: string) {
    if (this.qtd > 1) {
      this.carrinhoService.deleteProdCarrinho(key, 0);
      setTimeout(() => {
        this.totalPedido(this, this.frete)
      }, 1000);
    } else {
      this.carrinhoService.deleteProdCarrinho(key, 1);
      setTimeout(() => {
        this.totalPedido(this, this.frete)
      }, 1000);
    }
  }

  fazerPedido() {
    if (this.clienteVerificaCadastro.aux != null) {
      if (this.qtd != 0) {
        if (this.metodoPagamento != 'Selecione a forma de pagamento') {
          this.carrinhoService.getContadorPedido().subscribe(contador => {
            this.pedido = new Pedido();
            this.contadorProd = new Contador();
            this.pedido.pedidoId = contador[0].valor;
            this.contadorProd.valor = this.pedido.pedidoId
            this.pedido.clienteId = this.clienteLogado.cliente.id;
            this.pedido.clienteNome = this.clienteLogado.cliente.nome;
            this.pedido.clienteNumero = this.clienteVerificaCadastro.dadosCliente.telefone;
            this.pedido.data = this.data.getDate() + '/' + (this.data.getMonth() + 1) + '/' + this.data.getFullYear() + ' - ' + this.data.getHours() + ':' + this.data.getMinutes();
            this.pedido.metodoPag = this.metodoPagamento;
            if (this.instrucoes == undefined || this.instrucoes == null) {
              this.pedido.instrucoes = 'Sem instruções...';
            } else {
              this.pedido.instrucoes = this.instrucoes;
            }
            this.pedido.tipoDesconto = this.tipoDescon;
            this.pedido.desconto = this.descontoCupom;
            this.pedido.clienteEnderecoRua = this.clienteVerificaCadastro.dadosCliente.enderecoRua;
            this.pedido.clienteEnderecoBairro = this.clienteVerificaCadastro.dadosCliente.enderecoBairro;
            this.pedido.clienteEnderecoNumero = this.clienteVerificaCadastro.dadosCliente.enderecoNumero;
            this.pedido.estado = 'Aguardando a Distribuidora aceitar...'
            this.pedido.produtos = this.produtos;
            this.pedido.valor = this.totalFinal;

            this.pedidoService.insertPedido(this.pedido);
            this.carrinhoService.atualizarContadorPedido(this.contadorProd);
            this.carrinhoService.deletarCarrinho();
            return;
          });
        } else {
          alert('Escolha a forma de Pagamento!');
          return;
        }
      } else {
        alert('Adicione Pelo menos um produto!');
        this.router.navigate(['/']);
      }
    } else {
      alert('Complete seu cadastro para Continuar');
      this.router.navigate(['/cadastro/cliente']);
      return;

    }
  }
}
