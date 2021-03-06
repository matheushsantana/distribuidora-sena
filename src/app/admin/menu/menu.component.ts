import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nomes = ['clientes', 'produtos', 'pedidos', 'relatorio', 'cupom']
  esconde = true;

  constructor(private router: Router) {
    router.events.subscribe(dados => this.mudaComponent())
   }

  ngOnInit(): void {
    this.mudaComponent();
  }

  mudaComponent() {
    setTimeout(() => {
      var aux = window.location.href.split("/")
      for (var i = 0; i < 5; i++) {
        if (this.nomes[i] == aux[5]) {
          this.esconde = false
          var id = document.getElementById(this.nomes[i]).style;
          id.backgroundColor = 'white';
          id.color = '#211F20';
          for (var j = 0; j < 5; j++) {
            if (this.nomes[j] != aux[5]) {
              var id = document.getElementById(this.nomes[j]).style;
              id.backgroundColor = '#211F20';
              id.color = 'white';
            }
          }
        }
      }
    }, 100)

  }

}
