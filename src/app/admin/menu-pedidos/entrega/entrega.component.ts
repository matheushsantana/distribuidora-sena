import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/cliente/shared/cliente.service';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css']
})
export class EntregaComponent implements OnInit {

  clientes: Observable<any>;

  mostraDetalhes: boolean = false;
  term: string = 'Pedido saiu para entrega'

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clientes = this.clienteService.getAllCliente();
  }

}
