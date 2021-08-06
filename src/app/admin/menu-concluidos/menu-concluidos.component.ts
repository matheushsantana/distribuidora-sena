import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProdutoVendido } from './produtoVendido';

@Component({
  selector: 'app-menu-concluidos',
  templateUrl: './menu-concluidos.component.html',
  styleUrls: ['./menu-concluidos.component.css']
})
export class MenuConcluidosComponent implements OnInit {

  data: Date = new Date();
  dataSelecionada: any;

  dataInalguracao = [8, 2021];
  dataAtual = [Number((this.data.getMonth() + 1)), Number(this.data.getFullYear())];
  mes = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  opcoes: any[] = [];
  auxMes: number;
  auxAno: number;
  mesSelect: Observable<any>;
  auxData: any;
  mostraCard = false;
  vendas: any[] = [];

  totalVendido: number[] = [];
  totalVendidoCartao: number[] = [];
  totalVendidoDinheiro: number[] = [];
  maisVendido = [];

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.verifica();
  }

  verifica() {
    var aux: number;
    var dataAno = this.dataAtual[1] - this.dataInalguracao[1]

    //Se a subtração dos anos for == 0
    if (dataAno == 0) {
      aux = this.dataAtual[0] - this.dataInalguracao[0]
      this.auxMes = this.dataInalguracao[0]
      this.auxAno = this.dataInalguracao[1]
      for (var i = 0; i <= aux; i++) {
        this.opcoes[aux - i] = 'Referente à ' + this.mes[this.auxMes] + ' / ' + this.auxAno
        this.auxMes++
      }
    }

    //se a subtração dos anos for == 1
    if (dataAno == 1) {
      var auxSobraMes = (12 - this.dataInalguracao[0]) + 1
      var totalMes = 0
      var mesAtual = this.dataAtual[0]
      var auxCont1 = this.dataAtual[0];
      var auxCont2 = 13;

      for (var i = 0; i <= 1; i++) {
        for (var j = auxCont1; j <= auxCont2; j++) {
          if (mesAtual != 0) {
            this.opcoes[totalMes] = 'Referente à ' + this.mes[mesAtual] + ' / ' + this.dataAtual[1]
            totalMes++
            mesAtual--
          }

          if (mesAtual == 0) {
            mesAtual = 12
            auxCont1 = 1
            auxCont2 = auxSobraMes
            this.dataAtual[1]--
          }
        }
      }
    }

    //se a subtração for > 1
    if (dataAno > 1) {
      var auxCont1 = this.dataAtual[0]
      var auxCont2 = 13
      var mesAtual = this.dataAtual[0]
      var totalMes = 0

      for (var i = 0; i <= dataAno; i++) {
        for (var j = auxCont1; j <= auxCont2; j++) {
          if (mesAtual != 0) {
            this.opcoes[totalMes] = 'Referente à ' + this.mes[mesAtual] + ' / ' + this.dataAtual[1]
            totalMes++
            mesAtual--
          }

          if (mesAtual == 0) {
            if (i < dataAno - 1) {
              mesAtual = 12
              auxCont1 = 1
              auxCont2 = 13
              this.dataAtual[1]--
            } else {
              mesAtual = 12
              auxCont1 = 1
              auxCont2 = (12 - this.dataInalguracao[0]) + 1
              this.dataAtual[1]--
            }

          }
        }
      }
    }
  }

  carregar() {
    var aux = this.dataSelecionada.split(" ");
    for (var i = 1; i <= 12; i++) {
      if (this.mes[i] == aux[2]) {
        var mesNumber = i;
        this.auxData = this.mes[i] + '/' + aux[4]
      }
    }

    this.mesSelect = this.db.list('pedidosFinalizados/' + aux[4] + '/' + mesNumber)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
        })
      );
    this.calcula();
  }

  calcula() {
    var i: number;
    var j: number;
    var k: number;
    var existe: boolean = false

    this.totalVendido = [0, 0];
    this.totalVendidoCartao = [0 , 0];
    this.totalVendidoDinheiro = [0, 0];
    

    this.mostraCard = true;
    this.mesSelect.subscribe(dados => {
      this.vendas = dados
      this.maisVendido = [];

      for (i = 0; i < dados.length; i++) {
        this.totalVendido[1] += this.vendas[i].valor;
        this.totalVendido[0]++

        var qtdProd = (Object.keys(this.vendas[i].produtos).length)

        for (j = 0; j < qtdProd; j++) {
          if (this.maisVendido == undefined) {
            this.maisVendido[i] = new ProdutoVendido();
            this.maisVendido[i].nome = this.vendas[i].produtos[j].nome;
            this.maisVendido[i].quantidade = this.vendas[i].produtos[j].quantidade;
          } else {
            var auxMaisVendidos = (Object.keys(this.maisVendido).length)
            existe = false
            for (k = 0; k < auxMaisVendidos; k++) {
              if (this.maisVendido[k].nome == this.vendas[i].produtos[j].nome) {
                this.maisVendido[k].quantidade += this.vendas[i].produtos[j].quantidade;
                existe = true;
              }
            }
            if (existe != true) {
              this.maisVendido[auxMaisVendidos] = new ProdutoVendido()
              this.maisVendido[auxMaisVendidos].nome = this.vendas[i].produtos[j].nome
              this.maisVendido[auxMaisVendidos].quantidade = this.vendas[i].produtos[j].quantidade
            }
          }
        }

        if (dados[i].metodoPag == "Dinheiro") {
          this.totalVendidoDinheiro[1] += this.vendas[i].valor
          this.totalVendidoDinheiro[0]++
        } else {
          this.totalVendidoCartao[1] += this.vendas[i].valor
          this.totalVendidoCartao[0]++
        }
      }
    })
  }

}
