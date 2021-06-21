import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoDataService {

  private produtoSoucer = new BehaviorSubject({produto: null, key: ''});
  currentProduto = this.produtoSoucer.asObservable();

  constructor() { }

  changeProduto(produto: Produto, key: string){
    this.produtoSoucer.next({produto: produto, key: key});
  }
}
