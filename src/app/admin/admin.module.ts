import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { MenuClientesComponent } from './menu-clientes/menu-clientes.component';
import { MenuProdutosComponent } from './menu-produtos/menu-produtos.component';
import { MenuPedidosComponent } from './menu-pedidos/menu-pedidos.component';
import { MenuConcluidosComponent } from './menu-concluidos/menu-concluidos.component';
import { NgxMaskModule } from 'ngx-mask';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { VisualizarComponent } from './menu-pedidos/visualizar/visualizar.component';
import { AdminRoutingModule } from './admin.routing.module';
import { CadastroCupomComponent } from './cupom/cadastro-cupom/cadastro-cupom.component';
import { EditarPedidoComponent } from './menu-pedidos/editar-pedido/editar-pedido.component';

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
    VisualizarComponent,
    CadastroCupomComponent,
    EditarPedidoComponent,
  ],
  schemas: [],
  providers: [],
})

export class AdminModule {

  
}
