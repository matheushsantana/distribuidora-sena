import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Pedido } from 'src/app/pedido/shared/pedido';

@Component({
  selector: 'app-menu-concluidos',
  templateUrl: './menu-concluidos.component.html',
  styleUrls: ['./menu-concluidos.component.css']
})
export class MenuConcluidosComponent implements OnInit {

  data: Date = new Date();

  dataInalguracao  = [7, 2020];
  dataAtual = [Number((this.data.getMonth() + 1)),  Number(this.data.getFullYear())];
  opcoes: any[] = [];

  constructor(private db: AngularFireDatabase){}

  ngOnInit(): void {
    console.log(this.dataAtual)
    this.verifica();
  }

  insertPedido(pedido: Pedido){
    this.db.list('pedidosFinalizados').push(pedido)
    .then((result: any) =>{
        console.log(result.key);
      });
  }

  verifica(){
    var ano =  this.dataAtual[1] - this.dataInalguracao[1];
    var qtdAno: number;
    var qtdMes: number;
    var auxAno = this.dataInalguracao[1];
    if(ano == 0){
      var mes = this.dataAtual[0] - this.dataInalguracao[0]
      this.opcoes[mes] = this.dataInalguracao[0] +'/'+ this.dataAtual[1]
      for(var i = 1; i <= mes; i++){
        this.opcoes[mes - i] = (this.dataInalguracao[0] + i) +'/'+ this.dataAtual[1]
      }
    }else{
      console.log('valora ano', ano)
      if(ano == 1){
        console.log('entoru ano 1', this.dataAtual[0], this.dataInalguracao[0])
        if(this.dataInalguracao[0] == this.dataAtual[0]){
          console.log('entrou')
          qtdAno = 12;
          this.opcoes[qtdAno] = this.dataInalguracao[0] +'/'+ this.dataAtual[1]
          for(var i = 1; i <= qtdAno; i++){
            if((this.dataInalguracao[0] + i) <= 12){
              this.opcoes[qtdAno - i] = (this.dataInalguracao[0] + i) +'/'+ this.dataAtual[1]
            }
            
          }
        }



        if(this.dataInalguracao[0] < this.dataAtual[0]){
          qtdMes = (12 -  this.dataInalguracao[0]) + this.dataAtual[0]
        }
        if(this.dataInalguracao[0] > this.dataAtual[0]){
          qtdAno = 12
          qtdMes = this.dataAtual[0]
        }
      }else {
        if(this.dataInalguracao[0] = this.dataAtual[0]){
          qtdAno = ano * 12;
        }
        if(this.dataInalguracao[0] < this.dataAtual[0]){
          qtdAno = (ano - 1) * 12
          qtdMes = (12 -  this.dataInalguracao[0]) + this.dataAtual[0]
        }
        if(this.dataInalguracao[0] > this.dataAtual[0]){
          qtdAno = ano * 12;
          qtdMes = this.dataAtual[0]
        }
      }
      
    }
  }

}
