import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/cliente/shared/cliente.service';

@Component({
  selector: 'app-menu-clientes',
  templateUrl: './menu-clientes.component.html',
  styleUrls: ['./menu-clientes.component.css']
})
export class MenuClientesComponent implements OnInit {

  clientes: Observable<any>;
  clientePesquisado: any;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {

    this.clientes = this.clienteService.getAllCliente();
  }
  
}
