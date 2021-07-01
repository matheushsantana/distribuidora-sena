import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/cliente/shared/cliente.service';
import { Pedido } from 'src/app/pedido/shared/pedido';
import { PedidoDataService } from 'src/app/pedido/shared/pedido-data.service';

@Component({
  selector: 'app-aceitar',
  templateUrl: './aceitar.component.html',
  styleUrls: ['./aceitar.component.css']
})
export class AceitarComponent implements OnInit {

  clientes: Observable<any>;

  mostraDetalhes: boolean = false;
  term: string = 'Aguardando a distribuidora aceitar'

  constructor(private clienteService: ClienteService, private pedidoDataService: PedidoDataService) { }

  ngOnInit(): void {
    this.clientes = this.clienteService.getAllCliente();
  }

  visualizar(pedido: Pedido, key: string){
    this.pedidoDataService.changePedido(pedido, key);
    this.mostraDetalhes = true;
  }

}
