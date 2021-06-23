import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user';
import { CarrinhoService } from './carrinho/shared/carrinho.service';

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

  constructor(private authService: AuthService, private afs: AngularFirestore, private router: Router, private carrinhoService: CarrinhoService){
    this.user$ = this.authService.getUser();
    this.authenticated$ = this.authService.authenticated();
  }
  ngOnInit() {
    setTimeout(()=>{
     this.pegaId()
    }, 2000);
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/login')
  }

  pegaId(){
    var aux = document.getElementById('idCliente').innerHTML;
    this.carrinhoService.recebeId(aux);
  }
  
}
