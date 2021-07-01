import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuComponent } from "./menu/menu.component";

const AdminRoutes: Routes = [
   { path: 'menu', component: MenuComponent }
];

@NgModule({
    imports: [RouterModule.forChild(AdminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
