import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from 'rxjs/operators';
import { EstadoDistribuidora } from "./estadoDistribuidora";

@Injectable({
    providedIn: 'root'
})
export class EstadoDistribuidoraGuard {

    estado: string;

    constructor(private db: AngularFireDatabase) { }

    verificaEstado(appComponent, pegaCliente) {
        this.db.object('estadoDistribuidora/chave')
            .snapshotChanges()
            .pipe().subscribe(dados => {
                this.estado = dados.payload.exportVal()
                pegaCliente(appComponent)
            })
    }

    mudaEstado(estado: EstadoDistribuidora) {
        this.db.list('estadoDistribuidora').update('chave', estado)
            .catch((error: any) => {
                console.error(error);
            });
    }
}