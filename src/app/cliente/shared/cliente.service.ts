import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { ClienteLogado } from '../clienteLogado.service';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private db: AngularFireDatabase, private clienteLogado: ClienteLogado) { }

  insertCliente(cliente: Cliente){
    this.db.list('cliente/'+ this.clienteLogado.cliente.id).update('dados', cliente)
    window.location.href = '/carrinho/' + this.clienteLogado.cliente.id
  }

  getAllCliente(){
    return this.db.list('cliente')
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
