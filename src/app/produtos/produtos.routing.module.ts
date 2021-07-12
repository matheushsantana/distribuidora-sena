import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroProdutosComponent } from "./cadastro-produtos/cadastro-produtos.component";
import { EditarProdutoComponent } from "./editar-produto/editar-produto.component";

const ProdutosRoutes: Routes = [
    { path: 'cadastro', component: CadastroProdutosComponent },
    { path: 'editar/:id', component: EditarProdutoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(ProdutosRoutes)],
    exports: [RouterModule]
})
export class ProdutosRoutingModule { }
