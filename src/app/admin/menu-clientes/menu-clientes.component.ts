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

  clientesAux: any[] = [];
  clientes: string[] = [];

  url = 'https://projeto-distribuidora-default-rtdb.firebaseio.com/cliente.json'

  constructor(private clienteService: ClienteService, private http: HttpClient) { }

  ngOnInit(): void {
    this.lerDados();
  }

  pegarDados() {
    return this.http.get<any[]>(`${this.url}`);
  }

  lerDados(){
    this.pegarDados().subscribe(dados => {
      this.clientesAux = dados;
      this.clientes[0] = this.clientesAux
    })
  }

}
