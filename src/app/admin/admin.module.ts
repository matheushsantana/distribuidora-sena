import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './menu/admin.routing.module';
import { MenuComponent } from './menu/menu.component';
import { MenuClientesComponent } from './menu-clientes/menu-clientes.component';
import { MenuProdutosComponent } from './menu-produtos/menu-produtos.component';
import { MenuPedidosComponent } from './menu-pedidos/menu-pedidos.component';
import { MenuConcluidosComponent } from './menu-concluidos/menu-concluidos.component';
import { NgxMaskModule } from 'ngx-mask';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AceitarComponent } from './menu-pedidos/aceitar/aceitar.component';
import { PreparoComponent } from './menu-pedidos/preparo/preparo.component';
import { FinalizadoComponent } from './menu-pedidos/finalizado/finalizado.component';
import { EntregaComponent } from './menu-pedidos/entrega/entrega.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { VisualizarComponent } from './menu-pedidos/visualizar/visualizar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    NgxMaskModule.forRoot(),
    Ng2SearchPipeModule,
    LazyLoadImageModule
  ],
  exports: [],
  declarations: [
    MenuComponent,
    MenuClientesComponent,
    MenuProdutosComponent,
    MenuPedidosComponent,
    MenuConcluidosComponent,
    AceitarComponent,
    PreparoComponent,
    FinalizadoComponent,
    EntregaComponent,
    VisualizarComponent
  ],
  schemas: [],
  providers: [],
})

export class AdminModule {

  
}
