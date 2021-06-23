import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Carrinho } from './carrinho';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  idCliente: string;

  constructor(private db: AngularFireDatabase) { };

  ngOnInit() {
  }

  adicionaProduto(contador: string, carrinho: Carrinho) {
    this.db.list('cliente/' + this.idCliente + '/carrinho').update('0' , carrinho)
      .catch((error: any) => {
        console.error(error);
      });
    alert("Produto Adicionado");
    this.db.list('cliente/' + this.idCliente + '/contador').push(contador)
  }

  recebeId(id) {
    this.idCliente = id;
    console.log(this.idCliente)
  }

  getAllProdCarrinho() {
    return this.db.list('cliente/' + this.idCliente + '/carrinho')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
        })
      );
  }

  deleteProdCarrinho(key: string) {
    this.db.object('carrinho/' + this.idCliente + '/' + `${key}`).remove();
  }

}
