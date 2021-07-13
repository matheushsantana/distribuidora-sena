import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AuthGuard } from './guards/auth.guard';
import { HomePageComponent } from "./paginas/home-page/home-page.component";
import { ProdutoSelecionadoComponent } from "./paginas/produto-selecionado/produto-selecionado.component";
import { ResultadoPesquisaComponent } from "./paginas/resultado-pesquisa/resultado-pesquisa.component";
import { PedidoComponent } from './pedido/pedido.component';

const appRoutes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', component: HomePageComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
  { path: 'produtos', loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosModule) },
  { path: 'categoria', loadChildren: () => import('./paginas/categoria/categoria.module').then(m => m.CategoriaModule) },
  { path: 'pesquisa/:produto', component: ResultadoPesquisaComponent },
  { path: 'produto-selecionado', component: ProdutoSelecionadoComponent, canActivate: [AuthGuard] },
  { path: 'carrinho/:id', component: CarrinhoComponent, canActivate: [AuthGuard] },
  { path: 'pedido/:id', component: PedidoComponent, canActivate: [AuthGuard] },
  { path: 'cadastro/cliente', component: ClienteComponent, canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
