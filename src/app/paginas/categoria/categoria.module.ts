import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { FormsModule } from "@angular/forms";
import { ProdutosRoutingModule } from "src/app/produtos/produtos.routing.module";
import { environment } from "src/environments/environment";
import { CervejasComponent } from './cervejas/cervejas.component';
import { VinhosComponent } from './vinhos/vinhos.component';
import { MerceariaComponent } from './mercearia/mercearia.component';
import { DestiladosComponent } from './destilados/destilados.component';
import { SemAlcoolComponent } from './sem-alcool/sem-alcool.component';
import { TabacariaComponent } from './tabacaria/tabacaria.component';
import { CategoriaRoutingModule } from "./categoria.routing.module";
import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProdutosRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        CategoriaRoutingModule,
        Ng2SearchPipeModule,
    ],
    exports: [],
    declarations: [ 
        CervejasComponent, 
        VinhosComponent, 
        MerceariaComponent, 
        DestiladosComponent, 
        SemAlcoolComponent, 
        TabacariaComponent],
    schemas: [],
    providers: [],
})
export class CategoriaModule { }