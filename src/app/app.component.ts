import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user';
import { CarrinhoService } from './carrinho/shared/carrinho.service';
import { ClienteLogado } from './cliente/clienteLogado.service';
import { Cliente } from './cliente/shared/cliente';
import { Pedido } from './pedido/shared/pedido';
import { PedidoService } from './pedido/shared/pedido.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  user$ : Observable<User>;
  authenticated$ : Observable<boolean>;
  idCliente: string;
  valor: string;
  cliente: Cliente;
  verificaPedido: boolean; 

  url = 'https://projeto-distribuidora-default-rtdb.firebaseio.com/cliente/';

  constructor(private authService: AuthService, private afs: AngularFirestore, private router: Router, private carrinhoService: CarrinhoService,
    private clienteLogado: ClienteLogado, private http: HttpClient, private pedidoService: PedidoService){
    this.user$ = this.authService.getUser();
    this.authenticated$ = this.authService.authenticated();
  }
  ngOnInit() {
    this.user$.subscribe(dados => {
      this.cliente = new Cliente();
      this.cliente.id = dados.id;
      this.cliente.nome = dados.firsname;
      this.clienteLogado.recebeDados(this.cliente);
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/')
    
  }

  pegarDados() {
    return this.http.get<Pedido>(`${this.url + this.clienteLogado.cliente.id + '/pedido.json'}`);
  }

  verifica(){
    this.pegarDados().subscribe(dados => {
      if(dados == null){
        this.verificaPedido = false
        this.router.navigate(['/carrinho', this.clienteLogado.cliente.id]);
      }else{
        this.verificaPedido = true;
        this.router.navigate(['/pedido', this.clienteLogado.cliente.id]);
      }
    })
  }
  
}
