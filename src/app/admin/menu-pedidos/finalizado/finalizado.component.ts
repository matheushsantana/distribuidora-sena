import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/cliente/shared/cliente.service';

@Component({
  selector: 'app-finalizado',
  templateUrl: './finalizado.component.html',
  styleUrls: ['./finalizado.component.css']
})
export class FinalizadoComponent implements OnInit {

  clientes: Observable<any>;

  mostraDetalhes: boolean = false;
  term: string = 'Pedido finalizado'

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clientes = this.clienteService.getAllCliente();
  }

}
