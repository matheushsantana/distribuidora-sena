import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})
export class MeusPedidosComponent implements OnInit {

  constructor(private appComponent: AppComponent, private router: Router) { 
    this.appComponent.ativaNav = false;
    this.appComponent.menuPerfil = false
  }

  ngOnInit(): void {
  }

}
