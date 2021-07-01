import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/cliente/shared/cliente';
import { ClienteService } from 'src/app/cliente/shared/cliente.service';

@Component({
  selector: 'app-menu-clientes',
  templateUrl: './menu-clientes.component.html',
  styleUrls: ['./menu-clientes.component.css']
})
export class MenuClientesComponent implements OnInit {

  clientes: Observable<any>;

  constructor(private clienteService: ClienteService, private http: HttpClient) { }

  ngOnInit(): void {

    this.clientes = this.clienteService.getAllCliente();
  }
  
}
