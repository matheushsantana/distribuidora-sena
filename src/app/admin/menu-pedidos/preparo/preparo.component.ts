import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/cliente/shared/cliente.service';

@Component({
  selector: 'app-preparo',
  templateUrl: './preparo.component.html',
  styleUrls: ['./preparo.component.css']
})
export class PreparoComponent implements OnInit {

  clientes: Observable<any>;

  mostraDetalhes: boolean = false;
  term: string = 'Pedido em preparo pela distribuidora'

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clientes = this.clienteService.getAllCliente();
  }

}
