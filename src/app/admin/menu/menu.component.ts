import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  opcoes = ['LISTA DE CLIENTES','LISTA DE PRODUTOS','','RELATORIO DE VENDAS']
  selecionado: string = 'BEM VINDO AO MENU ADMIN';
  component= [false, false, false, false,]
  nomes = ['clientes', 'produtos', 'pedidos', 'relatorio']
  esconde = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  mudaComponent(aux: number){
    for(var i = 0; i < 4; i++){
      if(i == aux){
        this.esconde = false
        var id = document.getElementById(this.nomes[i]).style;
        id.backgroundColor = 'white';
        id.color = '#211F20';
        for(var j = 0; j < 4; j++ ){
          if(j != aux){
            var id = document.getElementById(this.nomes[j]).style;
          id.backgroundColor = '#211F20';
          id.color = 'white';
          }
        }
      }
    }
  }

}
