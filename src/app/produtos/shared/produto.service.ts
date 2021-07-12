import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private db: AngularFireDatabase, private router: Router) { }

  insertProduto(produto: Produto){
    this.db.list('produto').push(produto)
    .then((result: any) =>{
      console.log(result.key);
    });
    alert("Cadastrado com Sucesso!");
    this.router.navigate(['/admin/menu']);
  }

  updateProduto(produto: Produto, key: string){
    this.db.list('produto').update(key, produto)
    .catch((error: any) =>{
      console.error(error);
    });
    alert("Editado com Sucesso!");
    this.router.navigate(['/admin/menu']);
  }

  getAllProduto(){
    return this.db.list('produto')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
      })
    );
  }

  deleteProduto(key: string){
    this.db.object(`produto/${key}`).remove();
    alert("Apagado com Sucesso!")
    this.router.navigate(['/admin/menu'])
  }
}
