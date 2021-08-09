import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './paginas/home-page/home-page.component';
import { ResultadoPesquisaComponent } from './paginas/resultado-pesquisa/resultado-pesquisa.component';
import { ProdutoSelecionadoComponent } from './paginas/produto-selecionado/produto-selecionado.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { HttpClientModule } from '@angular/common/http';
import { PedidoComponent } from './pedido/pedido.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ClienteComponent } from './cliente/cliente.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NgxMaskModule } from 'ngx-mask';
import { GoogleMapsModule } from '@angular/google-maps'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CupomComponent } from './admin/cupom/cupom.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ResultadoPesquisaComponent,
    ProdutoSelecionadoComponent,
    CarrinhoComponent,
    PedidoComponent,
    ClienteComponent,
    CupomComponent,
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    LazyLoadImageModule,
    NgxMaskModule.forRoot(),
    GoogleMapsModule,
    BrowserAnimationsModule 
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
