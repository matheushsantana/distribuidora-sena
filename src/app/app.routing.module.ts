import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AuthGuard } from './guards/auth.guard';
import { BugsComponent } from './paginas/bugs/bugs.component';
import { HomePageComponent } from "./paginas/home-page/home-page.component";
import { IrCarrinhoComponent } from './paginas/ir-carrinho/ir-carrinho.component';
import { MeuPerfilComponent } from './paginas/meu-perfil/meu-perfil.component';
import { ProdutoSelecionadoComponent } from "./paginas/produto-selecionado/produto-selecionado.component";
import { ReportBugComponent } from './paginas/report-bug/report-bug.component';
import { ResultadoPesquisaComponent } from "./paginas/resultado-pesquisa/resultado-pesquisa.component";
import { PedidoComponent } from './pedido/pedido.component';

const appRoutes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', component: HomePageComponent, data: {animation: 'HomePage' } },
  { path: 'categoria', loadChildren: () => import('./paginas/categoria/categoria.module').then(m => m.CategoriaModule), data: {animation: 'categoria'} },
  { path: 'pesquisa/:produto', component: ResultadoPesquisaComponent, data: {animation: 'pesquisa'} },
  { path: 'produto-selecionado', component: ProdutoSelecionadoComponent, data: {animation: 'produto-select'} },
  { path: 'opcao', component: IrCarrinhoComponent, canActivate: [AuthGuard], data: {Animation: 'opcao'} },
  { path: 'carrinho/:id', component: CarrinhoComponent, canActivate: [AuthGuard], data: {animation: 'carrinho'} },
  { path: 'pedido/:id', component: PedidoComponent, canActivate: [AuthGuard], data: {animation: 'pedido'} },
  { path: 'cadastro/cliente', component: ClienteComponent, canActivate: [AuthGuard], data: {animation: 'cadastro-cliente'} },
  { path: 'meu-perfil', component: MeuPerfilComponent, canActivate: [AuthGuard], data: {Animation: 'perfil'} },
  { path: 'report-bug', component: ReportBugComponent, data: {Animation: 'bug'} },
  { path: 'produtos', loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosModule), data: {animation: 'produtos'} },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
  { path: 'bugs', component: BugsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
