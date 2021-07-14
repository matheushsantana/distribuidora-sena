import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Carrinho } from 'src/app/carrinho/shared/carrinho';

@Component({
  selector: 'app-menu-concluidos',
  templateUrl: './menu-concluidos.component.html',
  styleUrls: ['./menu-concluidos.component.css']
})
export class MenuConcluidosComponent implements OnInit {

  data: Date = new Date();
  dataSelecionada: any;

  dataInalguracao  = [7, 2021];
  dataAtual = [Number((this.data.getMonth() + 1)),  Number(this.data.getFullYear())];
  mes = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  opcoes: any[] = [];
  auxMes: number;
  auxAno: number;
  mesSelect: Observable<any>;

  totalVendido: number = 0;
  maisVendidos: any[];

  constructor(private db: AngularFireDatabase){}

  ngOnInit(): void {
    this.verifica();
  }

  verifica(){
    var aux: number;
    var dataAno = this.dataAtual[1] - this.dataInalguracao[1]
    
    //Se a subtração dos anos for == 0
    if(dataAno == 0){
      aux = this.dataAtual[0] - this.dataInalguracao[0]
      this.auxMes = this.dataInalguracao[0]
      this.auxAno = this.dataInalguracao[1]
      for(var i = 0; i <= aux; i++){
        this.opcoes[aux - i] = 'Referente à ' + this.mes[this.auxMes] +' / '+ this.auxAno
        this.auxMes++
      }
    }

    //se a subtração dos anos for == 1
    if(dataAno == 1){
      var auxSobraMes = (12 - this.dataInalguracao[0]) + 1
      var totalMes = 0
      var mesAtual = this.dataAtual[0]
      var auxCont1 = this.dataAtual[0];
      var auxCont2 = 13;

      for(var i = 0; i <= 1; i++){
        for(var j = auxCont1; j <= auxCont2; j++){
          if(mesAtual != 0){
            this.opcoes[totalMes] = 'Referente à ' + this.mes[mesAtual] +' / '+ this.dataAtual[1]
            totalMes++
            mesAtual--
          }

          if(mesAtual == 0){
            mesAtual = 12
            auxCont1 = 1
            auxCont2 = auxSobraMes
            this.dataAtual[1]--
          }
        }
      }
    }

    //se a subtração for > 1
    if(dataAno > 1){
      var auxCont1 = this.dataAtual[0]
      var auxCont2 = 13
      var mesAtual = this.dataAtual[0]
      var totalMes = 0
    
      for(var i = 0; i <= dataAno; i++){
        for(var j = auxCont1; j <= auxCont2; j++){
          if(mesAtual != 0){
            this.opcoes[totalMes] = 'Referente à ' + this.mes[mesAtual] +' / '+ this.dataAtual[1]
            totalMes++
            mesAtual--
          }

          if(mesAtual == 0){
            if(i < dataAno - 1){
              mesAtual = 12
              auxCont1 = 1
              auxCont2 = 13
              this.dataAtual[1]--
            } else{
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

  carregar(){
    var aux = this.dataSelecionada.split(" ");
    for(var i = 1; i <= 12; i++){
      if(this.mes[i] == aux[2]){
        var mesNumber = i;
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

  calcula(){
    this.mesSelect.subscribe(dados => {
      console.log('dados', dados)

      for(var i = 0; i < dados.length; i++)
      this.totalVendido += dados[i].valor;
      console.log('total: ', this.totalVendido)
    })
  }

}
