import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CervejasComponent } from "./cervejas/cervejas.component";
import { DestiladosComponent } from "./destilados/destilados.component";
import { MerceariaComponent } from "./mercearia/mercearia.component";
import { SemAlcoolComponent } from "./sem-alcool/sem-alcool.component";
import { TabacariaComponent } from "./tabacaria/tabacaria.component";
import { VinhosComponent } from "./vinhos/vinhos.component";

const CategoriaRoutes: Routes = [
    {path: 'cervejas', component: CervejasComponent },
    {path: 'vinhos', component: VinhosComponent },
    {path: 'mercearia', component: MerceariaComponent },
    {path: 'destilados', component: DestiladosComponent },
    {path: 'sem-alcool', component: SemAlcoolComponent },
    {path: 'tabacaria', component: TabacariaComponent },
];

@NgModule({
    imports: [RouterModule.forChild(CategoriaRoutes)],
    exports: [RouterModule]
})
export class CategoriaRoutingModule { }