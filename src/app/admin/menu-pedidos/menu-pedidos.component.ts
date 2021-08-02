import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/cliente/shared/cliente.service';
import { Pedido } from 'src/app/pedido/shared/pedido';
import { PedidoDataService } from 'src/app/pedido/shared/pedido-data.service';

@Component({
  selector: 'app-menu-pedidos',
  templateUrl: './menu-pedidos.component.html',
  styleUrls: ['./menu-pedidos.component.css']
})
export class MenuPedidosComponent implements OnInit {

  subCategoriaPedidos: string = 'PEDIDOS A ACEITAR'

  clientes: Observable<any>;

  opcoes = ['PEDIDOS A ACEITAR','PEDIDOS EM PREPARO','PEDIDOS EM ENTREGA','PEDIDOS CONCLUIDOS']
  component= [false, false, false, false,]
  nomes = ['aceitar', 'preparo', 'entrega', 'finalizado']
  estado = ['Aguardando a Distribuidora aceitar...','Pedido em preparo pela Distribuidora...','Pedido saiu para entrega...','Pedido finalizado...']

  mostraDetalhes: boolean = false;
  term: string = 'Aguardando a Distribuidora aceitar'

  aux: Observable<any>;

  constructor(private clienteService: ClienteService, private pedidoDataService: PedidoDataService) { }

  ngOnInit(): void {
    this.mudaComponent(0)
    this.clientes = this.clienteService.getAllCliente();
  }

  notificacao(){
    let audio = new Audio();
    audio.src = "assets/audio/notificacao-pedido.mp3";
    audio.load();
    audio.play();
  }

  mudaComponent(aux: number){
    for(var i = 0; i < 4; i++){
      if(i == aux){
        this.subCategoriaPedidos = this.opcoes[aux];
        this.component[aux] = true;
        var id = document.getElementById(this.nomes[i]).style;
        id.backgroundColor = '#211F20';
        id.color = 'white';
        this.term = this.estado[i];
        this.mostraDetalhes = false;
        for(var j = 0; j < 4; j++ ){
          if(j != aux){
            this.component[j] = false;
            var id = document.getElementById(this.nomes[j]).style;
          id.backgroundColor = 'white';
          id.color = 'black';
          }
        }
      }
    }
  }

  visualizar(pedido: Pedido, key: string){
    this.pedidoDataService.changePedido(pedido, key);
    this.mostraDetalhes = true;
  }
}
