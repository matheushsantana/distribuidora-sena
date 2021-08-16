import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/auth/auth.service';
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

  constructor(private appComponet: AppComponent, private clienteVerificaCadastro: ClienteVerificaCadastro, private appComponent: AppComponent,
    private authService: AuthService, private router: Router) { 
    this.appComponet.ativaNav = false;
    this.appComponet.menuPerfil = false
  }

  ngOnInit(): void {
    this.telefoneCliente = this.clienteVerificaCadastro.dadosCliente.telefone
    this.dadosCliente = this.appComponent.user$
  }

  logout() {
    this.authService.logout();
    setTimeout(() => {
      window.location.href = '/'
    }, 500);
  }

  atualizaEndereco() {
    this.router.navigate(['/cadastro/cliente'])
  }

}
