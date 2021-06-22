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

  ngOnInit(){
  }

  adicionaProduto(carrinho: Carrinho) {
    this.db.list('carrinho/'+ this.idCliente).push(carrinho)
      .then((result: any) => {
        console.log(result.key);
      });
    alert("Cadastrado com Sucesso!");
  }

  recebeId(id){
    this.idCliente = id;
    console.log(this.idCliente)
  }

  getAllProdCarrinho(){
    return this.db.list('carrinho/usuario/'+ this.idCliente)
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
      })
    );
  }

  deleteProdCarrinho(key: string){
    this.db.object('carrinho/usuario/' + this.idCliente + '/' + `${key}`).remove();
  }
}
