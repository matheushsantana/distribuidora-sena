import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroProdutosComponent } from "./cadastro-produtos/cadastro-produtos.component";
import { EditarProdutoComponent } from "./editar-produto/editar-produto.component";
import { ListaProdutosComponent } from "./lista-produtos/lista-produtos.component";

const ProdutosRoutes: Routes = [
    { path: '', component: ListaProdutosComponent },
    { path: 'cadastro', component: CadastroProdutosComponent },
    { path: 'editar/:id', component: EditarProdutoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(ProdutosRoutes)],
    exports: [RouterModule]
})
export class ProdutosRoutingModule { }
