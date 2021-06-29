import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private db: AngularFireDatabase) { }

  insertProduto(cliente: Cliente){
    this.db.list('cliente').update('dados', cliente)
  }

  getAllCliente(id: string){
    return this.db.list('cliente/' + id +'/dados')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
      })
    );
  }

  deleteCliente(key: string){
    this.db.object(`produto/${key}`).remove();
    alert("Apagado com Sucesso!")
  }
}
