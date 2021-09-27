import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroCupomComponent } from "./cupom/cadastro-cupom/cadastro-cupom.component";
import { CupomComponent } from "./cupom/cupom.component";
import { MenuClientesComponent } from "./menu-clientes/menu-clientes.component";
import { MenuConcluidosComponent } from "./menu-concluidos/menu-concluidos.component";
import { EditarPedidoComponent } from "./menu-pedidos/editar-pedido/editar-pedido.component";
import { MenuPedidosComponent } from "./menu-pedidos/menu-pedidos.component";
import { MenuProdutosComponent } from "./menu-produtos/menu-produtos.component";
import { MenuComponent } from "./menu/menu.component";

const AdminRoutes: Routes = [
   { path: 'menu', component: MenuComponent, children : [
    { path: 'clientes', component: MenuClientesComponent },
    { path: 'produtos', component: MenuProdutosComponent },
    { path: 'pedidos', component: MenuPedidosComponent },
    { path: 'editar-pedido', component: EditarPedidoComponent },
    { path: 'relatorio', component: MenuConcluidosComponent },
    { path: 'cupom', component: CupomComponent},
    { path: 'cupom/cadastro', component: CadastroCupomComponent}
   ]},
   
];

@NgModule({
    imports: [RouterModule.forChild(AdminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
