import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/auth/user';
import { ClienteVerificaCadastro } from 'src/app/cliente/clienteVefificaCadastro.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {

  telefoneCliente: string;
  dadosCliente: Observable<User>;

  constructor(private appComponet: AppComponent, private clienteVerificaCadastro: ClienteVerificaCadastro, private appComponent: AppComponent) { 
    this.appComponet.ativaNav = false;
    this.appComponet.menuPerfil = false
  }

  ngOnInit(): void {
    this.telefoneCliente = this.clienteVerificaCadastro.dadosCliente.telefone
    this.dadosCliente = this.appComponent.user$
  }

}
