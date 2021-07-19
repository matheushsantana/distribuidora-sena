import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { FormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";

import { CadastroProdutosComponent } from "./cadastro-produtos/cadastro-produtos.component";
import { EditarProdutoComponent } from "./editar-produto/editar-produto.component";
import { ProdutosRoutingModule } from "./produtos.routing.module";
import { ProdutoService } from "./shared/produto.service";
import { DropzoneComponent } from './cadastro-produtos/dropzone/dropzone.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProdutosRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
    ],
    exports: [],
    declarations: [
        CadastroProdutosComponent,
        EditarProdutoComponent,
        DropzoneComponent,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [ProdutoService],
})
export class ProdutosModule { }