import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './menu/admin.routing.module';
import { MenuComponent } from './menu/menu.component';
import { MenuClientesComponent } from './menu-clientes/menu-clientes.component';
import { MenuProdutosComponent } from './menu-produtos/menu-produtos.component';
import { MenuPedidosComponent } from './menu-pedidos/menu-pedidos.component';
import { MenuConcluidosComponent } from './menu-concluidos/menu-concluidos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  exports: [],
  declarations: [
    MenuComponent,
    MenuClientesComponent,
    MenuProdutosComponent,
    MenuPedidosComponent,
    MenuConcluidosComponent
  ],
  schemas: [],
  providers: [],
})

export class AdminModule {

  
}
