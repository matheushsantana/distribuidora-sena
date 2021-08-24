import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { ClienteLogado } from 'src/app/cliente/clienteLogado.service';
import { Pedido } from 'src/app/pedido/shared/pedido';
import { MeusPedidosDataService } from '../meus-pedidos-data.service';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value) {
      if (!value) return;

      return value.reverse();
    }
}


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  pedidos: Observable<Pedido[]>

  constructor(private db: AngularFireDatabase, private clienteLogado: ClienteLogado, private appComponent: AppComponent, 
    private meusPedidosDataService: MeusPedidosDataService) { 
    this.appComponent.ativaNav = false;
  }

  ngOnInit(): void {
    this.pedidos = this.getPedidos();
  }

  getPedidos(){
    return this.db.list('cliente/' + this.clienteLogado.cliente.id + '/pedidosFinalizadosCliente')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
      })
    );
  }

  detalhes(pedido: Pedido, key: string){
    this.meusPedidosDataService.changePedido(pedido, key)
  }

}
