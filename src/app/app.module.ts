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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ResultadoPesquisaComponent,
    ProdutoSelecionadoComponent,
    CarrinhoComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
