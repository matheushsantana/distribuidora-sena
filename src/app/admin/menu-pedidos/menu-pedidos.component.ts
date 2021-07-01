import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-pedidos',
  templateUrl: './menu-pedidos.component.html',
  styleUrls: ['./menu-pedidos.component.css']
})
export class MenuPedidosComponent implements OnInit {

  subCategoriaPedidos: string = 'PEDIDOS A ACEITAR'

  opcoes = ['PEDIDOS A ACEITAR','PEDIDOS EM PREPARO','PEDIDOS EM ENTREGA','PEDIDOS CONCLUIDOS']
  component= [false, false, false, false,]
  nomes = ['aceitar', 'preparo', 'entrega', 'finalizado']

  constructor() { }

  ngOnInit(): void {
    this.mudaComponent(0)
  }

  mudaComponent(aux: number){
    for(var i = 0; i < 4; i++){
      if(i == aux){
        this.subCategoriaPedidos = this.opcoes[aux];
        this.component[aux] = true;
        var id = document.getElementById(this.nomes[i]).style;
        id.backgroundColor = '#211F20';
        id.color = 'white';
        for(var j = 0; j < 4; j++ ){
          if(j != aux){
            this.component[j] = false;
            var id = document.getElementById(this.nomes[j]).style;
          id.backgroundColor = 'white';
          id.color = 'black';
          }
        }
      }
    }
  }
}
